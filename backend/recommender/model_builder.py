import threading
import time
from create_model import get_engine, load_data, preprocess_data, create_model
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

if __name__ == '__main__':
  print("Starting model builder")
  engine = get_engine()
  init = False
  user_len = 0
  video_len = 0
  watched_len = 0
  
  while True:
    print("Checking for new data")
    query = "SELECT COUNT(DISTINCT user_id) FROM users"
    new_user_len = pd.read_sql(query, engine).iloc[0, 0]
    query = "SELECT COUNT(DISTINCT video_id) FROM videos"
    new_video_len = pd.read_sql(query, engine).iloc[0, 0]
    query = "SELECT COUNT(*) FROM watched"
    new_watched_len = pd.read_sql(query, engine).iloc[0, 0]
    print(f"Users: {new_user_len}, Videos: {new_video_len}, Watched: {new_watched_len}")
    if new_user_len - user_len > 0 or new_video_len - video_len > 0 or new_watched_len - watched_len > 100:
      init = True
      user_len, video_len, watched_len = new_user_len, new_video_len, new_watched_len
      
    if init and user_len > 0 and video_len > 0 and watched_len > 0:
      print("Retrain the model")
      data = load_data()
      datasets = preprocess_data(data)
      # Retrain the model on a different thread
      t1 = threading.Thread(target=create_model, args=(datasets,))
      t1.start()
      init = False
      time.sleep(60) # Prevent retraining the model too frequently
