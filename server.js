/**
 * Main Entry point to app server.
 */

// Dependencies
var mongoose = require('mongoose'),
	express = require('express'),

	todoApi = require('./server/todoController'),
	todo = require('./server/todoModel');

// variables
var server = express(),
	port = 8080;

// server setup
mongoose.connect('mongodb://localhost/todolist');
server.configure(function () {
	server.use(express.static(__dirname + '/public'));
	server.use(express.logger('dev'));
	server.use(express.bodyParser());
	server.use(express.methodOverride());
});

// setup routing
todoApi.addRoutes(server, todo.getModel(mongoose));

// start the server
server.listen(port, function (err) {
	if (err) {
		console.log("error:", err);
	} else {
		console.log("Server listening on port", port);
	}
});
