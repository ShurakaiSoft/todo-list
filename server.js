/**
 * Main Entry point to app server.
 */

// Dependencies
var mongoose = require('mongoose'),
	express = require('express');

// variables
var server = express(),
	port = 8080,
    Todo;

// server setup
mongoose.connect('mongodb://localhost/todolist');
server.configure(function () {
	server.use(express.static(__dirname + '/public'));
	server.use(express.logger('dev'));
	server.use(express.bodyParser());
	server.use(express.methodOverride());
});


// Model for todo list
Todo = mongoose.model('Todo', {
    text: String
});


// RESTful API routes

// helper function
function sendAllTodos(res) {
    Todo.find({}, function (err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
}


/**
 * Get all of the todos.
 */
server.get('/api/todos', function (req, res) {
    sendAllTodos(res);
});


/**
 * Create a single todo
 */
server.post('api/todos', function (req, res) {
    Todo.create({
        text: req.body.text,
        done: false
    }, function (err, todo) {
        if (err) {
            res.send(err);
        } else {
            sendAllTodos(res);
        }
    });
});


/**
 * Delete a single todo
 */
server.delete('api/todos/:todoId', function (req, res) {
    Todo.remove({
        _id: req.params.todoId
    }, function (err, todo) {
        if (err) {
            res.send(err);
        } else {
            sendAllTodos(res);
        }
    });
});


// start the server
server.listen(port, function (err) {
	if (err) {
		console.log("error:", err);
	} else {
		console.log("Server listening on port", port);
	}
});

