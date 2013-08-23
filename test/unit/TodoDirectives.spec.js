describe('TodoApp directive', function() {
    var $rootScope
      , $scope
      , $compile;

    beforeEach(module('TodoApp'));

    beforeEach(inject(function(_$rootScope_, _$compile_, $templateCache) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        $templateCache.put('../static/navtabs.html',
            '<ul class="nav navtabs">' +
            '<li data-name="page1"><a href="#">Page One</a></li>' +
            '<li data-name="tabtwo"><a href="#">Page Two</a></li></ul>'
        );
    }));

    beforeEach(function() {
        // From http://testdrivenwebsites.com/2010/08/04/custom-jquery-matchers-in-jasmine/
        this.addMatchers({
            toHaveClass: function(cssClassName) {
                var elem
                  , notText;
                elem = this.actual;
                notText = this.isNot ? " not": "";

                this.message = function() {
                    return 'Expected ' +
                        $('<div />').append($(elem).clone()).html() + notText +
                        ' to have css class "' +  cssClassName + '"'
                };

                return $(elem).hasClass(cssClassName);
            }
        });
    });

    describe('navtabs', function() {
        it('should set the right tab to active', function() {
            var navTabsElem
              , linkFn;
            $scope = $rootScope.$new();
            $scope.state = {};
            $scope.state.pageName = 'tabtwo';
            navTabsElem = angular.element('<navtabs page-name="state.pageName"></navtabs>');
            linkFn = $compile(navTabsElem);
            linkFn($scope);
            $rootScope.$digest();
            expect(navTabsElem.children('li')[0]).not.toHaveClass('active');
            expect(navTabsElem.children('li')[1]).toHaveClass('active');
        });
    });
});
