var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;

var apiKey = process.env.API_KEY;
var connectionString = process.env.CON_STR;
if(!connectionString){
	connectionString = 'mongodb://localhost/test';
}

passport.use(new Strategy(
  function(token, cb) {
  	if(token === apiKey){
  		return cb(null, "authorized");
  	}
  	else{
  		return cb(null, false);
  	}
 }));


mongoose.connect(connectionString);

var Network = require('./models/network');
  
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app, Network, passport);

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});