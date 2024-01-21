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
 * @param {    const user = {
        "username": req.body.username,
        "password": req.body.password,
        "role": 'VENDOR'
    };
    const vendor = {
      "user": user,
      "name": req.body.name,
      "location": req.body.location,
      "description": "",
      "img": "none",
      "wallet": 0
    }} vendor 
 * @returns 
 */
exports.createVendor = async function(vendor) {
  return new Promise((resolve, reject) => {
    const sqlVendor = 'INSERT INTO vendor(email, password) VALUES (?, ?)'
    
    createUser(vendor.user).then((id) => {

    }



    );


    


  })

}