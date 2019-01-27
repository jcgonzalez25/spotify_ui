const express = require('express');
const path = require('path');
const bodyParser = require('path');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');


mongoose.promise = global.Promise;



const isProduction = process.env.NODE_ENV === 'production'

const app = express();
app.use(cors());
//enabling cross origin resourse
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public'));
app.use(session(
    {secret:'passport-tutorial',cookie:{maxAge:600},resave:false,saveUninitialized:}
));



const port = 3000;
const Query = require('./query.js');
const Validator = require('./Validator.js');
app.use('/',express.static(__dirname));
app.listen(port, ()=>console.log(`Example app listening on port ${port}`));