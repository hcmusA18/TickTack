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

CREATE TABLE videos (
    video_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "users"(user_id),
    text TEXT,
    create_time BIGINT,
    video_url TEXT,
    duration INTEGER,
    music_id TEXT REFERENCES musics(music_id),
    hashtags TEXT[],
    privacy TEXT,
    view_count INTEGER
);

CREATE TABLE socials (
    user_id INTEGER PRIMARY KEY,
    following_id INTEGER[]
);

CREATE TABLE likes (
    user_id INTEGER REFERENCES "users"(user_id),
    video_id INTEGER REFERENCES videos(video_id),
    time BIGINT,
    PRIMARY KEY (user_id, video_id)
);

CREATE TABLE dislikes (
    user_id INTEGER REFERENCES "users"(user_id),
    video_id INTEGER REFERENCES videos(video_id),
    time BIGINT,
    PRIMARY KEY (user_id, video_id)
);

CREATE TABLE saves (
    user_id INTEGER REFERENCES "users"(user_id),
    video_id INTEGER REFERENCES videos(video_id),
    time BIGINT,
    PRIMARY KEY (user_id, video_id)
);

CREATE TABLE comments (
    user_id INTEGER REFERENCES "users"(user_id),
    video_id INTEGER REFERENCES videos(video_id),
    comment_text TEXT,
    time BIGINT,
    PRIMARY KEY (user_id, video_id, time)
);

insert into "users" (username, email, password, avatar, bio, regis_date) values
('John Doe', 'johndoe@gmail.com', '123456', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', 'I am John', 1709900870272),
('Jane Doe', 'janedoe@gmail.com', '123456', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', 'I am Jane', 1709900870272),
('Daniel Smith', 'johnsmith@gmail.com', '123456', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', 'I am John', 1709900870272),
('Emily Johnson', 'emilyjohnson@gmail.com', '123456', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', 'I am Emily', 1709900870272),
('Michael Brown', 'michaelbrown@gmail.com', '123456', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', 'I am Michael', 1709900870272),
('Olivia Williams', 'oliviawilliams@gmail.com', '123456', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', 'I am Olivia', 1709900870272),
('William Jones', 'williamjones@gmail.com', '123456', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', 'I am William', 1709900870272),
('Sophia Martinez', 'sophiamartinez@gmail.com', '123456', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', 'I am Sophia', 1709900870272),
('James Taylor', 'jamestaylor@gmail.com', '123456', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', 'I am James', 1709900870272),
('Ava Anderson', 'avaanderson@gmail.com', '123456', 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', 'I am Ava', 1709900870272);
