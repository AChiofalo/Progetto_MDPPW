"use strict";


const Normalizer = require('./normalize/normalizer.js');

const logger = require('morgan');   //Logger
const express = require('express'); //Server
const sessions = require('express-session'); //Sessioni
const path = require('path');


const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session');

const app = express();
const port = 3000; 
app.listen(port, () => {`Listening on localhost:${port}`});

const productsRouter = require('./routes-API/products');
const vendorsRouter = require('./routes-API/vendors');
const sessionsRouter = require('./routes-API/sessions');

//QUI VANNO MIDDLEWARE
app.use(logger('short'));
app.use(express.static('public'));
app.use(express.json());

//ROUTES API
app.use('/api/sessions', sessionsRouter);
app.use('/api/vendors', vendorsRouter);
app.use('/api/products', productsRouter);
//-------
//ROUTES BASE
app.get('*', (req,res)=> {     
    res.sendFile(path.resolve(__dirname,'public', 'index.html'));
});



//const FileStore = require('session-file-store')(session);

// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use('vendor',new LocalStrategy(
  function(username, password, done) {
    const res = vendorDao.getVendor(username, password) 
      if (!res.user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!res.check) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
);

passport.use('customer',new LocalStrategy(
  function(username, password, done) {
    userDao.getUser(username, password).then(({user, check}) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!check) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
  }
));
 