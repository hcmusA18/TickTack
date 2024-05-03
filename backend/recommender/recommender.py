from flask import Flask, request, jsonify, abort
from create_model import (
    VideoRankingModel,
    RetrievalModel,
    preprocess_data,
    load_data,
    get_engine,
)
import tensorflow as tf
import tensorflow_recommenders as tfrs
import numpy as np
import os

app = Flask(__name__)


@app.route("/recommend", methods=["GET"])
def send_recommendations():
    try:
        if (
            request.args.get("userId") is not None
            and request.args.get("number") is not None
        ):
            user_id = request.args.get("userId")
            n = request.args.get("number")
            print(f"Logs --- User ID: {user_id}, Number of recommendations: {n}")
            recommendations = make_recommendations(user_id, int(n))
            recommendations = [int(video_id) for video_id in recommendations]
            return jsonify({"data": recommendations})
        else:
            raise ValueError("Missing required parameters")
    except ValueError as e:
        abort(400, str(e))


def make_recommendations(user_id, n: int = 10):
    datasets = preprocess_data(load_data())
    retrieval = RetrievalModel(datasets)
    ranking = VideoRankingModel(datasets)
    retrieval.compile(optimizer=tf.keras.optimizers.Adagrad(0.1))
    ranking.compile(optimizer=tf.keras.optimizers.Adagrad(0.1))
    retrieval.load_weights("model/retrieval_model/weigths")
    ranking.load_weights("model/ranking_model/weigths")

    index = tfrs.layers.factorized_top_k.BruteForce(retrieval.user_model, k=n)
    index.index_from_dataset(
        tf.data.Dataset.zip(
            (
                datasets["videos"].batch(100),
                datasets["videos"].batch(100).map(retrieval.video_model),
            )
        )
    )

    user_query = tf.constant([user_id])
    _, video_ids = index(user_query)
    video_ids = video_ids[0].numpy()
    scores = ranking({"user_id": tf.constant([user_id] * n), "video_id": tf.constant(video_ids)})
    scores = scores.numpy().flatten()
    # sort video ids by scores
    print(f"Logs --- Scores: {scores}")
    sorted_ids = tf.argsort(scores, direction="DESCENDING")
    print(f"Logs --- Sorted scores: {sorted_ids.numpy()}")
    print(f"Logs --- Sorted video ids: {video_ids[sorted_ids.numpy()]}")
    
    sorted_video_ids = video_ids[sorted_ids.numpy()]
    return [video_id.decode('utf-8') for video_id in sorted_video_ids.flatten().tolist()]


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get("PORT", 8080))
