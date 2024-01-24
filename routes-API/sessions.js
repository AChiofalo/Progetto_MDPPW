'use strict';
const Normalizer = require('../normalize/normalizer.js');

const daoCustomer = require('../models/customer-dao.js');
const daoVendor = require('../models/vendor-dao.js');
const express = require('express');
const router = express.Router();

const normalizer = new Normalizer();  //Normalizzatore

app.post('/api/sessions', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            // display wrong login  messages
            return res.status(401).json(info);
        }
        // success, perform the login
        req.login(user, function(err) {
          if (err) { return next(err); }
          // req.user contains the authenticated user
          return res.json(req.user.username);
        });
    })(req, res, next);
  });

// DELETE /sessions/current 
// Logout
app.delete('/api/sessions/current', function(req, res){
    req.logout(function(err) {
        if (err) { return res.status(503).json(err); }
      });
    res.end();
  });



module.exports = router;