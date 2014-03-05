/**
 * Client side JavaScript
 */

var shurakaiTodo = angular.module('shurakaiTodo', []);


function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('/api/todos')
	.success(function (data) {
		$scope.todos = data;
		console.log(data);
	})
	.error(function (err) {
		console.log("Error: " + err);
	});

	$scope.createTodo = function () {
		$http.post('/api/todos', $scope.formData)
		.success(function (data) {
			$scope.formData = {};
			$scope.todos = data;
			console.log(data);
		})
		.error(function (err) {
			console.log("Error: " + err);
		});
	};

	$scope.deleteTodo = function (id) {
		$http.delete('/api/todos/' + id)
		.success(function (data) {
			$scope.todos = data;
			console.log(data);
		})
		.error(function (err) {
			console.log("Error: " + err);
		});
	};

}
