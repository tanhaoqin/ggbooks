var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

var connection = require('../database/database.js');

/*
select feedback.fbID, feedback.date, feedback.score, feedback.comment, customer.fullname, customer.userID from feedback
left join customer on (feedback.userID = customer.userID)
where book like '9780007179732' 
ORDER BY avgUseful 
DESC  LIMIT 0, 1;
*/

isbn13 = '9780007179732';
start = 0;
end = 1;

responseMessage = {}
try{
	query = "select feedback.fbID, feedback.date, feedback.score, feedback.comment, customer.fullname, customer.userID from feedback left join customer on (feedback.userID = customer.userID) where book like ?  ORDER BY avgUseful  DESC  LIMIT ?, ?;"
	connection.query(query,[isbn13, start, end], function(err, rows, fields) {
		if (err) throw err;
		responseMessage.feedback = rows;
		// res.send(responseMessage);
		// console.log(rows);
		console.log(responseMessage);
	});
} catch (err){
	console.log(err);
	responseMessage.feedback = [];
	// res.send(responseMessage)
}



router.get('/book', auth, function(req,res){
	console.log("RESTFUL API: \t book");
	isbn13 = req.query.isbn13;

	responseMessage = {};
	try{
		connection.query('select * from book where ISBN13 LIKE ?;', [isbn13] , function(err, rows, fields) {	
			if (err) throw err;
			
			if (rows.length == 0){
				responseMessage.status = 0;
				res.send(responseMessage);
			} else{
				responseMessage = rows[0];
				responseMessage.status = 1;
				connection.query('select fbID,date,score,comment,userID from feedback where book like ?;', [isbn13] , function(err, rows, fields) {
					if (err) throw err;
					if (rows.length == 0){
						responseMessage.feedback = [];
						res.send(responseMessage);
					} else{
						responseMessage.feedback = rows;
						res.send(responseMessage);
					}
				});
			}
		});
	} catch (err){
		console.log(err);
		responseMessage.status = 0;
		res.send(responseMessage);
	}
});

router.get('/books', auth, function(req,res){
	console.log("RESTFUL API: \t books");
	search = req.query.search;
	responseMessage = {}
	try{
		connection.query("select * from book where title like '%"+search+"%' or author like '%"+search+"%';", function(err, rows, fields) {
			if (err) throw err;
			if (rows.length == 0){
				responseMessage.status = 0;
				res.send(responseMessage);
			} else{
				responseMessage.status = 1;
				responseMessage.book = rows;
				res.send(responseMessage);
			}
		});
	} catch(err){
		console.log(err);
		responseMessage.status = 0;
		res.send(responseMessage);
	}

});

router.get('/feedback', auth, function(req,res){
	console.log("RESTFUL API: \t feedback");
	isbn13 = req.query.isbn13;
	start = req.query.start;
	end = req.query.end;

	responseMessage = {}
	try{
		query = "select feedback.fbID, feedback.date, feedback.score, feedback.comment, customer.fullname, customer.userID from feedback left join customer on (feedback.userID = customer.userID) where book like ?  ORDER BY avgUseful  DESC  LIMIT ?, ?;"
		connection.query(query,[isbn13, start, end], function(err, rows, fields) {
			if (err) throw err;
			responseMessage.feedback = rows;
			res.send(responseMessage);
		});
	} catch (err){
		console.log(err);
		responseMessage.feedback = [];
		res.send(responseMessage)
	}


});


router.post('/feedback', auth, function (req, res) {
	console.log("RESTFUL API: \t feedback");
	console.log("hello");
	console.log(req);
	isbn13 = req.query.isbn13;
	user = req.query.user;
	score = req.query.score;
	comment = req.query.comment;

	responseMessage = {};
	try{
		connection.query('INSERT into feedback (score, comment, userID, book) values (?,?,?,?);', [score, comment, user, isbn13], function(err,rows, fields) {
			if (err) throw err;
			responseMessage.status = 1;
			res.send(responseMessage);
		});
	} catch (err){
		console.log(err);
		responseMessage.status = 0;
		res.send(responseMessage);
	}
});

router.post('/feedback/rating', auth ,function (req, res) {
	console.log("RESTFUL API: \t feedback/rating");
	user = req.query.user;
	feedback = req.query.feedback;
	rating = req.query.rating;
	responseMessage = {};
	try{
		connection.query('INSERT into rating (usefulness, fbID, userID) values (?,?,?);', [rating, feedback, user], function(err, rows, fields) {
			if (err) throw err;
			responseMessage.status = 1;
			res.send(responseMessage);
		});
	} catch (err){
		console.log(err);
		responseMessage.status = 0;
		res.send(responseMessage);
	}
});



module.exports = router;