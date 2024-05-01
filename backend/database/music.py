from seleniumwire import webdriver

# read urls from csv file
urls = []
with open('./backend/database/music.csv', encoding='utf-8') as file:
    music = file.readlines()
    music = [m.strip() for m in music]
    music = music[1:]
    for m in music:
        music_link = m.split(',')[-3]
        urls.append(music_link)

print(urls)

with open('./backend/database/music_links.csv', 'w') as file:
    i = 0
    for url in urls:
        if i == 20: break
        i += 1
        if 'https://lis.tn' not in url:
            file.write('\n')
            continue
        try:
            print(url)
            driver = webdriver.Chrome()
            driver.get(url)
            for request in driver.requests:
                if request.response:
                    if 'audio' in request.response.headers['Content-Type']:
                        file.write(request.url + '\n')
        finally:
            driver.quit()
