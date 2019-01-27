const express = require('express');
const path = require('path');
const bodyParser = require('path');
const errorHandler = require('errorhandler');
const Query = require('./query.js');
const Validator = require('./Validator.js');
mongoose.promise = global.Promise;



const isProduction = process.env.NODE_ENV === 'production';
const app = express();
app.use(cors());
//enabling cross origin resourse
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));



const port = 3000;

app.use('/',express.static(__dirname));
app.listen(port, ()=>console.log(`Example app listening on port ${port}`));