CREATE TABLE user (
    "id" INTEGER NOT NULL UNIQUE,
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "role" TEXT,
	PRIMARY KEY ("id")
);

CREATE TABLE vendor (
    "id" INTEGER NOT NULL UNIQUE,
    "username" TEXT NOT NULL UNIQUE ,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "wallet" INTEGER NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("id") REFERENCES user
);

CREATE TABLE customer (
    "id" INTEGER NOT NULL UNIQUE,
    "username" TEXT NOT NULL UNIQUE,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "wallet" INTEGER NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("id") REFERENCES user
); 

CREATE TABLE product (
    "id" INTEGER NOT NULL UNIQUE,
    "name" TEXT NOT NULL UNIQUE,
    "vendor_id" INTEGER NOT NULL, 
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "quantity_available" INTEGER NOT NULL, 
    "price" INTEGER NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("vendor_id") REFERENCES vendor
);

CREATE TABLE "transaction" (
    "id" INTEGER NOT NULL UNIQUE,
    "product_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("product_id") REFERENCES product,
    FOREIGN KEY ("customer_id") REFERENCES customer
);
