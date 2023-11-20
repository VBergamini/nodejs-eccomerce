CREATE SCHEMA nodejseccommerce;
USE nodejseccommerce;

CREATE TABLE tb_profiles (
	pro_id INT NOT NULL AUTO_INCREMENT,
  pro_description VARCHAR(100) NOT NULL,
  CONSTRAINT pk_tb_profiles PRIMARY KEY (pro_id)
);
INSERT INTO tb_profiles (pro_description)
VALUES ('Admin');

CREATE TABLE tb_users (
	user_id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(200) NOT NULL,
  user_email VARCHAR(200) NOT NULL,
  user_active VARCHAR(1) NOT NULL,
  user_password VARCHAR(12) NOT NULL,
  pro_id INT NOT NULL,
  CONSTRAINT pk_tb_users PRIMARY KEY (user_id),
  CONSTRAINT un_user_email UNIQUE (user_email),
  CONSTRAINT fk_tb_users_tb_profiles FOREIGN KEY (pro_id)
	  REFERENCES tb_profiles (pro_id),
  CONSTRAINT ck_user_active CHECK (user_active IN ('Y', 'N'))
);
INSERT INTO tb_users (user_name, user_email, user_active, user_password ,pro_id)
VALUES ('John Doe', 'admin@admin.com', 'Y', '123', 1);

CREATE TABLE tb_brands (
	brand_id INT NOT NULL AUTO_INCREMENT,
  brand_name VARCHAR(100) NOT NULL,
  brand_image VARCHAR(50),
  CONSTRAINT pk_tb_brands PRIMARY KEY (brand_id)
);
INSERT INTO tb_brands (brand_name)
VALUES ('Default Brand');

CREATE TABLE tb_categories (
	cat_id INT NOT NULL AUTO_INCREMENT,
  cat_name VARCHAR(100) NOT NULL,
  cat_image VARCHAR(50),
  CONSTRAINT pk_tb_categories PRIMARY KEY (cat_id)
);
INSERT INTO tb_categories (cat_name)
VALUES ('Default Category');

CREATE TABLE tb_products (
	prd_id INT NOT NULL AUTO_INCREMENT,
  prd_cod VARCHAR(50) NOT NULL,
  prd_name VARCHAR(255) NOT NULL,
  prd_quantity INT NOT NULL,
  prd_price DECIMAL(8,2) NOT NULL,
  prd_image VARCHAR(50),
  cat_id INT NOT NULL,
  brand_id INT NOT NULL,
  CONSTRAINT pk_tb_products PRIMARY KEY (prd_id),
  CONSTRAINT fk_tb_products_tb_brands FOREIGN KEY (brand_id)
    REFERENCES tb_brands (brand_id),
  CONSTRAINT fk_tb_products_tb_categories FOREIGN KEY (cat_id)
    REFERENCES tb_categories (cat_id)
);
INSERT INTO tb_products (prd_cod, prd_name, prd_quantity, prd_price, cat_id, brand_id)
VALUES ('DF-01', 'Default Product', 100, 199.90, 1, 1);

CREATE TABLE tb_order (
	ord_id INT NOT NULL AUTO_INCREMENT,
  ord_date DATE NOT NULL,
  user_id INT DEFAULT NULL,
  CONSTRAINT pk_tb_order PRIMARY KEY (ord_id),
  CONSTRAINT fk_tb_order_tb_users FOREIGN KEY (user_id)
	  REFERENCES tb_users (user_id)
	ON DELETE CASCADE
);
INSERT INTO tb_order (ord_date, user_id)
VALUES (curdate(), 1);

CREATE TABLE tb_orderItems (
	oit_id INT NOT NULL AUTO_INCREMENT,
  oit_quantity INT NOT NULL,
  oit_price DECIMAL(8,2) NOT NULL,
  ord_id INT NOT NULL,
  prd_id INT DEFAULT NULL,
  user_id INT DEFAULT NULL,
  CONSTRAINT pk_tb_orderItems PRIMARY KEY (oit_id),
  CONSTRAINT fk_tb_orderItems_tb_order FOREIGN KEY (ord_id)
		REFERENCES tb_order (ord_id),
	CONSTRAINT fk_tb_orderItems_tb_products FOREIGN KEY (prd_id)
		REFERENCES tb_products (prd_id),
  CONSTRAINT fk_tb_orderItems_tb_users FOREIGN KEY (user_id)
		REFERENCES tb_users (user_id)
);
INSERT INTO tb_orderItems (oit_quantity, oit_price, ord_id, prd_id, user_id)
VALUES (2, 199.90, 1, 1, 1);
