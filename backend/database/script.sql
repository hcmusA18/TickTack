-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA public;
-- GRANT ALL ON SCHEMA public TO postgres;
-- GRANT ALL ON SCHEMA public TO public;

CREATE DATABASE ticktack;

CREATE TABLE "users" (
    user_id SERIAL PRIMARY KEY,
    username TEXT,
    email TEXT,
    password TEXT,
    avatar TEXT,
    bio TEXT,
    regis_date BIGINT
);

CREATE TABLE musics (
    music_id TEXT PRIMARY KEY,
    music_name TEXT,
    music_author TEXT,
    music_url TEXT
);

CREATE TYPE privacy_level AS ENUM ('public', 'private', 'friends');

CREATE TABLE videos (
    video_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "users"(user_id),
    text TEXT,
    create_time BIGINT,
    video_url TEXT,
    duration INTEGER,
    music_id TEXT REFERENCES musics(music_id),
    hashtags TEXT[],
    privacy privacy_level,
    view_count INTEGER
);

CREATE TABLE socials (
    user_id INTEGER REFERENCES "users"(user_id),
    following_id INTEGER REFERENCES "users"(user_id),
    PRIMARY KEY (user_id, following_id)
);

CREATE TABLE likes (
    user_id INTEGER REFERENCES "users"(user_id),
    video_id INTEGER REFERENCES videos(video_id) ON DELETE CASCADE,
    time BIGINT,
    PRIMARY KEY (user_id, video_id)
);

CREATE TABLE dislikes (
    user_id INTEGER REFERENCES "users"(user_id),
    video_id INTEGER REFERENCES videos(video_id) ON DELETE CASCADE,
    time BIGINT,
    PRIMARY KEY (user_id, video_id)
);

CREATE TABLE saves (
    user_id INTEGER REFERENCES "users"(user_id),
    video_id INTEGER REFERENCES videos(video_id) ON DELETE CASCADE,
    time BIGINT,
    PRIMARY KEY (user_id, video_id)
);

CREATE TABLE comments (
    user_id INTEGER REFERENCES "users"(user_id),
    video_id INTEGER REFERENCES videos(video_id) ON DELETE CASCADE,
    comment_text TEXT,
    time BIGINT,
    PRIMARY KEY (user_id, video_id, time)
);
CREATE TABLE watched (
    user_id INTEGER REFERENCES "users"(user_id) ON DELETE CASCADE,
    video_id INTEGER REFERENCES videos(video_id) ON DELETE CASCADE,
    percent REAL,
    time BIGINT,
    PRIMARY KEY (user_id, video_id)
);