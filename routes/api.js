var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

var connection = require('../database/database.js');

router.get('/book', auth, function(req,res){
	console.log("RESTFUL API: \t book");
	isbn13 = req.query.isbn13;
	user = req.payload._id;

	responseMessage = {};
	try{
		connection.query('select * from book where ISBN13 LIKE ?;', [isbn13] , function(err, rows, fields) {	
			if (err) throw err;
			
			if (rows.length == 0){
				responseMessage.status = 0;
			} else{
				responseMessage = rows[0];
				responseMessage.status = 1;

				connection.query('select fbID from feedback where book LIKE ? AND userID like ?;', [isbn13,user] , function(err, rows, fields) {	

					if (err) throw err;
				
					if (rows.length == 0){
						responseMessage.fb_sub = 0;
					} else{
						responseMessage.fb_sub = 1;
					}
					connection.query("select count(fbID) from feedback where book LIKE ?",[isbn13], function(err, rows, fields) {
						if (err) throw err;
						responseMessage.fb_quantity = rows[0];
					});

					res.send(responseMessage);

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

	responseMessage = {};
	try{
		connection.query("select * from book where title like '%"+search+"%' or author like '%"+search+"%' or isbn13 like '%"+search+"%';", function(err, rows, fields) {
			if (err) throw err;
			if (rows.length == 0){
				responseMessage.status = 0;
			} else{
				responseMessage.status = 1;
				responseMessage.book = rows;
			}
			res.send(responseMessage);
		});
	} catch(err){
		console.log(err);
		responseMessage.status = 0;
		res.send(responseMessage);
	}

});

router.get('/feedback', auth, function(req,res){
	console.log("RESTFUL API: \t feedback");
	user = req.payload._id;
	isbn13 = req.query.isbn13;
	start = parseInt(req.query.start);
	end = parseInt(req.query.end);
	console.log(start, end, isbn13);

	responseMessage = {};
	try{

		query = "select f.fbID, f.date, f.score, f.comment, c.fullname, c.userID from feedback f, customer c where  f.userID = c.userID and f.book like ?  ORDER BY f.avgUseful  DESC  LIMIT ?, ?;"
		console.log(query);

		connection.query(query,[isbn13, start, end], function(err, rows, fields) {
			if (err) throw err;

			responseMessage['feedback'] = rows;
			query = "select usefulness,fbID from rating where userID = ?;";
			connection.query(query,[user], function(err, rows, fields) {
				if (err) throw err;
				responseMessage['rating'] = rows;
				console.log(responseMessage);
				res.send(responseMessage);
			});
		});

	} catch (err){
		console.log(err);
		responseMessage['feedback'] = [];
		res.send(responseMessage);
	}
});

router.post('/feedback', auth, function (req, res) {
	console.log("RESTFUL API: \t feedback");
	isbn13 = req.body.isbn13;
	user = req.payload._id;
	score = parseInt(req.body.score);
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
	rating = parseInt(req.body.rating);

	responseMessage = {};
	try{
		connection.query('SELECT * from feedback where fbID like ? and userID like ?;', [feedback, user], function(err, rows, fields) {
			if (err) throw err;
			if (rows.length == 0){
				connection.query('INSERT into rating (usefulness, fbID, userID) values (?,?,?);', [rating, feedback, user], function(err, rows, fields) {
					if (err) throw err;
					responseMessage.status = 1;
					res.send(responseMessage);
				});
			} else{
				connection.query('update rating set usefulness=? where fbID like ? and userID like ?;', [rating, feedback, user], function(err, rows, fields) {
					if (err) throw err;
					responseMessage.status = 1;
					res.send(responseMessage);
				});
			}
		});
	} catch (err){
		console.log(err);
		responseMessage.status = 0;
		res.send(responseMessage);
	}
});

router.put('/feedback/rating', auth ,function (req, res) {
	console.log("RESTFUL API: \t feedback/rating");
	user = req.payload._id;
	feedback = req.body.feedback;
	rating = parseInt(req.body.rating);

	responseMessage = {};
	try{
		connection.query('UPDATE rating set usefulness = ? where fbID=? and userID=?;', [rating, feedback, user], function(err, rows, fields) {
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
	isbn13 = req.body.isbn13;
	user = req.payload._id;
	quantity = req.body.quantity;

	responseMessage = {};
	try{
		connection.query('SELECT * from cart where userID=? AND book=?;', [user, isbn13], function(err,rows, fields) {
			if (err) throw err;
			if (rows.length == 0){
				connection.query('INSERT into cart (userID, book,quantity) values (?,?,?);', [user, isbn13, quantity], function(err,rows, fields) {
					if (err) throw err;
					responseMessage.status = 1;
					res.send(responseMessage);
				});
			} else{
				connection.query('UPDATE cart set quantity=? where  userID=? and book=?;', [quantity,user, isbn13], function(err,rows, fields) {
					if (err) throw err;
					responseMessage.status = 1;
					res.send(responseMessage);
				});
			}
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
	console.log("RESTFUL API: DELETE \t cart");
	user = req.payload._id;
	isbn13 = req.query.isbn13;

	responseMessage = {}
	try{
		query = "delete from cart where userID like ? AND book like ?;"
		connection.query(query,[user,isbn13], function(err, result) {
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
		connection.beginTransaction(function(err) {
		  if (err) { throw err; }
		  connection.query('INSERT into orders (userID, totalcost, creditcard) values (?, (select sum(b.price)*c.quantity from book b join cart c where b.isbn13=c.book and c.userID=?),(select creditcard from customer where userID=?));', [user,user,user], function(err, result) {
		    if (err) { 
		      connection.rollback(function() {
		        throw err;
		      });
		    }

		    console.log('Order added');

		    connection.query('INSERT into orderItem select o.orderid, c.book,c.quantity from orders o join cart c where o.userID=c.userID AND o.userID=?;', [user], function(err, result) {
		      if (err) { 
		        connection.rollback(function() {
		          throw err;
		        });
		      }  
		      console.log('OrderItem added');

			    connection.query('DELETE from cart where userID=?;', [user], function(err, result) {
			      if (err) { 
			        connection.rollback(function() {
			          throw err;
			        });
			      }  
			      console.log('CartItem deleted');
			      connection.commit(function(err) {
			        if (err) { 
			          connection.rollback(function() {
			            throw err;
			          });
			        }
			        responseMessage.status = 1;
							res.send(responseMessage);
		        	console.log('success!');
		        	 
		      	});
		      });
		    });
		  });
		});
	} catch (err){
		 
		console.log(err);
		responseMessage.status = 0;
		res.send(responseMessage)
	}
});

router.get('/user', auth, function(req,res){
	console.log("RESTFUL API: \t user");
	user = req.payload._id;

	responseMessage = {}
	try{
		query = "select c.fullname as name, u.email, c.creditcard, c.address as shipping_address, phone from user u, customer c where u.id = c.userID and u.id = ?;"
		connection.query(query,[user], function(err, rows, fields) {
			if (err) throw err;
			responseMessage.user = rows;

			query = "select o.*, b.title, b.isbn13, b.author, b.image_url, b.price, oi.quantity from orders o join orderItem oi join book b where oi.book=b.isbn13 AND o.orderId=oi.orderId AND o.userID= ?;"
			connection.query(query,[user], function(err, rows, fields) {
				if (err) throw err;
				responseMessage.orders = rows;

				query = "select f.fbID as fb_id, f.date, f.score, f.comment, f.book, b.title, b.author, b.image_url from feedback f, book b where f.book=b.isbn13 and f.userID = ? order by f.date desc;"
				connection.query(query,[user], function(err, rows, fields) {
					if (err) throw err;
					responseMessage.feedback = rows;

					query = "select f.fbID, f.date, f.score, f.comment, r.usefulness, f.book as isbn13, b.title, b.author, b.image_url from rating r, feedback f, book b where r.fbID = f.fbID and f.book = b.isbn13 and r.userID = ? order by f.date desc, usefulness desc;"
					connection.query(query,[user], function(err, rows, fields) {
						if (err) throw err;
						responseMessage["own_feedback"] = rows;
						res.send(responseMessage);
						 
					});
					 
				});
				 
			});
			 
		});

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
		query = "select * from orders o2 join orderItem oi2 join book b where o2.orderid=oi2.orderid AND oi2.book=b.isbn13 AND o2.orderid in (select o1.orderid from orders o1 join orderItem oi1 where o1.orderid=oi1.orderid AND book in (select book from orders o join orderItem oi where o.orderid=oi.orderid AND userId=?) AND o1.userID !=?) AND book not in (select book from orders o join orderItem oi where o.orderid=oi.orderid AND userId=?);"
		connection.query(query,[user,user,user], function(err, rows, fields) {
			if (err) throw err;
			responseMessage.user = rows;
			res.send(responseMessage);
			 
		});
		
	} catch (err){
		console.log(err);
		responseMessage.cart = [];
		res.send(responseMessage)
	}
});

router.get('/popular/books', function(req,res){
	console.log("RESTFUL API: \t popular/books");
	quantity = parseInt(req.query.quantity);

	responseMessage = {}
	try{
		query = "select sum(oi.quantity) as quantity, b.* from orders o left join orderItem oi on (o.orderid = oi.orderID) left join book b on (oi.book = b.isbn13) WHERE MONTH(o.date) = MONTH(NOW()) and YEAR(o.date) = YEAR(NOW()) group by oi.book order by quantity desc limit ?;"
		connection.query(query,[quantity], function(err, rows, fields) {
			if (err) throw err;
			responseMessage.books = rows;
			res.send(responseMessage);
			 
		});	
	} catch (err){
		 
		console.log(err);
		responseMessage.books = [];
		res.send(responseMessage)
	}
});

router.get('/popular/author', auth, function(req,res){
	console.log("RESTFUL API: \t popular/author");
	quantity = parseInt(req.query.quantity);

	responseMessage = {}
	try{
		query = "select b.author from orders o left join orderItem oi on (o.orderid = oi.orderID) left join book b on (oi.book = b.isbn13) WHERE MONTH(o.date) = MONTH(NOW()) and YEAR(o.date) = YEAR(NOW()) group by b.author order by sum(oi.quantity) desc limit ? ;"
		connection.query(query,[quantity], function(err, rows, fields) {
			if (err) throw err;
			responseMessage.author = rows;
		});
		res.send(responseMessage);
		 
	} catch (err){
		 
		console.log(err);
		responseMessage.cart = [];
		res.send(responseMessage)
	}
});

router.get('/popular/publisher', auth, function(req,res){
	console.log("RESTFUL API: \t popular/publisher");
	quantity = parseInt(req.query.quantity);

	responseMessage = {}
	try{
		query = "select b.publisher from orders o left join orderItem oi on (o.orderid = oi.orderID) left join book b on (oi.book = b.isbn13) WHERE MONTH(o.date) = MONTH(NOW()) and YEAR(o.date) = YEAR(NOW()) group by b.publisher order by sum(oi.quantity) desc limit ? ;"
		connection.query(query,[quantity], function(err, rows, fields) {
			if (err) throw err;
			responseMessage.publisher = rows;
		});
		res.send(responseMessage);
		 
	} catch (err){
		 
		console.log(err);
		responseMessage.cart = [];
		res.send(responseMessage)
	}
});

router.post('/admin/book', auth, function(req,res){
	console.log("RESTFUL API: \t admin/book");
	//req.body.??
	title = req.body.book.title
	isbn13 = req.body.book.isbn13
	author = req.body.book.author
	format = req.body.book.format
	image_url = req.body.book['image_url']
	subject = req.body.book.subject
	year = req.body.book.year
	price = req.body.book.price
	publisher = req.body.book.publisher
	summary = req.body.book.summary
	quantity = req.body.book.quantity

	responseMessage = {}
	try{
		query = "INSERT into book values (?,?,?,DEFAULT,?,NULL,?,?,?,?,?,DEFAULT,?,?);"
		connection.query(query,[isbn13,title,author,format,quantity,price,subject,publisher,year,image_url,summary], function(err, rows, fields) {
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

router.post('/admin/book/quantity', auth, function(req,res){
	console.log("RESTFUL API: \t admin/book/quantity");
	
	isbn13 = req.body.isbn13
	quantity = req.body.quantity

	responseMessage = {}
	try{
		query = "UPDATE book SET copies = copies + ? WHERE isbn13 = ?;"
		connection.query(query,[quantity, isbn13], function(err, rows, fields) {
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



module.exports = router;