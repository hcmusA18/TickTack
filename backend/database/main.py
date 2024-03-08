import json

with open('./backend/database/trending.json', encoding='utf-8') as f:
    data = json.load(f)

collector = data.get('collector', [])

print(len(collector))

with open('./backend/database/video_links.txt', encoding='utf-8') as f:
    links = f.readlines()

print(len(links))