-- open terminal
-- run command: psql -U postgres
-- enter the password

-- ONLY IF YOU ARE WORKING ON LOCALHOST DATABASE!!!

-- run command:
CREATE DATABASE photomarket;
-- run command: \c photomarket 
-- set sync({ force : true }) in index.js
-- run server once, and set ({ force : false })

-- disregard

-- run command:
-- CREATE TABLE users(
--     user_id SERIAL PRIMARY KEY,
--     user_email VARCHAR(255) NOT NULL,
--     user_password VARCHAR(255) NOT NULL,
--     user_name VARCHAR(255) NOT NULL,
--     user_surname VARCHAR(255) NOT NULL
-- );
-- run command:
-- CREATE TABLE items (
--     item_id SERIAL,
--     user_id INTEGER,
--     item_name VARCHAR(128),
--     item_category VARCHAR(64),
--     item_description TEXT,
--     item_images JSON,
--     item_value INTEGER,
--     PRIMARY KEY (item_id, user_id),
--     FOREIGN KEY (user_id) REFERENCES users (user_id)
-- );
-- run command:
-- CREATE TABLE orders(
--     order_id SERIAL,
--     item_id INTEGER,
--     user_id INTEGER,
--     order_description VARCHAR(255),
--     PRIMARY KEY (order_id, user_id),
--     FOREIGN KEY (user_id) REFERENCES users(user_id)
-- );