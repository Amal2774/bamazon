-- creating databse and products table
DROP database if exists bamazon;
CREATE database bamazon;

USE bamazon;

CREATE table products (
item_id INT NOT NULL AUTO_INCREMENT primary key, 
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price INT NOT NULL,
stock_quantity INT(10) NOT NULL
);


