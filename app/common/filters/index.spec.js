import angular from 'angular';
import 'angular-mocks';

import './';

describe('common/filters', function() {
    var $filter;

    beforeEach(function() {
        angular.mock.module('common.filters');

        inject(function(_$filter_) {
            $filter =  _$filter_;
        });
    });

    describe('default filter', function() {
        var defaultFilter;

        beforeEach(function() {
            // helper function so we don't have to keep saying that
            // we are using the 'default' filter
            defaultFilter = function(value, defaultValue) {
                return $filter('default')(value, defaultValue);
            };
        });

        it('should return the default value if the input is null', function() {
            let result = defaultFilter(null, 'defaultValue');

            expect(result).to.equal('defaultValue');
        });

        it('should return the default value if the input is undefined', function() {
            let result = defaultFilter(undefined, 'defaultValue');

            expect(result).to.equal('defaultValue');
        });

        it('should return NaN if the input is NaN', function() {
            let result = defaultFilter(NaN, 'defaultValue');

            expect(result).to.not.equal('defaultValue');
            expect(result).to.deep.equal(NaN);
        });

        it('should return the input string if it is truthy', function() {
            let result = defaultFilter('truthyValue', 'defaultValue');

            expect(result).to.equal('truthyValue');
        });
    });
});
