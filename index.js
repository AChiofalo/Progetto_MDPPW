"use strict";

import Normalizer from './normalize/normalizer';

const logger = require('morgan');   //Logger

const express = require('express'); //Server
const sessions = require('express-session'); //Sessioni


const path = require('path');

const userDao = require('./models/customer-dao'); //Data Access Object per utenti
const productDao = require('./models/product-dao'); 
const normalizer = new Normalizer();  //Normalizzatore

const app = express();
const port = 3001;  //To change
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
app.use('/api/vendors', isLoggedIn, vendorsRouter);
app.use('/api/products', isLoggedIn, productsRouter);
//-------
//ROUTES BASE
app.get('*', (req,res)=> {     
    res.sendFile(path.resolve(__dirname,'public', 'index.html'));
});



app.post('/api/customers', normalizer.normalizeUser, normalizer.normalizeCustomer,(req, res) => {
// create a customer object from the signup form
  const user = {
    "username": req.body.username,
    "password": req.body.password,
    "role": ' CUSTOMER'
  };
  const customer = {
  "user": user,
  "first_name": req.body.first_name,
  "last_name": req.body.last_name,
  "location": req.body.location,
  "wallet": 0
  }
  
  userDao.createCustomer(customer)
  .then((result) => res.status(201).header('Location', `/customers/${result}`).end())
  .catch((err) => res.status(503).json({ error: 'Database error during the signup'}));
});

app.get('/api/products/:id', normalizer.normalizeProduct, (req,res) => {
    
  dao.getProduct(req.params.id)
  .then((result) => res.status(201).json(result).end())
  .catch((err) => res.status(503).json({ error: 'Database error during retrieve'}));
});



 