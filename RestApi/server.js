'use strict';
// call the packages we need//
var express = require('express');        
var bodyParser = require('body-parser');        
var mongoose = require('mongoose');  
mongoose.Promise = require('bluebird'); 
var morgan = require('morgan');
var app = express();        
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

var port = process.env.PORT || 8060; 

mongoose.connect('mongodb://localhost/employees');

var Employees = require('./Models/Employee.js');

var router = express.Router();

router.get('/', function(req, res) 
{
	console.log({ message: 'hooray! welcome to our api!' });
	res.json({ message: 'hooray! welcome to our api!' });	
});

router.get('/employees/byname/:name',function(req, res) 
{
    var name = { $regex: ".*"+req.params.name+".*", $options:'i' };
    console.log('Query for:' + name);
    Employees.find({ type : 'employee' }).where('name').equals(name).exec(function(err,employee)
    {
        if(err) res.send(err);
        res.json(employee);
    });
});

router.get('/employees/bysurname/:surname',function(req, res) 
{
    var surname = { $regex: ".*"+req.params.surname+".*", $options:'i' };
    console.log('Query for:' + surname);
    Employees.find({ type : 'employee' }).where('surname').equals(surname).exec(function(err,employee)
    {
        if(err) res.send(err);
        res.json(employee);
    });
});

router.get('/employees',function(req, res) 
{
       Employees.find({type:'employee'}).exec(function(err, employees)
       {
            if(err) throw err;
            res.send(employees);
      });
});

app.on('error', function (err) 
{
    console.error(err);
});



app.use(function (req, res, next) 
{
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("===========================");
    console.log('||Client IP|'+ ip + "|Port:" + port+"||");
    console.log("===========================");
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api',router);
app.listen(port);
console.log("==========================================================");
console.log('||Beers are served at: http://localhost:'+ port +" "+ app.settings.env+"||");
console.log("==========================================================");