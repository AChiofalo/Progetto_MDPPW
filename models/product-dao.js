'use strict';

const db = require('../db.js');


/**
 * 
 * @param {Product} product
 * @returns name del product o errore
 */
exports.createProduct = function (product) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO product(name, vendor_id, description, img, quantity_available, price) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(sql, 
      [product.name, 
       product.vendor_id, 
       product.description, 
       product.img, 
       product.quantity_available,
       product.price,
      ], 
      function (err) {
      if (err) {
        if (err.errno == 19) {  //Caso già esistente
          err["code"] = 400
          err["msg"] = `${product.name} already present`
          reject(err)
        } else {               //Caso errore interno
          err["code"] = 500;
          err["msg"] = `Internal Error`;
          reject(err);
        }
      } else                  //Caso tutto bene
        resolve({ code: 200, msg: `${product.name} created successfully` });
    });
  });
};

/**
 * 
 * @param {String} name 
 * @returns Array di oggetti products o errore
 */
exports.searchProductsByName = function (name) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM product WHERE name LIKE ?;"
    db.all(sql, [name + "%"], function (err, rows) { //errs: 1, 25 nella query std
      if (err) {
        err["code"] = 500;
        reject(err);
      } else {
        const products = rows.map((row) => (
          {
            "id": row.id,
            "name": row.name,
            "vendor_id": row.vendor_id,
            "description": row.description,
            "img": row.img,
            "quantity_available": row.quantity_available,
            "price": row.price
          }));
        resolve({ code: 200, msg: "ok", products: products });
      }
    });
  });
};

/**
 * 
 * @param {String} name 
 * @returns oggetto product o errore
 */
exports.getProduct = function (name) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM product WHERE name LIKE ?;"
    db.get(sql, [name], function (err, row) {
      if (err) {
        err["code"] = 500;
        reject(err);
      }
      if (!row) {
        reject({ code: 404, msg: `product ${name} Not Found` });
      }
      else {
        const product =
        {
          "id": row.id,
          "name": row.name,
          "vendor_id": row.vendor_id,
          "description": row.description,
          "img": row.img,
          "quantity_available": row.quantity_available,
          "price": row.price
        }
        resolve({ code: 200, msg: "ok", product: product });
      }
    });
  });
};

/**
 * 
 * @param {String} name 
 * @param {Number} id_vendor 
 * @returns GONE o error
 */
exports.deleteProduct = function (name, vendor_id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM product WHERE (name LIKE ? AND vendor_id = ?)";
    db.run(sql, [name, vendor_id], function (err) {
      if (err) {
        err["code"] = 500;
        reject(err);
      }
      else if (!this.changes)
        reject({ code: 404, msg: `product ${name} Not Found` })
      else
        resolve({ code: 200, msg: `${name} deleted successfully` });
    });
  });
};

exports.updatePrice = function (name, price) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE product SET price = ? WHERE name LIKE ?"
    db.run(sql, [price, name], function (err) {
      if (err) {
        err["code"] = 500;
        reject(err);
      }
      else if (!this.changes)
        reject({ code: 404, msg: `product ${name} Not Found` })
      else
        resolve({ code: 200, msg: `${name} price updated successfully` });
    });
  });
};

exports.updateQuantity = function (name, quantity, vendor_id) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE product SET quantity_available = ? WHERE name LIKE ? AND vendor_id = ?"
    db.run(sql, [quantity, name, vendor_id], function (err) {
      if (err) {
        err["code"] = 500;
        reject(err);
      }
      else if (!this.changes)
        reject({ code: 404, msg: `product ${name} Not Found` })
      else
        resolve({ code: 200, msg: `${name} quantity updated successfully` });
    });
  });
};