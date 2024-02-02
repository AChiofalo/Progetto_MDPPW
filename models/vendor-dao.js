'use strict';

const db = require('../db.js');

/*
  vendor (
    "name" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "wallet" INTEGER NOT NULL,  //Preferibile in cents
    PRIMARY KEY ("name")
  );
*/

/**
 * 
 * @param {Vendor} vendor
 * @returns Name del vendor o errore
 */
exports.createVendor = function (vendor) {
  return new Promise(async (resolve, reject) => {
    const sql = 'INSERT INTO vendor(id, name, description, img, wallet) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [vendor.id, vendor.name, vendor.description, vendor.img, vendor.wallet], function (err) {
      if (err) {
        if (err.errno == 19) {  //Caso già esistente
          err["code"] = 400
          err["msg"] = `${vendor.name} already present`
          reject(err)
        } else {               //Caso errore interno
          err["code"] = 500;
          err["msg"] = `Internal Error`;
          reject(err);
        }
      } else                  //Caso tutto bene
        resolve({ code: 200, msg: `${vendor.name} created successfully` });
    });
  });
};

/**
 * 
 * @param {String} name 
 * @returns Array di oggetti vendors o errore
 */
exports.searchVendorsByName = function (name) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM vendor WHERE name LIKE ?;"
    db.all(sql, [name + "%"], function (err, rows) { //% wildcard per SQL , errs: 1, 25 nella query std
      if (err) {
        err["code"] = 500;
        reject(err);
      } else {
        const vendors = rows.map((row) => (
          {
            "name": row.name,
            "description": row.description,
            "img": row.img,
            "wallet": row.wallet
          }));
        resolve({ code: 200, msg: "ok", vendors: vendors });
      }
    });
  });
};

/**
 * 
 * @param {String} name 
 * @returns oggetto vendor o errore
 */
exports.getVendor = function (name) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM vendor WHERE name LIKE ?;"
    db.get(sql, [name], function (err, row) {
      if (err) {
        err["code"] = 500;
        reject(err);
      }
      if (!row) {
        reject({ code: 404, msg: `${name} Not Found` });
      }
      else {
        const vendor =
        {
          "id": row.id,
          "name": row.name,
          "description": row.description,
          "img": row.img,
          "wallet": row.wallet
        }
        resolve({ code: 200, msg: "ok", vendor: vendor });
      }
    });
  });
};

/**
 * 
 * @param {Number} id 
 * @returns oggetto vendor o errore
 */
exports.getVendorById = function (id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM vendor WHERE id LIKE ?;"
    db.get(sql, [id], function (err, row) {
      if (err) {
        err["code"] = 500;
        reject(err);
      }
      if (!row) {
        reject({ code: 404, msg: `${id} Not Found` });
      }
      else {
        const vendor =
        {
          "id": row.id,
          "name": row.name,
          "description": row.description,
          "img": row.img,
          "wallet": row.wallet
        }
        resolve({ code: 200, msg: "ok", vendor: vendor });
      }
    });
  });
};

/**
 * 
 * @param {Number} id 
 * @returns GONE o error
 */
exports.deleteVendor = function (id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM vendor WHERE id = ?";
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

exports.updateWallet = function (name, change) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE vendor SET wallet = ? WHERE name LIKE ?"
    db.run(sql, [change, name], function (err) {
      if (err) {
        err["code"] = 500;
        reject(err);
      }
      else
        resolve({ code: 200, msg: `${name} wallet updated successfully` });
    });
  });
};

exports.updateWalletById = function (id, change) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE vendor SET wallet = ? WHERE id LIKE ?"
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