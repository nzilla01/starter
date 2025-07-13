-- This SQL script creates the necessary tables and performs the required operations for the assignment.

-- 1. Create classification table
CREATE TABLE classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(50) 
);

-- 2. Create account table
CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    account_firstname VARCHAR(50),
    account_lastname VARCHAR(50) ,
    account_email VARCHAR(100) UNIQUE NOT NULL,
    account_password VARCHAR(100) NOT NULL,
    account_type VARCHAR(20) DEFAULT 'Client'
);

-- 3. Create inventory table
CREATE TABLE inventory (
    inv_id SERIAL PRIMARY KEY,
    inv_make VARCHAR(50) NOT NULL,
    inv_model VARCHAR(50) NOT NULL,
    inv_year INT NOT NULL,
    inv_description TEXT NOT NULL,
    inv_image TEXT,
    inv_thumbnail TEXT,
    inv_price NUMERIC(10, 2),
    inv_miles INT,
    inv_color VARCHAR(20),
    classification_id INT REFERENCES classification(classification_id)
); 