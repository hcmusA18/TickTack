import os
import pathlib
import numpy as np
import pandas as pd
import sqlalchemy as db
import psycopg2 as pg

# Third party imports
import tensorflow as tf
from typing import Dict, Text
import tensorflow_recommenders as tfrs

def create_embedding_model(datasets): 
    user_vocab = tf.keras.layers.StringLookup(mask_token=None)
    user_vocab.adapt(datasets["users"])
    video_vocab = tf.keras.layers.StringLookup(mask_token=None)
    video_vocab.adapt(datasets["videos"])
    user_model = tf.keras.Sequential(
        [
            user_vocab,
            tf.keras.layers.Embedding(len(datasets["users"]) + 1, 32),
        ]
    )
    video_model = tf.keras.Sequential(
        [
            video_vocab,
            tf.keras.layers.Embedding(len(datasets["videos"]) + 1, 32),
        ]
    )
    return user_model, video_model

class RetrievalModel(tfrs.Model):
    def __init__(self, datasets: Dict[Text, tf.data.Dataset]):
        super().__init__()
        self.user_model, self.video_model = create_embedding_model(datasets)

        self.task = tfrs.tasks.Retrieval(
            metrics=tfrs.metrics.FactorizedTopK(
                candidates=datasets["videos"].batch(128).map(self.video_model)
            )
        )

    def compute_loss(
        self, features: Dict[Text, tf.Tensor], training=False
    ) -> tf.Tensor:
        user_embeddings = self.user_model(features["user_id"])
        video_embeddings = self.video_model(features["video_id"])
        return self.task(user_embeddings, video_embeddings)


class RankingModel(tf.keras.Model):
    def __init__(self, datasets: Dict[Text, tf.data.Dataset]):
        super().__init__()
        self.user_model, self.video_model = create_embedding_model(datasets)
        self.ranking_model = tf.keras.Sequential(
            [
                tf.keras.layers.Dense(128, activation="relu"),
                tf.keras.layers.Dense(64, activation="relu"),
                # make watched prediction in the final layer
                tf.keras.layers.Dense(1),
            ]
        )

    def call(self, features):
        user_embedding = self.user_model(features["user_id"])
        video_embedding = self.video_model(features["video_id"])
        return self.ranking_model(tf.concat([user_embedding, video_embedding], axis=1))


class VideoRankingModel(tfrs.Model):
    def __init__(self, datasets: Dict[Text, tf.data.Dataset]):
        super().__init__()
        self.ranking_model = RankingModel(datasets)
        self.task = tfrs.tasks.Ranking(
            loss=tf.keras.losses.MeanSquaredError(),
            metrics=[tf.keras.metrics.RootMeanSquaredError()],
        )

    def compute_loss(self, features, training=False):
        labels = features.pop("percent")
        percent_predictions = self(features)
        return self.task(labels=labels, predictions=percent_predictions)

    def call(self, features):
        return self.ranking_model(features)

def get_engine():
  DB_USER = "ticktack_lbu4_user"
  DB_PASS = "gOIzWXGZ0Wtxve7mBulnvMsTxFJ8nYDl"
  DB_NAME = "ticktack_lbu4"
  DB_PORT = "5432"
  DB_HOST = "dpg-cokgjtgl5elc73c5scbg-a.singapore-postgres.render.com"
  DB_URI = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}" 
  return db.create_engine(DB_URI)
def load_data() -> Dict[Text, tf.data.Dataset]:
    # Load the data
    engine = get_engine()
    users_df = pd.read_sql_query("SELECT user_id FROM users", engine)
    videos_df = pd.read_sql_query("SELECT video_id FROM videos", engine)
    watched_df = pd.read_sql_query(
        "SELECT user_id, video_id, percent FROM watched", engine
    )

    return {
        "users": users_df,
        "videos": videos_df,
        "watched": watched_df,
    }
def preprocess_data(data: Dict[Text, pd.DataFrame]) -> Dict[Text, tf.data.Dataset]:
    users = tf.data.Dataset.from_tensor_slices(data["users"]["user_id"].astype(str).values)
    videos = tf.data.Dataset.from_tensor_slices(data["videos"]["video_id"].astype(str).values)

    watched = data["watched"]

    # Create a tf.data.Dataset for the watched videos
    watched_ds = tf.data.Dataset.from_tensor_slices(
        {
            "user_id": watched["user_id"].astype(str).values,
            "video_id": watched["video_id"].astype(str).values,
            "percent": watched["percent"].astype(np.float32).values,
        }
    )

    shuffled = watched_ds.shuffle(len(watched), seed=42, reshuffle_each_iteration=False)
    # Split the data into training and testing sets
    train_size = int(len(watched) * 0.8)
    train_ds = shuffled.take(train_size)
    test_ds = shuffled.skip(train_size).take(len(watched) - train_size)

    return {
        "users": users,
        "videos": videos,
        "train": train_ds,
        "test": test_ds,
    }

def create_model(datasets: Dict[Text, tf.data.Dataset]) -> tf.keras.Model:
    cached_train = datasets["train"].shuffle(1_000).batch(1024).cache()
    cached_test = datasets["test"].batch(4096).cache()
  
    retrieval_model = RetrievalModel(datasets)
    ranking_model = VideoRankingModel(datasets)
    
    retrieval_model.compile(optimizer=tf.keras.optimizers.Adagrad(0.1))
    ranking_model.compile(optimizer=tf.keras.optimizers.Adagrad(0.1))
    
    retrieval_model.fit(cached_train, validation_data=cached_test, epochs=3)
    ranking_model.fit(cached_train, validation_data=cached_test, epochs=3)
    
    # save weights of 2 models
    retrieval_model.save_weights("model/retrieval_model/weigths")
    ranking_model.save_weights("model/ranking_model/weigths")
    
    print("Model training complete")