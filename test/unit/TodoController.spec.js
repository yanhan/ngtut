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
        expect($scope.state.retrieveNr).toBe($scope.RETRIEVE_DEFAULT_NR);
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
            var postUrl;
            beforeEach(function() {
                postUrl = '/todoAdd';
                // mock out call to retrieveLastNItems
                $scope.retrieveLastNItems = jasmine.createSpy();
            });
            describe('on success', function() {
                var itemToAdd;
                beforeEach(function() {
                    itemToAdd = 'do my laundry';
                    $httpBackend
                        .expectPOST(postUrl, {
                            item: itemToAdd
                        })
                        .respond(200, { success: true });
                });
                it('should call retrieveLastNItems', function() {
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
            describe('on failure', function() {
                var itemToAdd;
                beforeEach(function() {
                    itemToAdd = 'another string';
                    $httpBackend
                        .expectPOST(postUrl, {
                            item: itemToAdd
                        })
                        .respond(200, { success: false });
                });
                it('should not call retrieveLastNItems', function() {
                    $scope.state.newItem = itemToAdd;
                    $scope.addItem();
                    $httpBackend.flush();
                    expect($scope.retrieveLastNItems.calls.length).toBe(0);
                    expect(windowAlert.calls.length).toBe(1);
                    expect(windowAlert.calls[0].args[0]).toBe(
                        'Adding of item failed'
                    );
                });
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
                        success: true,
                        todoList: todoList
                    })
            });
            it('should update $scope.state.todoList on success', function() {
                $scope.retrieveLastNItems(7);
                $httpBackend.flush();
                expect($scope.state.todoList).toEqual(todoList);
            });
        });
        describe('on failure,', function() {
            beforeEach(function() {
                $httpBackend
                    .expectGET('/todoRetrieve/15')
                    .respond(200, {
                        success: false,
                        todoList: [1, 2, 3, 4]
                    });
            });
            it('should display an error message', function() {
                $scope.retrieveLastNItems(15);
                $httpBackend.flush();
                expect($scope.state.todoList).toEqual([]);
                expect(windowAlert.calls.length).toBe(1);
                expect(windowAlert.calls[0].args[0]).toBe('Retrieval failed');
            });
        });
        describe('on server error,', function() {
            beforeEach(function() {
                $httpBackend
                    .expectGET('/todoRetrieve/10')
                    .respond(500);
            });
            it('should display an error message', function() {
                $scope.retrieveLastNItems(10);
                $httpBackend.flush();
                expect($scope.state.todoList).toEqual([]);
                expect(windowAlert.calls.length).toBe(1);
                expect(windowAlert.calls[0].args[0]).toBe('Retrieval failed');
            });
        });
    });

    describe('setAndRetrieveLastNItems', function() {
        beforeEach(function() {
            $scope.retrieveLastNItems = jasmine.createSpy();
        });
        it('should set $scope.state.retrieveNr', function() {
            $scope.setAndRetrieveLastNItems(23);
            expect($scope.state.retrieveNr).toBe(23);
            expect($scope.retrieveLastNItems.calls.length).toBe(1);
            expect($scope.retrieveLastNItems.calls[0].args[0]).toBe(
                $scope.state.retrieveNr
            );
        });
    });
});
