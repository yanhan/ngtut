describe('SecondController', function() {
    var $scope
      , ctrl;

    beforeEach(module('MainApp'));

    beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
        ctrl = $controller('SecondController', { $scope: $scope });
    }));

    it('should initialize scope variables', function() {
        expect($scope.state).toEqual(jasmine.any(Object));
        expect($scope.state.pageName).toBe('secondPage');
    });
});
