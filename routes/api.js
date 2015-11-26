var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

var connection = require('../database/database.js');

router.get('/recommendations', function(req,res){
	console.log("RESTFUL API: \t recommendations");
	authToken = req.headers.authToken;
	if (authenticateToken(authToken)){
		// authenticate success

	} else{
		// return error
	}
});

router.get('/books', function(req,res){
	console.log("RESTFUL API: \t books");
	authToken = req.headers.authToken;
	search = req.params.search;
	if (authenticateToken(authToken)){
		// authenticate success
	} else{
		// return error
	}
});

router.get('/book', auth, function(req,res){
	console.log("RESTFUL API: \t book");
	ISBN = req.query.ISBN;
	connection.query('select * from book where isbn13=?;', [ISBN] , function(err, rows, fields) {
		
		if (err) throw err;
		
		if (rows.length == 0){
			responseMessage = {};
			responseMessage.status = 0;
			res.send(responseMessage);
		} else{
			console.log(rows[0]);
			responseMessage = rows[0];
			responseMessage.status = 1;
			// responseMessage missing feedback!
			res.send(responseMessage);
		}
	});
});

router.post('/feedback/:feedback_id', function (req, res) {
	console.log("RESTFUL API: \t feedback");

	authToken = req.headers.authToken;
	
	if (authenticateToken(authToken)){
		// authenticate success
	} else{
		// return error
	}

});

router.post('/cart', function (req, res) {
	console.log("RESTFUL API: \t cart");

	authToken = req.headers.authToken;
	
	if (authenticateToken(authToken)){
		// authenticate success
	} else{
		// return error
	}

});


router.post('/order', function (req, res) {
	console.log("RESTFUL API: \t order");
	authToken = req.headers.authToken;

	if (authenticateToken(authToken)){
		// authenticate success
	} else{
		// return error
	}

});

router.get('/user', function (req, res) {
	console.log("RESTFUL API: \t user");
	authToken = req.headers.authToken;
	
	if (authenticateToken(authToken)){
		// authenticate success
	} else{
		// return error
	}

});

module.exports = router;