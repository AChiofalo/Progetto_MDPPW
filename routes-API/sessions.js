'use strict';
const Normalizer = require('../normalize/normalizer.js');

const userDao = require('../models/user-dao.js');
const express = require('express');
const router = express.Router();
const passport = require('passport');

const normalizer = new Normalizer();  //Normalizzatore

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      // display wrong login  messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, function (err) {
      if (err) { return next(err); }
      // req.user contains the authenticated user
      return res.json(req.user.username);
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

// POST /users
// Sign up
router.post('/users', normalizer.normalizeCreateUser, async (req, res) => {
  // create a user object from the signup form
  // additional fields may be useful (name, role, etc.)


  try {
    const user = {
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    };
    const result = await userDao.createUser(user);
    console.log(result.code);
    res.status(result.code).header('Location', `/users/${result.id}`).end()
  } catch (err) {
    res.status(err.code).json(err);
  }


});





module.exports = router;