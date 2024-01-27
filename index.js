"use strict";

const logger = require('morgan');   //Logger
const express = require('express'); //Server
const path = require('path');


const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session');
//const FileStore = require('session-file-store')(session); 

const app = express();


const productsRouter = require('./routes-API/products');
const vendorsRouter = require('./routes-API/vendors');
const sessionsRouter = require('./routes-API/sessions');

const userDao = require('./models/user-dao');


app.use(logger('short'));

app.use(express.json());

app.use(session({
  //store: new FileStore(), // by default, Passport uses a MemoryStore to keep track of the sessions - if you want to use this, launch nodemon with the option: --ignore sessions/
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: true,
  // removing the following line will cause a browser's warning, since session cookie
  // cross-site default policy is currently not recommended
  cookie: { 
    sameSite: 'lax',
    magAge: 1000 * 60
  }
}));

app.use(express.static('public'));



const verify = async (username, password, done) => {
  try{
    const res = await userDao.getUser(username, password);
    return done(null,res.user); //Username e password corretti

  }catch(err){
    if(err.code === 404) return done(null,false); //Username errato

    if(err.code === 401) return done(null,false); //Password errata

    return done(err); //Errore generico
  }
}

passport.use(new LocalStrategy(verify));
 

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

//Aggiunge al req la chiave user, usata successivamente
passport.deserializeUser(function(id, done) {

  userDao.getUserById(id).then(user => {
    done(null, user);
  }).catch();
});





app.use(passport.initialize());
app.use(passport.session());


//ROUTES API
app.use('/api/sessions', sessionsRouter);
app.use('/api/vendors', vendorsRouter);
app.use('/api/products', productsRouter);
//-------
//ROUTES BASE, page.js agisce prima
app.get('*', (req,res)=> {     
    res.sendFile(path.resolve(__dirname,'public', 'index.html'));
});

 
const port = 3000; 
app.listen(port, () => {`Listening on localhost:${port}`});