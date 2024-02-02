'use strict';
const Normalizer = require('../normalize/normalizer.js');

const userDao = require('../models/user-dao.js');
const express = require('express');
const router = express.Router();
const passport = require('passport');

const normalizer = new Normalizer();  //Normalizzatore

/**
 * POST /sessions
 * Login 
 */
router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, function (err) {
      if (err) { return next(err); }
      // req.user contains the authenticated user
      return res.json(req.user);
    });
  })(req, res, next);
});

// DELETE /sessions/current 
// Logout
router.delete('/current', function (req, res) {
  req.logout(function (err) {
    if (err) { return res.status(503).json(err); }
  });
  res.end();
});

module.exports = router;