var Webpack 	= require('webpack');
var path  		= require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'app.js')
// var stylePath = path.resolve(__dirname, 'public', 'css')

var config = {
	devtool: 'eval',
	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:8080',

		mainPath
	],
	output: {
		path: buildPath,
		filename: 'app.js',
		publicPath: '/build/'
	},
	module: {

		loaders: [
		{
			test: /\.js$/,
			loader: 'babel',
			exclude: [nodeModulesPath]
		},

		{
			test: /\.css$/,
			loader: 'style!css'
		}

		]
	},

	plugins: [new Webpack.HotModuleReplacementPlugin()]
};

module.exports = config;