CREATE TABLE user {
    "id" INTEGER NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "role" TEXT 

}

CREATE TABLE vendor (
    "id" INTEGER NOT NULL UNIQUE,
    "username" TEXT NOT NULL UNIQUE ,
    "password" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "wallet" INTEGER NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("id") REFERENCES user
);

CREATE TABLE customer (
    "id" INTEGER NOT NULL UNIQUE,
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "wallet" INTEGER NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("id") REFERENCES user
); 

CREATE TABLE product (
    "name" TEXT NOT NULL UNIQUE,
    "vendor_username" INTEGER NOT NULL, 
    "description" TEXT NOT NULL,
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
