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
            $scope.RETRIEVE_DEFAULT_NR = 5;
            $scope.state = {};
            $scope.state.todoList = [];
            $scope.state.retrieveNr = $scope.RETRIEVE_DEFAULT_NR;

            $scope.addItem = function() {
                if (!$scope.state.newItem) {
                    windowAlert("text field must be non-empty")
                } else {
                    $http
                        .post('/todoAdd', {
                            item: $scope.state.newItem
                        })
                        .success(function(data, status, headers, config) {
                            $scope.retrieveLastNItems($scope.state.retrieveNr);
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

            $scope.setAndRetrieveLastNItems = function(n) {
                $scope.state.retrieveNr = n;
                $scope.retrieveLastNItems($scope.state.retrieveNr);
            };
        }
    ]);
