"use strict";


const Normalizer = require('./normalize/normalizer.js');

const logger = require('morgan');   //Logger
const express = require('express'); //Server
const sessions = require('express-session'); //Sessioni
const path = require('path');

/*const userDao = require('./models/customer-dao'); //Data Access Object per utenti
const productDao = require('./models/product-dao'); 
const normalizer = new Normalizer();  //Normalizzatore
*/

const app = express();
const port = 3000;  //To change
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
 