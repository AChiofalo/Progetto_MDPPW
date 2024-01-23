'use strict';

const db = require('../db.js');
const bcrypt = require('bcrypt');

/*
  vendor (
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "wallet" INTEGER NOT NULL,
    PRIMARY KEY ("username")
  );
*/

/**
 * 
 * @param {Vendor} vendor
 * @returns Username del vendor o errore
 */
exports.createVendor = async function(vendor) {
return new Promise( async (resolve, reject) => {
    const sql = 'INSERT INTO vendor(username, password, description, img, wallet) VALUES (?, ?, ?, ?, ?)';
    const hash = await bcrypt.hash(vendor.password, 10);
    db.run(sql, [vendor.username, hash, vendor.description, vendor.img, vendor.wallet], function(err) {
        if (err) 
        reject(err);
        else 
        resolve(vendor.username);
    });
    })
}; 

/**
 * 
 * @param {String} username 
 * @returns Array di oggetti vendors o errore
 */
exports.searchVendorsByUsername = async function(username) {
    return new Promise( async (resolve, reject) => {  
      const sql = "SELECT username, description, img FROM vendor WHERE username LIKE ?;" 
      db.all(sql, [username+"%"], function(err, rows) { //% wildcard per SQL , errs: 1, 25 nella query std
          if (err) 
            reject(err);
          else {
            const vendors = rows.map((row)=>(
            { 
              "username":row.username,
              "description":row.description, 
              "img":row.img,
            }
            ));
            resolve(vendors); 
          }});
      });
};

/**
 * 
 * @param {String} username 
 * @returns Array di oggetti vendors o errore
 */
exports.searchVendorsByUsername = async function(username) {
  return new Promise( async (resolve, reject) => {  
    const sql = "SELECT username, description, img FROM vendor WHERE username LIKE ?;" 
    db.all(sql, [username+"%"], function(err, rows) { //% wildcard per SQL , errs: 1, 25 nella query std
        if (err) 
          reject(err);
        else {
          const vendors = rows.map((row)=>(
          { 
            "username":row.username,
            "description":row.description, 
            "img":row.img,
          }
          ));
          resolve(vendors); 
        }});
    });
};