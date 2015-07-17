// alert('loaded!')

var gem = {name: 'The Rock', size: "Jumbo"}
var app = module.exports = angular.module('app', []);
app.controller('StoreController', function () {
	this.product = gem;
})