/**
 * @description : this is express/node server entry point
 * @methods : db connection, setting req-res headers , serverlogs , server routes ,setting up all middlewares, start server
 * @author : Nilesh Patil , 18 Nov 2019 
 */

// Import all external modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
var Sequelize = require('sequelize');


// Import internal app dependencies 
const keys = require('./config/keys');


// Initialize express middleware 
const app = express();

// Added bootstrap , jquery modeles 
// app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
// app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
// app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// MySql Connection
const sequelize = new Sequelize(keys.MySQL.path, { operatorsAliases: '0', pool: { "acquire": 120000 } });
sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
}).finally(() => {
    sequelize.close();
});

// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, enctype");
    next();
});

// Morgan - server logs middleware
app.use(morgan('dev'));

// Setup static assests directory
app.use('/assets', express.static(path.join(__dirname, 'assets')))

// Add body-parser 
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))


// Add all roues here
// Added below test route
app.get('/', function (req, res) {
    res.send("App Working.....");
});
app.use('/users', require('./routes/users'));




//Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT);

console.log('server is running at port :' + PORT)