CREATE DATABASE grpc;
use grpc;
CREATE TABLE user(id char(30) PRIMARY KEY, name TEXT, email TEXT);
CREATE TABLE audio(id int AUTO_INCREMENT PRIMARY KEY, user_id char(30), audio_name text, description text, url text);
CREATE TABLE tag(id int AUTO_INCREMENT PRIMARY KEY, user_id char(30), audio_id int, start_ms int, end_ms int, tag_name text);
CREATE INDEX audio_idx on audio(user_id);
CREATE INDEX tag_idx on tag(user_id, audio_id);
