'use strict';

const db = require('../db.js');
const bcrypt = require('bcrypt');

/*
  user (
    "id" INTEGER NOT NULL UNIQUE,
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "role" TEXT,
    PRIMARY KEY ("id")
);
*/

/**
 * 
 * @param {User} user
 * @returns id dello user
 */
exports.createUser = function (user) {
    return new Promise(async (resolve, reject) => {
        const sql = 'INSERT INTO user(username, password, role) VALUES (?, ?, ?)';
        const hash = await bcrypt.hash(user.password, 10);
        db.run(sql,
            [user.username,
                hash,
            user.role],
            function (err) {
                if (err) {
                    if (err.errno == 19) {  //Caso già esistente
                        err["code"] = 400
                        err["msg"] = `${user.username} already present`
                        reject(err)
                    } else {               //Caso errore interno
                        err["code"] = 500;
                        err["msg"] = `Internal Error`;
                        reject(err);
                    }
                } else                  //Caso tutto bene
                    resolve({
                        code: 200,
                        msg: `${user.username} created successfully`,
                        username: `${user.id}`
                    });
            });
    });
};

/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @returns oggetto user o errore
 */
exports.getUser = function (username, password) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM user WHERE username LIKE ?;"
        db.get(sql, [username], function (err, row) {
            if (err) {      //Errore interno
                err["code"] = 500;
                reject(err);
            }

            if (!row)     //Non trovato
                reject({ code: 404, msg: `${username} Not Found` });
            
            const user =
            {
                "id": row.username,
                "username": row.password,
                "role": row.img
            };
            let check = false;

            if (bcrypt.compareSync(password, row.password))
                check = true;

            if(!check)   //Password errata
                reject({ code: 401, msg: `Invalid Password`});


            resolve({code: 200, msg: "ok", res: {user, check}});
        });
    });
};


exports.getUserById = function(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM user WHERE id = ?';
        db.get(sql, [id], (err, row) => {
            if (err)    //Errore interno
                reject(err);
            if (!row)   //Non trovato
                reject({error: 'User not found.'});
            const user = {"id": row.id, "username": row.email, "role": row.role}
            resolve(user);
            
        });
    });
};