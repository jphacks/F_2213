CREATE DATABASE grpc;
CREATE TABLE user(id text PRIMARY KEY, name TEXT, email TEXT);
CREATE TABLE audio(id int AUTO_INCREMENT PRIMARY KEY, user_id text KEY, audioName text, description text, url text);
CREATE TABLE tag(id int AUTO_INCREMENT PRIMARY KEY, user_id text KEY, audio_id int KEY, int64 start_ms, int64 end_ms, tagName text);

