var express 		= require('express');
var bodyParser 	= require('body-parser');
var models  		= require(__dirname + '/models');
var logger  		= require('morgan');
var bcrypt  		= require('bcrypt');
var session 		= require('express-session');
var request 		= require('request');
var path 				= require('path');

var User = models.users;
var Event = models.events;

var userRouter = require('./routers/user_router.js');
var eventRouter = require('./routers/event_router.js');

var app = express();

app.use(bodyParser());
app.use(logger('dev'));
// app.use(morgan('dev'));


var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 8080 : 3000;
var publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));


app.use("/users", userRouter);
app.use("/events", eventRouter);
// app.use("/sessions", sessionRouter);

module.exports = app;

app.listen(port, function(){
	console.log('Running on ' + port);
});