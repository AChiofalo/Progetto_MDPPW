"use strict";

import Normalizer from './normalize/normalizer';

const logger = require('morgan');   //Logger

const express = require('express'); //Server
const sessions = require('express-session'); //Sessioni


const path = require('path');

const userDao = require('./models/user-dao');  //Data Access Object per utenti
const normalizer = new Normalizer();  //Normalizzatore

const app = express();
const port = 3001;  //To change
app.listen(port, () => {`Listening on localhost:${port}`});

//QUI VANNO MIDDLEWARE
app.use(logger('short'));
app.use(express.static('public'));
//



app.get('*', (req,res)=> {     
    res.sendFile(path.resolve(__dirname,'public', 'index.html'));
});

app.post('/api/vendors', normalizer.normalizeUser, normalizer.normalizeVendor ,(req, res) => {
    const user = {
        "username": req.body.username,
        "password": req.body.password,
        "role": 'VENDOR'
    };
    const vendor = {
      "user": user,
      "name": req.body.name,
      "location": req.body.location,
      "description": "",
      "img": "none",
      "wallet": 0
    }
  
    userDao.createVendor(vendor)
    .then((result) => res.status(201).header('Location', `/vendors/${result}`).end())
    .catch((err) => res.status(503).json({ error: 'Database error during the signup'}));
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

app.get('/api/vendors/:id', normalizer.normalizeVendor, (req,res) => {
    
  dao.getVendor(req.params.id)
  .then((result) => res.status(201).json(result).end())
  .catch((err) => res.status(503).json({ error: 'Database error during retrieve'}));
});

app.get('/api/vendors', normalizer.normalizeVendor ,(req,res) => {
    
  dao.getVendors(req.params.id)
  .then((result) => res.status(201).json(result).end())
  .catch((err) => res.status(503).json({ error: 'Database error during retrieve'}));
});

 