CREATE DATABASE inventory_management;

USE inventory_management;

CREATE TABLE products (

  id INT PRIMARY KEY AUTO_INCREMENT,

  product_name VARCHAR(100),

  quantity INT,

  price DECIMAL(10,2)
);

INSERT INTO products
(product_name, quantity, price)

VALUES
('Laptop', 10, 50000);

SELECT * FROM products;

UPDATE products
SET quantity = 15
WHERE id = 1;

DELETE FROM products
WHERE id = 1;
