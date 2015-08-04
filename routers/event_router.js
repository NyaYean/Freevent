var express = require("express"),
		models 	= require("../models"),
		request = require('request')



var User = models.users
var Event = models.events


var eventRouter = express.Router();

eventRouter.get('/search', function(req,res){
	request("http://api.nytimes.com/svc/events/v2/listings.json?&filters=free:true&api-key=bc675c9b17f7d8f5d572be364b116367:9:61020068", function(err, data){
		res.send(data)
	})

})

// eventRouter.post('/', function(req,res){
// 	Event
// 		.create(req.body)
// 		.then(function(newProduct){
// 			res.send(newProduct)
// 		});
// });

eventRouter.get('/', function(req,res){
	Event
	  .findAll()
	  .then(function(products){
	  	res.send(products)
	  });
});

module.exports = eventRouter