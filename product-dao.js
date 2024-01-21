'use strict';

const db = require('./db.js');


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
exports.searchProducts = async function(name) {
    return new Promise( async (resolve, reject) => {  
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