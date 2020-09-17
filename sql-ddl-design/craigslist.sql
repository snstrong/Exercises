-- Data Modeling Exercise: Schema Design
-- Part Two: Craigslist

DROP DATABASE IF EXISTS craigslist;
CREATE DATABASE craigslist;
\c craigslist

CREATE TABLE regions (
    id SERIAL NOT NULL PRIMARY KEY,
    name text NOT NULL
);

INSERT INTO regions (name) VALUES ('Knoxville');
INSERT INTO regions (name) VALUES ('Nashville');
INSERT INTO regions (name) VALUES ('Memphis');
INSERT INTO regions (name) VALUES ('Gatlinburg');
INSERT INTO regions (name) VALUES ('Chattanooga');
INSERT INTO regions (name) VALUES ('Clarksville');

CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    user_region INT NOT NULL REFERENCES regions,
    email_address text NOT NULL UNIQUE
);

INSERT INTO users (user_region, email_address) VALUES (1, 'go_vols@aol.com');
INSERT INTO users (user_region, email_address) VALUES (2, 'nash_vegas@yahoo.com');
INSERT INTO users (user_region, email_address) VALUES (3, 'beale_street_talks@gmail.com');
INSERT INTO users (user_region, email_address) VALUES (4, 'smoky_mtns@aol.com');
INSERT INTO users (user_region, email_address) VALUES (5, 'hard_to_spell@hotmail.com');
INSERT INTO users (user_region, email_address) VALUES (6, 'fortified@aol.com');


CREATE TABLE categories (
    id SERIAL NOT NULL PRIMARY KEY,
    name text NOT NULL
);

INSERT INTO categories (name) VALUES ('Automobiles');
INSERT INTO categories (name) VALUES ('Furniture');
INSERT INTO categories (name) VALUES ('Farm and Garden');
INSERT INTO categories (name) VALUES ('Clothing');
INSERT INTO categories (name) VALUES ('Collectibles');

CREATE TABLE posts (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users,
    category_id INT NOT NULL REFERENCES categories,
    region_id INT NOT NULL REFERENCES regions,
    location text NOT NULL,
    price INT NOT NULL,
    post_content text NOT NULL
);

INSERT INTO posts (user_id, category_id, region_id, location, price, post_content)
    VALUES (
        '3',
        '2',
        '3',
        'Downtown',
        '150',
        'Vintage console cabinet. Needs some TLC.'
    );

INSERT INTO posts (user_id, category_id, region_id, location, price, post_content)
    VALUES (
        '1',
        '4',
        '1',
        'South Knox',
        '30',
        'NWT Vols jersey $30 obo.'
    );

INSERT INTO posts (user_id, category_id, region_id, location, price, post_content)
    VALUES (
        '4',
        '5',
        '4',
        'Up some mountain',
        '20',
        'Hand-painted WELCOME TO OUR CABIN sign.'
    );