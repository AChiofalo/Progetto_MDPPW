"use strict";


const Normalizer = require('./normalize/normalizer.js');

const logger = require('morgan');   //Logger
const express = require('express'); //Server
const path = require('path');


const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session');
const FileStore = require('session-file-store')(session); 

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
  async function(username, password, done) {
    const res = await vendorDao.getVendor(username, password) 
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
  async function(username, password, done) {
    const res = await customerDao.getCustomer(username, password)
      if (!res.user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!res.check) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
  }
));

// serialize and de-serialize the user (user object <-> session)
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  userDao.getUserById(id).then(user => {
    done(null, user);
  });
});


passport.serializeUser((user, done) => {
  done(null, user.username); 
});

passport.deserializeUser((serializedUser, done) => {
  if(serializedUser.type === "customer")
});


app.use(session({
  store: new FileStore(), // by default, Passport uses a MemoryStore to keep track of the sessions - if you want to use this, launch nodemon with the option: --ignore sessions/
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false,
  // removing the following line will cause a browser's warning, since session cookie
  // cross-site default policy is currently not recommended
  cookie: { sameSite: 'lax' }
  
}));

app.use(passport.initialize());
app.use(passport.session());
 