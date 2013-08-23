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
        function($scope, $http) {
        }
    ]);
