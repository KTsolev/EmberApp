var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var EmployeeSchema  = new Schema({	
	type: String,
	gender: String,
	title: String,
	name: String,
	surname: String,
	age: Number,
	date_of_birth: Date,
	salary: Number,
	income_tax: Number,
	take_home: Number,
	national_insurance: Number
});

module.exports = mongoose.model('Employee', EmployeeSchema);