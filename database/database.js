var config = require(__dirname + '/../config/config.json');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database,
  port    : config.port
});

module.exports = connection;