-- 1. Insert data into classification
INSERT INTO classification (classification_name)
VALUES 
    ('Sport'),
    ('SUV'),
    ('Sedan');

-- 2. Insert data into inventory
INSERT INTO inventory (
    inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
)
VALUES 
-- SPORT
('Toyota', 'Supra', 2022, 'High performance sports car',  '/images/vehicles/batmobile.jpg','/images/vehicles/batmobile-tn.jpg', 50000.00, 10000, 'Red', 1),
('Ford', 'Mustang', 2021, 'Sporty and powerful coupe',  '/images/vehicles/camaro.jpg','/images/vehicles/camaro-tn.jpg', 55000.00, 12000, 'Blue', 1),
('Chevrolet', 'Camaro ZL1', 2021, 'Upgraded American muscle car with modern features',  '/images/vehicles/delorean.jpg','/images/vehicles/delorean-tn.jpg', 48000.00, 14000, 'Yellow', 1),
('Ford', 'Crown Victoria', 2010, 'Classic full-size sedan used in law enforcement',  '/images/vehicles/crwn-vic.jpg','/images/vehicles/crwn-vic-tn.jpg', 20000.00, 90000, 'White', 1),
('Subaru', 'WRX STI', 2022, 'Rally-inspired AWD performance car',  '/images/vehicles/dog.jpg', '/images/vehicles/crwn-vic-tn.jpg', 41000.00, 8000, 'Silver', 1),
('Dodge', 'Challenger Hellcat', 2023, 'Extreme horsepower and drag racing capability',  '/images/vehicles/fire-truck.jpg','/images/vehicles/fire-truck-tn.jpg',  62000.00, 5000, 'Black', 1),

-- SUV
('GM', 'Hummer H2', 2020, 'Spacious with a huge interior',  '/images/vehicles/hummer.jpg', '/images/vehicles/hummer-tn.jpg', 60000.00, 15000, 'Black', 2),
('Toyota', 'Land Cruiser', 2023, 'Premium off-road SUV',  '/images/vehicles/mechanic.jpg', '/images/vehicles/mechanic-tn.jpg', 75000.00, 5000, 'White', 2),
('Ford', 'Explorer', 2022, 'Family-friendly SUV with modern tech', '/images/vehicles/model-t.jpg','/images/vehicles/model-t-tn.jpg', 42000.00, 9000, 'Silver', 2),
('Jeep', 'Wrangler', 2023, 'Off-road ready SUV with rugged styling',  '/images/vehicles/monter-truck.jpg', '/images/vehicles/monter-truck-tn.jpg',  46000.00, 6000, 'Green', 2),
('Chevrolet', 'Suburban', 2022, 'Large SUV perfect for big families and cargo',  '/images/vehicles/mystery-van.jpg',  '/images/vehicles/mystery-van-tn.jpg', 53000.00, 7000, 'Blue', 2),
('Nissan', 'Armada', 2021, 'Full-size SUV with V8 power and premium interior',  '/images/vehicles/survan.jpg', '/images/vehicles/survan-tn.jpg', 49000.00, 10000, 'Gray', 2),

-- SEDAN
('Honda', 'Accord', 2021, 'Reliable and efficient midsize sedan', '/images/vehicles/wrangler.jpg',  '/images/vehicles/wrangler-tn.jpg', 30000.00, 8000, 'Gray', 3),
('Toyota', 'Camry', 2022, 'Comfortable ride with hybrid option',  '/images/vehicles/escalade.jpg', '/images/vehicles/escalade-tn.jpg', 32000.00, 7000, 'Black', 3),
('Tesla', 'Model 3', 2023, 'Electric sedan with autopilot', '/images/vehicles/adventador.jpg', '/images/vehicles/adventador-tn.jpg', 45000.00, 3000, 'White', 3);

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
WHERE inv_make = 'GM' AND inv_model = 'Hummer H2';

-- Query 5: Join to find Sport classification inventory
SELECT i.inv_make, i.inv_model, c.classification_name
FROM inventory i
INNER JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- -- Query 6: Update all image paths to include "/vehicles"
-- UPDATE inventory
-- SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
--     inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
