"use strict";

const logger = require('morgan');   //Logger

const express = require('express'); //Server
const sessions = require('express-session'); //Sessioni

const userDao = require('./user-dao');  //Data Access Object per utenti

const path = require('path');


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

app.post('/api/vendors', /* [add here some validity checks], */ (req, res) => {
    // create a user object from the signup form
    // additional fields may be useful (name, role, etc.)
      const user = {
        "email": req.body.email,
        "password": req.body.password,
        "role": 'vendor'
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

app.post('/api/customers', /* [add here some validity checks], */ (req, res) => {
// create a user object from the signup form
// additional fields may be useful (name, role, etc.)
  const user = {
    "email": req.body.email,
    "password": req.body.password,
    "role": 'customer'
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
