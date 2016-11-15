var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var fs = require('fs');
var obj = {};
var file = "./Models/employees.json";

mongoose.connect("mongodb://localhost/employees");
var Employees = require("./Models/Employee.js");

fs.readFile(file, 'utf8', function (err, data) 
{
 	 if (err) throw err;
  	 obj = JSON.parse(data);
 		
	for (var i = 0; i < obj.length; i++)
	{
	  val = obj[i];
	  var date = obj[i].date_of_birth.split('/');
	  date[1]--;
	  date[0]++;
	  console.log(date);
	  var dt = new Date(date[2],date[1],date[0]);
	  console.log(dt);
	  /*var newEmployee = new Employees({
	  	  type: val.type,
	  	  gender: val.gender,
	  	  title: val.title,
	  	  name: val.name,
	  	  surname: val.surname,
	  	  age: parseInt(val.age),
	  	  date_of_birth: dt,
	  	  salary: parseFloat(val.salary),
	  	  income_tax: parseFloat(val.income_tax),
	  	  take_home: parseFloat(val.take_home),
	  	  national_insurance: parseFloat(val.national_insurance)
	  });
	  console.log(newEmployee);
	  newEmployee.save(function(err){
	  		if(err) throw err;
	  		Employees.find({type:'employee'}).exec(function(err, items){
	  				if(err) throw err;
	  				for (var i = 0; i < items.length; i++) 
	  				{
	  					console.log(items[i]);
	  				}
	  		});
	  });*/
	}
});