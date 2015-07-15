var express = require("express"),
		models 	= require("../models");

var User 		= models.users
var Product = models.products

var userRouter = express.Router()


userRouter.post('/', function(req, res){
		User
			.create(req.body)
			.then(function(newUser){
				res.send(newUser)
			});
});

userRouter.post('/:id/product', function(req, res){
	User
		.findById(req.params.id)
		.then(function(user){
			Product
			.create(req.body)
			.then(function(newProduct){
				user
				.addProduct(newProduct)
				.then(function(result){
					res.send(result)
				});
			});
		});
});

userRouter.get('/', function(req, res){
		User
		  .findAll({include: Product})
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