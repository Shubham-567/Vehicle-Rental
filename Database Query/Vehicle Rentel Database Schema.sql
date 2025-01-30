CREATE DATABASE vehicle_rental;
USE vehicle_rental;


-- Users Table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    phone VARCHAR(20),
    role ENUM('customer', 'admin'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles Table
CREATE TABLE vehicles (
    vehicle_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT,
    name VARCHAR(100),
    brand VARCHAR(50),
    type ENUM('Car', 'Bike', 'SUV', 'Truck'),
    price_per_day DECIMAL(10,2),
    availability BOOLEAN DEFAULT TRUE,
    image_url VARCHAR(255),
    FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Bookings Table
CREATE TABLE bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    vehicle_id INT,
    start_date DATE,
    end_date DATE,
    total_price DECIMAL(10,2),
    status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed'),
    payment_status ENUM('Pending', 'Paid'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE
);


SELECT * FROM users;
SELECT * FROM vehicles;
SELECT * FROM bookings;


-- To start server use: net start mysql80
-- run terminal as administrator
