var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

var connection = require('../database/database.js');



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
		connection.query("select * from book where title like '%"+search+"%' or author like '%"+search+"%' or isbn13 like '%"+search+"%';", function(err, rows, fields) {
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
	isbn13 = req.body.isbn13;
	user = req.payload._id;
	score = req.body.score;
	comment = req.body.comment;

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
	user = req.payload._id;
	feedback = req.body.feedback;
	rating = req.body.rating;

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

router.post('/cart', auth, function (req, res) {
	console.log("RESTFUL API: \t cart");
	console.log("hello");
	console.log(req);
	isbn13 = req.body.isbn13;
	user = req.payload._id;
	quantity = req.body.quantity;

	responseMessage = {};
	try{
		connection.query('INSERT into cart (user, book,quantity) values (?,?,?);', [user, ISBN13, quantity], function(err,rows, fields) {
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

router.get('/cart', auth, function(req,res){
	console.log("RESTFUL API: \t cart");
	user = req.payload._id;

	responseMessage = {}
	try{
		query = "select * from book b join cart c where c.book=b.isbn13 and userID=?;"
		connection.query(query,[user], function(err, rows, fields) {
			if (err) throw err;
			responseMessage.cart = rows;
			res.send(responseMessage);
		});
	} catch (err){
		console.log(err);
		responseMessage.cart = [];
		res.send(responseMessage)
	}
});

router.delete('/cart', auth, function(req,res){
	console.log("RESTFUL API: \t cart");
	user = req.payload._id;
	isbn13 = req.body.isbn13;

	responseMessage = {}
	try{
		query = "delete from cart where userID like ? AND book like ?;"
		connection.query(query,[user,isbn13], function(err, rows, fields) {
			if (err) throw err;
			responseMessage.status = 1;
			res.send(responseMessage);
		});
	} catch (err){
		console.log(err);
		responseMessage.status = 0;
		res.send(responseMessage)
	}
});

router.post('/order', auth, function (req, res) {
	console.log("RESTFUL API: \t order");
	console.log("hello");
	console.log(req);
	user = req.payload._id;

	responseMessage = {};
	try{
		connection.query('INSERT into orders (userID, totalcost, creditcard) values (?, (select sum(b.price)*c.quantity from book b join cart c where b.isbn13=c.book and c.userID=?),(select creditcard from user where userID=?)));', [user,user,user], function(err,rows, fields) {
			if (err) throw err;	
		});
		connection.query('INSERT into orderItem select o.orderid, c.book,c.quantity from orders o join cart c where o.userID=c.userID AND o.userID=?;', [user], function(err,rows, fields) {
			if (err) throw err;	
		});
		connection.query('DELETE from cart where userID=?;', [user], function(err,rows, fields) {
			if (err) throw err;	
		});
		responseMessage.status = 1;
		res.send(responseMessage);
	} catch (err){
		console.log(err);
		responseMessage.status = 0;
		res.send(responseMessage);
	}
});

router.get('/user', auth, function(req,res){
	console.log("RESTFUL API: \t user");
	user = req.payload._id;

	responseMessage = {}
	try{
		query = "select * from customer where userID = ?;"
		connection.query(query,[user], function(err, rows, fields) {
			if (err) throw err;
			responseMessage.user = rows;
		});
		query = "select * from orders o join orderItem oi join book b where oi.book=b.isbn13 AND o.orderId=oi.orderId AND o.userID= ?;"
		connection.query(query,[user], function(err, rows, fields) {
			if (err) throw err;
			responseMessage.orders = rows;
		});
		query = "select * from feedback f join book b where f.book=b.isbn13 AND f.userID = ?;"
		connection.query(query,[user], function(err, rows, fields) {
			if (err) throw err;
			responseMessage.feedback = rows;
		});
		res.send(responseMessage);
	} catch (err){
		console.log(err);
		responseMessage.cart = [];
		res.send(responseMessage)
	}
});

router.get('/recommendation', auth, function(req,res){
	console.log("RESTFUL API: \t recommendation");
	user = req.payload._id;

	responseMessage = {}
	try{
		query = "select * from customer where userID = ?;"
		connection.query(query,[user], function(err, rows, fields) {
			if (err) throw err;
			responseMessage.user = rows;
		});
		query = "select * from orders o join orderItem oi join book b where oi.book=b.isbn13 AND o.orderId=oi.orderId AND o.userID= ?;"
		connection.query(query,[user], function(err, rows, fields) {
			if (err) throw err;
			responseMessage.orders = rows;
		});
		query = "select * from feedback f join book b where f.book=b.isbn13 AND f.userID = ?;"
		connection.query(query,[user], function(err, rows, fields) {
			if (err) throw err;
			responseMessage.feedback = rows;
		});
		res.send(responseMessage);
	} catch (err){
		console.log(err);
		responseMessage.cart = [];
		res.send(responseMessage)
	}
});



module.exports = router;