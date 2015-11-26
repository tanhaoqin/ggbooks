var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var db = require('../database/database.js') 

passport.use(new LocalStrategy(
  function(username, password, done) {
    var user = new User();
    user.username = username;
    db.query('SELECT id, type, password from user where `email` = ? and password = ?;', [username,password] , function(err, rows, fields) {
        responseMessage = {};        
        if (err) return done(err);
        if (rows.length != 1){
            return done(null, false, { message: 'Incorrect username or password.' });
        } else {
            return done(null, user);
        }
    });
}));