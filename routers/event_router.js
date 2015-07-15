var express = require("express")
		models 	= require("../models")

var User = models.users
var Event = models.events


var eventRouter = express.Router();


// eventRouter.post('/', function(req,res){
// 	Product
// 		.create(req.body)
// 		.then(function(newProduct){
// 			res.send(newProduct)
// 		});
// });

eventRouter.get('/', function(req,res){
	Product
	  .findAll()
	  .then(function(products){
	  	res.send(products)
	  });
});

module.exports = eventRouter