"use strict";

const logger = require('morgan');   //Logger

const express = require('express'); //Server
const sessions = require('express-session'); //Sessioni


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

app.post('/api/users', /* [add here some validity checks], */ (req, res) => {
    // create a user object from the signup form
    // additional fields may be useful (name, role, etc.)
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
  
    userDao.createUser(user)
    .then((result) => res.status(201).header('Location', `/users/${result}`).end())
    .catch((err) => res.status(503).json({ error: 'Database error during the signup'}));
  });
