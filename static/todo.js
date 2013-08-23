angular
    .module('TodoApp', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../static/todo.html',
                controller: 'TodoController'
            })
            .otherwise({ redirectTo: '/' });
    }])
    .controller('TodoController', [
        '$scope',
        '$http',
        '$window',
        function($scope, $http, $window) {
            $scope.state = {};
            $scope.state.todoList = [];
            $scope.RETRIEVE_DEFAULT_NR = 5;

            $scope.addItem = function() {
                if (!$scope.state.newItem) {
                    $window.alert("text field must be non-empty")
                } else {
                    $http
                        .post('/todoAdd', {
                            item: $scope.state.newItem
                        })
                        .success(function(data, status, headers, config) {
                            $scope.retrieveLastNItems(5);
                        })
                        .error(function(data, status, headers, config) {
                        });
                }
            };

            $scope.retrieveLastNItems = function(n) {
                $http
                    .get('/todoRetrieve/' + n)
                    .success(function(data, status, headers, config) {
                        $scope.state.todoList = data.todoList;
                    })
                    .error(function(data, status, headers, config) {
                        $window.alert("Retrieval failed");
                    });
            };

            // retrieve some items in the list for a start
            $scope.retrieveLastNItems($scope.RETRIEVE_DEFAULT_NR);
        }
    ]);
