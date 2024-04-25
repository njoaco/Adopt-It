CREATE DATABASE adopt-it;

CREATE TABLE users (
    id INT AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE animals (
    id INT AUTO_INCREMENT,
    name VARCHAR(255),
    race VARCHAR(255),
    age INT,
    location VARCHAR(255),
    description TEXT,
    publishBy VARCHAR(255),
    image TEXT,
    PRIMARY KEY (id)
);

INSERT INTO users (username, email, password) VALUES (admin, admin, 123); /* CUENTA DE ADMINSTRADOR */