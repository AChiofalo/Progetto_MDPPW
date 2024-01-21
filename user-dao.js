'use strict';

const db = require('./db.js');
const bcrypt = require('bcrypt');

exports.createUser = function(user) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO user(username, password, role) VALUES (?, ?,?)';
    // create the hash as an async call, given that the operation may be CPU-intensive (and we don't want to block the server)
    bcrypt.hash(user.password, 10).then((hash => {
      db.run(sql, [user.username, hash], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(
            user.username
          );
        }
      });
    }));
  });
}

exports.getUserById = function(id) {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE id = ?';
      db.get(sql, [id], (err, row) => {
          if (err) 
              reject(err);
          else if (row === undefined)
              resolve({error: 'User not found.'});
          else {
              const user = {id: row.id, username: row.email}
              resolve(user);
          }
      });
  });
};

exports.getUser = function(email, password) {
  return new Promise((resolve, reject) => {

      const sql = 'SELECT * FROM user WHERE email = ?';
      db.get(sql, [email], (err, row) => {
          if (err) 
              reject(err);
          else if (row === undefined)
              resolve({error: 'User not found.'});
          else {
            const user = {id: row.id, username: row.email};
            let check = false;
            
            if(bcrypt.compareSync(password, row.password))
              check = true;

            resolve({user, check});
          }
      });
  });
};

/**
 * 
 * @param vendor {    
      "username": req.body.username,
      "password": req.body.password,
      "description": req.body.description,
      "img": "none",
      "wallet": 0
 * @returns 
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

exports.searchVendorsByUsername = async function(username) {
  return new Promise( async (resolve, reject) => {  
    const sql = 'SELECT username, description, img FROM vendor WHERE username LIKE ?%'; //% wildcard per SQL
    db.all(sql, [username], function(err, rows) {
      
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