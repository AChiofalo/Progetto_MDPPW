CREATE TABLE vendor (
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "wallet" INTEGER NOT NULL,
    PRIMARY KEY ("username"),
);

CREATE TABLE customer (
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "wallet" INTEGER NOT NULL,
    PRIMARY KEY ("username"),
); 

CREATE TABLE product (
    "name" TEXT NOT NULL UNIQUE,
    "vendor_username" INTEGER NOT NULL, 
    "description" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "quantity_available" INTEGER NOT NULL, 
    "price" INTEGER NOT NULL,
    PRIMARY KEY ("name"),
    FOREIGN KEY ("vendor_username") REFERENCES vendor
);

CREATE TABLE "transaction" (
    "id" INTEGER NOT NULL UNIQUE,
    "product_username" INTEGER NOT NULL,
    "customer_username" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("product_username") REFERENCES product,
    FOREIGN KEY ("customer_username") REFERENCES customer
);
