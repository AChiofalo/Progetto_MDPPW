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

//QUI VANNO MIDDLEWARE GENERICHE
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
//ROUTES API
app.use('/api/sessions', sessionsRouter);
app.use('/api/vendors', vendorsRouter);
app.use('/api/products', productsRouter);
//-------
//ROUTES BASE
app.get('*', (req,res)=> {     
    console.log(req.session);
    res.sendFile(path.resolve(__dirname,'public', 'index.html'));
});


const isVendor = (req, res, next) => {
  if(req.isAuthenticated() && req.user.type == 'vendor'){
      return next();
  }
  return res.status(401).json({"statusCode" : 401, "message" : "not authenticated"});
}

const isCustomer = (req, res, next) => {
  if(req.isAuthenticated() && req.user.type == 'customer'){
      return next();
  }
  return res.status(401).json({"statusCode" : 401, "message" : "not authenticated"});
}



const verify = async (username, password, done) => {
  try{
    const res = await vendorDao.getVendor(username, password);
    return done(null,res.vendor); //Username e password corretti

  }catch(err){
    if(err.code === 404) return done(null,false); //Username errato

    if(err.code === 401) return done(null,false); //Password errata

    return done(err); //Errore generico
  }
}

passport.use('vendor', new LocalStrategy(verify)); //Primo parametro sbagliato?
 

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

*/




app.use(passport.initialize());
app.use(passport.session());
 

const port = 3000; 
app.listen(port, () => {`Listening on localhost:${port}`});