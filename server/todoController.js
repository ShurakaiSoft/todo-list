/**
 * RESTful API Routes and controllers for todo model
 */

function todoApi(server, todoModel) {

	function sendAllTodos(res) {
	    todoModel.find({}, function (err, todos) {
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
	function getAllTodos(req, res) {
		sendAllTodos(res);
	}


	/**
	 * Create a single todo and return all todos
	 */
	function createSingleTodo(req, res) {
	    todoModel.create({
	        text: req.body.text,
	        done: false
	    }, function (err, todo) {
	        if (err) {
	            res.send(err);
	        } else {
	            sendAllTodos(res);
	        }
	    });
	}


	/**
	 * Delete a single todo, return all todos
	 */
	function deleteSingleTodo(req, res) {
	    todoModel.remove({
	        _id: req.params.todoId
	    }, function (err, todo) {
	        if (err) {
	            res.send(err);
	        } else {
	            sendAllTodos(res);
	        }
	    });
	}


	// RESTful API routes
	server.get('/api/todos', getAllTodos);
	server.post('/api/todos', createSingleTodo);
	server.delete('/api/todos/:todoId', deleteSingleTodo);
}


module.exports = {
	addRoutes: todoApi
};
