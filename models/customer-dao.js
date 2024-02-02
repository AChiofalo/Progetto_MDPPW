'use strict';

const db = require('../db.js');



/**
 * 
 * @param {Customer} customer
 * @returns Name del customer o errore
 */
exports.createCustomer = function (customer) {
  return new Promise(async (resolve, reject) => {
    const sql = 'INSERT INTO customer(id, first_name, last_name, wallet) VALUES (?, ?, ?, ?)';
    db.run(sql, [customer.id, 
        customer.first_name, 
        customer.last_name, 
        customer.wallet], function (err) {
        if (err) {
               //Caso errore interno
          err["code"] = 500;
          err["msg"] = `Internal Error`;
          reject(err);
        }
        else                  //Caso tutto bene
        resolve({ code: 200, msg: `customer: ${customer.id} created successfully` });
    });
  });
};


/**
 * 
 * @param {Numer} id 
 * @returns oggetto customer o errore
 */
exports.getCustomerById = function (id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM customer WHERE id = ?;"
    db.get(sql, [id], function (err, row) {
      if (err) {
        err["code"] = 500;
        reject(err);
      }
      if (!row) {
        reject({ code: 404, msg: `${id} Not Found` });
      }
      else {
        const customer =
        {
          "id": row.id,
          "first_name": row.first_name,
          "last_name": row.last_name,
          "wallet": row.wallet
        }
        resolve({ code: 200, msg: "ok", customer: customer });
      }
    });
  });
};


/**
 * 
 * @param {Number} id 
 * @returns GONE o error
 */
exports.deleteCustomer = function (id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM customer WHERE id = ?";
    db.run(sql, [id], function (err) {
      if (err) {
        err["code"] = 500;
        reject(err);
      }
      else if (!this.changes)
        reject({ code: 404, msg: `${id} not present` })
      else
        resolve({ code: 200, msg: `${id} deleted successfully` });
    });
  });
};

exports.updateWalletById = function (id, change) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE customer SET wallet = ? WHERE id LIKE ?"
    db.run(sql, [change, id], function (err) {
      if (err) {
        err["code"] = 500;
        reject(err);
      }
      else
        resolve({ code: 200, msg: `${id} wallet updated successfully` });
    });
  });
};


