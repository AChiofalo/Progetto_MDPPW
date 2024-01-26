'use strict';
const Normalizer = require('../normalize/normalizer.js');

const daoUser = require('../models/user-dao.js');
const express = require('express');
const router = express.Router();
const passport = require('passport');

const normalizer = new Normalizer();  //Normalizzatore

router.post('/api/sessions', function(req, res, next) {
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
router.delete('/api/sessions/current', function(req, res){
    req.logout(function(err) {
        if (err) { return res.status(503).json(err); }
      });
    res.end();
  });

// POST /users
// Sign up
app.post('/api/users', /* [add here some validity checks], */async (req, res) => {
  // create a user object from the signup form
  // additional fields may be useful (name, role, etc.)
  const user = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  };

  try{
    const result = await userDao.createUser(user);
    res.status(result.code).header('Location', `/users/${result.username}`).end()
  } catch(err){
    res.status(err.code).json(err)
  }
)




  
module.exports = router;