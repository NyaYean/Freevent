var express = require("express"),
		models 	= require("../models"),
		request = require('request')


var User 		= models.users
var Event = models.events

var userRouter = express.Router()



//Create
userRouter.post('/', function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	bcyrpt.hash(password, 10, function(err, hash){	
		User
			.create({
				username:username,
				password_digest: hash
			})
			.then(function(newUser){
				res.send(newUser);
			});
	});	
});

//Create event for user
userRouter.post('/:id/event', function(req, res){
	User
		.findById(req.params.id)
		.then(function(user){
			Event
			.create(req.body)
			.then(function(newEvent){
				user
				.addEvent(newEvent)
				.then(function(result){
					res.send(result)
				});
			});
		});
});


//Read all Users
userRouter.get('/', function(req, res){
		User
		  .findAll({include: Event})
		  .then(function(product){
		  	res.send(product);
		  });
});

userRouter.get('/:id', function(req,res){
	User
		.findById(req.params.id)
		.then(function(products){
			res.send(products)
		});
});

//Update User information
userRouter.put('/:id', function(req,res){
	var userID = req.params.id;
	var userParams = req.body;

	User
		.findById(userID)
		.then(function(user){
			user
			.update(userParams)
			.then(function(updatedUser){
				res.send(updatedUser);
			});
		});
});

//Delete User
userRouter.delete("/:id", function(req,res){
	User
		.findById(req.params.id)
		.then(function(user){
			user
			.destroy()
			.then(function(){
				res.send(user)
			});
		});
});

module.exports = userRouter;