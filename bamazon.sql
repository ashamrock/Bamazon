DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(50) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("red leather jacket", "clothing", 100, 1),
("fuzzy bunny slippers", "footware", 20, 150),
("pig food", "dry goods", 25, 17),
("cup with ball on string game", "toys", 25, 17),
("whisky glass", "kitchenware", 10, 40),
("kitcken table", "home", 4000, 5),
("boat hose", "garden", 18.07, 50),
("grape juice", "food", 1, 170),
("baby diapers", "baby", 15, 4000),
("really cool cell phone that actually works", "electronics", 25, 3),