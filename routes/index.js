var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');
var connection = require('../database/database.js');

// var jwt = require('express-jwt');

// var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

router.post('/register', function(req, res, next){
	if(!req.body.password || !req.body.email || !req.body['credit_card'] ){
		return res.status(400).json({message: "Please fill out all the fields"});
	}
	
	name = req.body.name;
	password = req.body.password;
	email = req.body.email;
	credit_card = req.body['credit_card'];
	phone = req.body.phone;
	address = req.body.address;

	responseMessage = {}
	try{
		connection.query('insert into user values (DEFAULT, ?, ?, ?);', [email, password, "u"], function(err,rows, fields) {
			if (err) throw err;
			
			console.log("user inserted")
		});
		connection.query('insert into customer(userID,fullname,creditcard,phone,addressid) values((SELECT MAX(id) from user),?,?,?,?);', [name, credit_card, phone, address], function(err,rows, fields) {
			if (err) throw err;
			
			console.log("customer inserted")
		});
		responseMessage.status = 1;
		
	} catch (err) {
		responseMessage.status = 0;
	}
	responseMessage.userType = 'u';
	res.send(responseMessage);
});
 
router.post('/login', function(req, res, next){
	if(!req.body.username || !req.body.password){
		return res.status(400).json({message: "Please fill out all the fields"});
	}
	passport.authenticate('local', function(err, user, info){
		if (err) { return next(err);}

		if (user){
			return res.json({token: user.generateJWT()});
		} else {
			return res.status(401).json(info);
		}
	})(req, res, next);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
