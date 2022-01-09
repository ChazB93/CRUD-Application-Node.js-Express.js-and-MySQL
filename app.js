const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require ('body-parser');
const mysql = require('mysql');
const cors = require("cors");
const Connection = require('mysql/lib/Connection');
require('dotenv').config();


const app = express();

const port = process.env.PORT || 5000;


// parsing middleware
// parse application/ssss-form
app.use(bodyParser.urlencoded({extended: false}));

//parse application/json
app.use(bodyParser.json());

//static files
app.use(express.static('public'));

//Template engine
app.engine('hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');



//connection Pool
const pool = mysql.createPool({
 connectionLimit : 100,
 host: process.env.HOST,
 user: process.env.USER,
 password: process.env.PASSWORD,
 database: process.env.DATABASE,
 port: process.env.DB_PORT
});


//connect to database

pool.getConnection((err, Connection) => {

    if(err) throw err; //something is wrong we did not connect
    console.log('connected as ID' + Connection.threadId);
});










// hold a route path
const routes = require('./server/routes/patient');
//tell express to use this route
app.use('/', routes);



app.listen (port, () => console.log(`Listening on port ${port}`));