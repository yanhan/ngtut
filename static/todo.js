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
    .factory('windowAlert', [
        '$window',
        function($window) {
            return $window.alert;
        }
    ])
    .controller('TodoController', [
        '$scope',
        '$http',
        'windowAlert',
        function($scope, $http, windowAlert) {
            $scope.state = {};
            $scope.state.todoList = [];
            $scope.RETRIEVE_DEFAULT_NR = 5;

            $scope.addItem = function() {
                if (!$scope.state.newItem) {
                    windowAlert("text field must be non-empty")
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
                        windowAlert("Retrieval failed");
                    });
            };
        }
    ]);
