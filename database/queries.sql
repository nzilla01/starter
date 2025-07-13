-- 1. Insert data into classification
INSERT INTO classification (classification_name)
VALUES 
    ('Sport'),
    ('SUV'),
    ('Sedan');

-- 2. Insert data into inventory
INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
VALUES 
    ('GM', 'Hummer', 2020, 'Spacious but with small interiors', '/images/hummer.jpg', '/images/hummer-thumb.jpg', 60000.00, 15000, 'Black', 2),
    ('Toyota', 'Supra', 2022, 'High performance sports car', '/images/supra.jpg', '/images/supra-thumb.jpg', 50000.00, 10000, 'Red', 1),
    ('Ford', 'Mustang', 2021, 'Sporty and powerful coupe', '/images/mustang.jpg', '/images/mustang-thumb.jpg', 55000.00, 12000, 'Blue', 1);


-- Query 1: Insert Tony Stark
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Query 2: Update Tony Stark to Admin
UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

-- Query 3: Delete Tony Stark
DELETE FROM account
WHERE account_email = 'tony@starkent.com';

-- Query 4: Update GM Hummer description (using REPLACE)
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Query 5: Join to find Sport classification inventory
SELECT i.inv_make, i.inv_model, c.classification_name
FROM inventory i
INNER JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- Query 6: Update all image paths to include "/vehicles"
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');



-- Query 4 (again): Update GM Hummer description
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';


