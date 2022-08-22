# About

Client side is built with React.

Server side is built with Node, Express and MySQL on https://freemysqlhosting.net/

## Development

You can clone this app by copying this code in to your terminal:

### 'git clone https://github.com/Rokas214/Service my-app'

Install all necessary packages

### 'npm install'

Database connected on https://freemysqlhosting.net/ but you can do it on your own mashine.

To create your database table run this sql script:

CREATE TABLE cart (id INT PRIMARY KEY AUTO_INCREMENT,img TEXT, title VARCHAR(255), author VARCHAR(255), year INT, description TEXT, price INT,email TEXT);

CREATE TABLE books (id INT PRIMARY KEY AUTO_INCREMENT,img TEXT, title VARCHAR(255), author VARCHAR(255), year INT, description TEXT, price INT,email TEXT);

CREATE TABLE users (id INT PRIMARY KEY AUTO_INCREMENT,email TEXT, password TEXT)

Create a file called .env in server root directory, define local variables. If you plan on running app locally define PORT like so PORT=8080. Boilerplate for server .env file can be found in server root directory, .env.example file.
