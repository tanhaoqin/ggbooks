var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var db = require('../database/database.js') 

passport.use(new LocalStrategy(
  function(email, password, done) {
    var user = new User();
    user.username = email;
    db.query('SELECT id, type, password from user where `email` = ? and password = ?;', [email,password] , function(err, rows, fields) {
        responseMessage = {};        
        if (err) return done(err);
        if (rows.length != 1){
            return done(null, false, { message: 'Incorrect username or password.' });
        } else {
            user.setType(rows[0]['type']);
            return done(null, user);
        }
    });
}));