'use strict';

const db = require('./db.js');

//CREATE
exports.createProduct = async function(product){
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO product (name, vendor_username, description, img, quantity_available, price) VALUES (?,?,?,?,?,?)';
        db.run(sql, 
            [product.name,
            product.vendor_username,
            product.description,
            product.img,
            product.quantity_available,
            product.price,
            ],function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(product.name);
                }
            });
      })
};



//READ
/**
 * 
*   "name" TEXT NOT NULL UNIQUE,
    "vendor_username" INTEGER NOT NULL, 
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "quantity_available" INTEGER NOT NULL, 
    "price" INTEGER NOT NULL,
 * 
 * @param {*} name 
 * @returns 
 */
exports.searchProductsByName = async function(name) {
    return new Promise((resolve, reject) => {  
      const sql = 'SELECT name, vendor_username, description, img, quantity_available, price FROM product WHERE name LIKE ?%'; //% wildcard per SQL
      db.all(sql, [name], function(err, rows) {
          if (err) 
            reject(err);
          else {
            const products = rows.map((row)=>(
            { 
              "name":row.username,
              "vendor_username":row.vendor_username,
              "description":row.description, 
              "img":row.img,
              "quantity_available":row.quantity_available,
              "price":row.price,
            }
            ));
            resolve(products); 
          }});
      });
};

exports.getProductByName = async function(name) {
    return new Promise((resolve, reject) => {  
      const sql = 'SELECT name, vendor_username, description, img, quantity_available, price FROM product WHERE name LIKE ?'; //% wildcard per SQL
      db.get(sql, [name], function(err, row) {
          if (err) 
            reject(err);
          else {
            const product = 
            { 
              "name":row.username,
              "vendor_username":row.vendor_username,
              "description":row.description, 
              "img":row.img,
              "quantity_available":row.quantity_available,
              "price":row.price,
            } 
            resolve(product); 
          }});
      });
};

//UPDATE




//DELETE


