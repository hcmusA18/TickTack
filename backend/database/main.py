import json
import psycopg2
from dotenv import load_dotenv
import pathlib
import numpy as np
import os
import re

load_env_result = load_dotenv(pathlib.Path().resolve() / 'backend' / '.env')

conn = psycopg2.connect(
    host=os.getenv('DB_HOST'),
    database=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASS'),
    port=os.getenv('DB_PORT')
)
cur = conn.cursor()

# read music_links.csv
music_links = []
with open('./backend/database/music_links.csv', encoding='utf-8') as f:
    links = f.readlines()
    links = [link.strip() for link in links]
    music_links = links

i = 0

# Read music.csv
try:
    with open('./backend/database/music.csv', encoding='utf-8') as f:
        music = f.readlines()
        music = [m.strip() for m in music]
        music = music[1:]
        for m in music:
            music_id = m.split(',')[0]
            music_author = m.split(',')[1]
            music_name = m.split(',')[2]
            music_url = m.split(',')[-3]
            if i < len(music_links):
                music_url = music_links[i]
                i += 1
            cur.execute("INSERT INTO musics (music_id, music_author, music_name, music_url) VALUES (%s, %s, %s, %s) ON CONFLICT (music_id) DO NOTHING", (music_id, music_author, music_name, music_url))
    print('Music data inserted successfully')
except Exception as e:
    print('Error inserting music data', e)


# Read trending.json
with open('./backend/database/trending.json', encoding='utf-8') as f:
    data = json.load(f)

collector = data.get('collector', [])

# Read video links
with open('./backend/database/video_links.csv', encoding='utf-8') as f:
    links = f.readlines()
    links = [link.strip() for link in links]
    video_hash_map = {}
    for link in links:
        google_drive_link = link.split(',')[1]
        match = re.search(r"/d/([a-zA-Z0-9_-]+)", google_drive_link)
        video_id = match.group(1)
        video_hash_map[link.split(',')[0].replace('.mp4', '')] = "https://drive.google.com/uc?export=view&id=" + video_id

# Insert data into database
try:
    seed = 12345
    generator = np.random.default_rng(seed=seed)
    for video in collector:
        # Random user_id between 1 and 10
        user_id = int(generator.integers(1, 11, size=1, dtype=int)[0])
        text = video.get('text', '')
        create_time = video.get('createTime', '')
        video_url = video_hash_map.get(video.get('id', ''), '')
        duration = video.get("videoMeta").get("duration", 0)
        music_id = video.get('musicMeta').get('musicId', '')

        cur.execute("SELECT EXISTS(SELECT 1 FROM musics WHERE music_id = %s)", (music_id,))
        music_exists = cur.fetchone()[0]

        if not music_exists:
            music_id = None

        hashtags = video.get('hashtags', [])
        if hashtags:
            hashtags = [h.get('name', '') for h in hashtags]
        
        # Random privacy between public, private, friends
        privacy = generator.choice(['public', 'private', 'friends'])
        view_count = video.get('playCount', 0)
        cur.execute("INSERT INTO videos (user_id, text, create_time, video_url, duration, music_id, hashtags, privacy, view_count) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING video_id", (user_id, text, create_time, video_url, duration, music_id, hashtags, privacy, view_count))
    print('Video data inserted successfully')
except Exception as e:
    print('Error inserting video data', e)
                  


conn.commit()
cur.close()
conn.close()