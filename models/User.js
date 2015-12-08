var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var User = function(){
	this._id = ""

	this.username = "";

	this.hash = "";

	this.salt = "";

	this.type = "";

	this.setId = function(id){
		this._id = id;
	}

	this.setType = function(type){
		this.type = type;
	}

	this.setPassword = function(password){
		this.salt = crypto.randomBytes(16).toString('hex');
		this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	}

	this.validPassword = function(password){
		var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
		return this.hash === hash;
	}

	this.generateJWT = function(){
		var today = new Date();
		var exp = new Date(today);
		exp.setDate(today.getDate() + 60);
		token = jwt.sign({
			_id: this._id,
			username: this.username,
			type: this.type, 
			exp: parseInt(exp.getTime() / 1000),
		}, 'SECRET')
		return token;
	}
};





module.exports = User;