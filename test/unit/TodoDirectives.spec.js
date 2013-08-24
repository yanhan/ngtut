describe('TodoApp directive', function() {
    var $rootScope
      , $compile
      , $templateCache;

    beforeEach(module('TodoApp'));

    beforeEach(inject(function(_$rootScope_, _$compile_, _$templateCache_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        $templateCache = _$templateCache_;
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
        var $scope;
        beforeEach(function() {
            $templateCache.put('../static/navtabs.html',
                '<ul class="nav navtabs">' +
                '<tab name="page1" href="#">Page One</tab>' +
                '<tab name="tabtwo" href="#/tabtwo">Tab Two</tab>'
            );
        });
        it('should set the right tab to active', function() {
            var navTabsElem
              , linkFn
              , liElems;
            $scope = $rootScope.$new();
            $scope.state = {};
            $scope.state.pageName = 'tabtwo';
            navTabsElem = angular.element(
                '<navtabs page-name="state.pageName"></navtabs>'
            );
            linkFn = $compile(navTabsElem);
            linkFn($scope);
            $rootScope.$digest();
            liElems = $(navTabsElem).children('li');
            expect($(liElems[0])).not.toHaveClass('active');
            expect($($(liElems[0]).children('a')[0]).attr('href')).toBe('#');
            expect(
                $($($(liElems[0]).children('a')[0]).children('span')[0]).html()
            ).toBe('Page One');
            expect($(liElems[1])).toHaveClass('active');
            expect($($(liElems[1]).children('a')[0]).attr('href'))
                .toBe('#/tabtwo');
            expect(
                $($($(liElems[1]).children('a')[0]).children('span')[0]).html()
            ).toBe('Tab Two');
        });
    });
});
