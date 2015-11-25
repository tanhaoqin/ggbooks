
var http = require('http'),
	fs = require('fs'),
	express = require('express'),
	mysql = require('mysql'),
	bodyParser = require('body-parser'),
	path = require("path");;

var app = express();
var server = http.createServer(app).listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var connection = mysql.createConnection({
  host     : 'sutdbinstance.c8djbsxvu2xy.ap-southeast-1.rds.amazonaws.com',
  user     : 'sutdadmin',
  password : 'sutd1234',
  database : 'NikhilReads',
  port 		: '3306'
});

/*
	token_table to track the current available tokens. everytime user do something using token, check abs(new Date()-value>30mins)
	key: String(token_number)
	value: Date() object
	eg. "1" : "2011-02-07 15:13:06"
*/
var token_count = 0;
var token_table = {};

function authenticateToken(id){
	var limit = 30 * 60000; // 30mins in milliseconds
	var diff = Math.abs(new Date() - token_table[id]); //diff in milliseconds
	if (diff < limit){
		token_table[id] = new Date();
		return true;
	} else {
		delete token_table[id];
		return false;
	}
}

function getNewToken(){
	token_count++;
	token_table[String(token_count)] = new Date();
	return String(token_count);
}

connection.query('select * from book where isbn13=?;', [9780007179732] , function(err, rows, fields) {
	if (err) throw err;	
	console.log(rows);
	console.log("Success");
});


// serve main homepage
app.get('/', function (req, res) {
  	res.sendFile(path.join(__dirname+'/index.html'));
});


app.post('/signup', function(req, res){
	console.log("RESTFUL API: \t signup");
	name = req.body.name;
	email = req.body.email;
	password = req.body.password;
	credit_card = req.body['credit_card'];

	try{ 
		connection.query("insert into user values (DEFAULT, ?, ?, 'u');", [email, password] , function(err, rows, fields) {
			if (err) throw err;	
		});
		connection.query("insert into customer(userID,name,creditcard) values(LAST_INSERT_ID(),?,?);", [name, credit_card] , function(err, rows, fields) {
			if (err) throw err;	
		});
		responseMessage = {};
		responseMessage.status = 1;
		responseMessage.userType = 'u';
	} catch (err){
		responseMessage = {};
		responseMessage.status = 0;
	}

});

app.post('/login', function (req, res) {
	console.log("RESTFUL API: \t login");
	email = req.body.email;
	password = req.body.password;
  	connection.query('SELECT id, type from user where `name` = ? and password = ?;', [email,password] , function(err, rows, fields) {
		responseMessage = {};
		
		if (err) throw err;
		
		if (rows.length != 1){
			responseMessage.status = 0;
		} else{
			responseMessage.status = 1;
			responseMessage.userType = rows[0].type
			responseMessage.authToken = getNewToken();
		}
		res.send(responseMessage);
	});
});


app.get('/recommendations', function(req,res){
	console.log("RESTFUL API: \t recommendations");
	authToken = req.headers.authToken;
	if (authenticateToken(authToken)){
		// authenticate success

	} else{
		// return error
	}
});

app.get('/books', function(req,res){
	console.log("RESTFUL API: \t books");
	authToken = req.headers.authToken;
	search = req.params.search;
	if (authenticateToken(authToken)){
		// authenticate success
	} else{
		// return error
	}
});

app.get('/book', function(req,res){
	console.log("RESTFUL API: \t book");
	authToken = req.headers.authToken;
	ISBN = req.params.ISBN;
	if (authenticateToken(authToken)){
		// authenticate success
		connection.query('select * from book where isbn13=?;', [ISBN] , function(err, rows, fields) {
			
			if (err) throw err;
			
			if (rows.length == 0){
				responseMessage = {};
				responseMessage.status = 0;
				res.send(responseMessage);
			} else{
				responseMessage = rows[0];
				responseMessage.status = 1;
				// responseMessage missing feedback!
				res.send(responseMessage);
			}
			
		});

	} else{
		// return error
	}
});

app.post('/feedback/:feedback_id', function (req, res) {
	console.log("RESTFUL API: \t feedback");

	authToken = req.headers.authToken;
	
	if (authenticateToken(authToken)){
		// authenticate success
	} else{
		// return error
	}

});

app.post('/cart', function (req, res) {
	console.log("RESTFUL API: \t cart");

	authToken = req.headers.authToken;
	
	if (authenticateToken(authToken)){
		// authenticate success
	} else{
		// return error
	}

});


app.post('/order', function (req, res) {
	console.log("RESTFUL API: \t order");
	authToken = req.headers.authToken;

	if (authenticateToken(authToken)){
		// authenticate success
	} else{
		// return error
	}

});

app.get('/user', function (req, res) {
	console.log("RESTFUL API: \t user");
	authToken = req.headers.authToken;
	
	if (authenticateToken(authToken)){
		// authenticate success
	} else{
		// return error
	}

});



console.log('Listening on port 8080');

