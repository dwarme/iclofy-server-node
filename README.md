# iclofy-server-node
# Sample server

# DATABASE TABLES - POSTGRESS

CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(150) NOT NULL,
    lastname VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(300) NOT NULL DEFAULT '',
    permissions VARCHAR[] NOT NULL,
    UNIQUE(id),
    UNIQUE(email)
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY NOT NULL,
    post_source VARCHAR(30) NOT NULL,
    post_type VARCHAR(20) NOT NULL,
    post_id VARCHAR(20),
    post_actor_id VARCHAR(20),
    post_title VARCHAR(150) NOT NULL,
    post_description VARCHAR(500),
    post_call_to_action_link NOT NULL,
    post_created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    added_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_visible BOOLEAN NOT NULL DEFAULT false,
    tags VARCHAR(500) NOT NULL,
    UNIQUE(id)
)

CREATE TABLE post_media(
    id SERIAL PRIMARY KEY NOT NULL,
    posts_id INT NOT NULL,
    type VARCHAR(20),
    url_image VARCHAR(500) NOT NULL,
    url_video VARCHAR(500) NOT NULL,
    FOREIGN KEY(post_id) REFERENCES posts(id),
    UNIQUE(id)
)