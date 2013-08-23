describe('TodoController', function() {
    var $scope
      , $httpBackend
      , ctrl;

    beforeEach(module('TodoApp'));

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        $scope = $rootScope.$new();
        ctrl = $controller('TodoController', { $scope: $scope });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('initialization sets up the scope variables', function() {
        expect($scope.state).toEqual(jasmine.any(Object));
        expect($scope.state.todoList).toEqual([]);
        expect($scope.RETRIEVE_DEFAULT_NR).toBe(5);
    });
});
