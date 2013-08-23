describe('TodoController', function() {
    var $scope
      , $httpBackend
      , ctrl
      , windowAlert;

    beforeEach(module('TodoApp', function($provide) {
        windowAlert = jasmine.createSpy();
        $provide.value('windowAlert', windowAlert);
    }));

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

    describe('addItem', function() {
        var itemToAdd;
        it('should not be able to add undefined item', function() {
            $scope.state.newItem = undefined;
            $scope.addItem();
            expect(windowAlert.calls.length).toBe(1);
            expect(windowAlert.calls[0].args[0]).toBe(
                'text field must be non-empty'
            );
        });
        it('should not be able to add empty item', function() {
            $scope.state.newItem = '';
            $scope.addItem();
            expect(windowAlert.calls.length).toBe(1);
            expect(windowAlert.calls[0].args[0]).toBe(
                'text field must be non-empty'
            );
        });
        describe('add non-empty item', function() {
            var itemToAdd = 'do my laundry';
            beforeEach(function() {
                $httpBackend
                    .expectPOST('/todoAdd', {
                        item: itemToAdd
                    })
                    .respond(200);
                // mock out call to retrieveLastNItems
                $scope.retrieveLastNItems = jasmine.createSpy();
            });
            it('should succeed', function() {
                $scope.state.newItem = itemToAdd;
                $scope.addItem();
                // $httpBackend.flush() required here
                $httpBackend.flush();
                expect($scope.retrieveLastNItems.calls.length).toBe(1);
                expect($scope.retrieveLastNItems.calls[0].args[0]).toBe(
                    $scope.RETRIEVE_DEFAULT_NR
                );
            });
        });
    });

    describe('retrieveLastNItems', function() {
        describe('on success,', function() {
            var todoList;
            beforeEach(function() {
                todoList = [1, 2, 3, 4, 5, 6, 7];
                $httpBackend
                    .expectGET('/todoRetrieve/7')
                    .respond({
                        todoList: todoList
                    })
            });
            it('should update $scope.state.todoList', function() {
                $scope.retrieveLastNItems(7);
                $httpBackend.flush();
                expect($scope.state.todoList).toEqual(todoList);
            });
        });
        describe('on failure,', function() {
            beforeEach(function() {
                $httpBackend
                    .expectGET('/todoRetrieve/15')
                    .respond(500);
            });
            it('should display an error message', function() {
                $scope.retrieveLastNItems(15);
                $httpBackend.flush();
                expect($scope.state.todoList).toEqual([]);
                expect(windowAlert.calls.length).toBe(1);
                expect(windowAlert.calls[0].args[0]).toBe('Retrieval failed');
            });
        });
    });
});
