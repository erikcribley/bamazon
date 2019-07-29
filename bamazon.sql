drop database if exists bamazon;
create database bamazon;

use bamazon;

create table products (
	item_id int auto_increment,
    product_name varchar(250),
    department_name varchar(250),
    price decimal(10, 2),
    stock_quantity int(10),
    primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values 
	('Can of Whoop Ass', 'CANS', 3.50, 316),
    ('Dog Food', 'FOOD', 14.00, 40),
    ('Moon Rock', 'LUNAR PARAPHERNALIA', 4499.99, 3),
    ('Cat Food', 'FOOD', 14.00, 40),
    ('Bacon', 'FOOD', 12.99, 50),
    ('Can of Worms', 'CANS', 2.00, 69),
    ('Moon Dust', 'LUNAR PARAPHERNALIA', 3399.99, 9),
    ('Sandwich', 'FOOD', 2.99, 100),
    ('Chewbacca', 'WOOKIE', 9999.99, 1),
    ('Soap', 'CLEANING PRODUCTS', 1.29, 35);
    
select * from products