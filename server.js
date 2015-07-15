var express = require('express');
var bodyParser = require('body-parser');
var models = require(__dirname + '/models');
var logger = require('morgan');

var User = models.users;
var Event = models.events;

var userRouter = require('./routers/user_router.js');
var eventRouter = require('./routers/event_router.js');

var app = express();

app.use(bodyParser());
app.use(logger('dev'));

// app.use(express.static(__dirname + '/public'));

app.use("/users", userRouter);
app.use("/events", eventRouter);

module.exports = app;


var server = app.listen(3000, function(){
	console.log('Running on something')
})