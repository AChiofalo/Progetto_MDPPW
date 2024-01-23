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
exports.createVendor =  function(vendor) {
return new Promise( async (resolve, reject) => {
    const sql = 'INSERT INTO vendor(username, password, description, img, wallet) VALUES (?, ?, ?, ?, ?)';
    const hash = await bcrypt.hash(vendor.password, 10);
    db.run(sql, [vendor.username, hash, vendor.description, vendor.img, vendor.wallet], function(err) {
      if(err){
        if(err.errno == 19){
          err["code"] = 400
          err["msg"] = `${vendor.username} already present`
          reject(err)
        }
        else{
          err["code"] = 500;
          err["msg"] = `Internal Error`
          reject(err);
        }
      }
      else 
        resolve({code:200,msg:`${vendor.username} created successfully`});
    });
    })
}; 

/**
 * 
 * @param {String} username 
 * @returns Array di oggetti vendors o errore
 */
exports.searchVendorsByUsername =  function(username) {
    return new Promise(  (resolve, reject) => {  
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
 * @returns oggetto vendor o errore
 */
exports.getVendor =  function(username) {
  return new Promise(  (resolve, reject) => {  
    const sql = "SELECT username, description, img FROM vendor WHERE username LIKE ?;" 
    db.get(sql, [username], function(err, row) { 
        if (err) 
          reject(err);
        if(!row)
          reject({code:404})
        else{
          const vendor = 
            { 
              "username":row.username,
              "description":row.description, 
              "img":row.img,
            }
            resolve(vendor); 
        }
        });
    });
};

/**
 * 
 * @param {String} username 
 * @returns GONE o error
 */
exports.deleteVendor =  function(username) {
  return new Promise( (resolve, reject) => {  
    const sql = "DELETE FROM vendor WHERE username LIKE ?";
    db.run(sql, [username], function(err) { 
        if (err) {
          err["code"] = 500;
          reject(err);
        }
        else if(!this.changes)
          reject({code:404,msg:`${username} not present`})

        else
          resolve({code:200,msg:`${username} deleted successfully`}); 
        });
    });
};

exports.updateWallet = function(username, change){
  return new Promise((resolve, reject) => {
  const sql = "UPDATE vendor SET wallet = ? WHERE username LIKE ?"
  db.run(sql, [change,username], function(err) {
    if(err){
      err["code"] = 500;
      reject(err);
    }
    else
      resolve({code:200,msg:`${username} wallet updated successfully`});
  });
})}