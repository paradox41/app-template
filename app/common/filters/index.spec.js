import angular from 'angular';
import 'angular-mocks';

import {expect} from 'chai';

import './';

describe('common/filters', function() {
    beforeEach(function() {
        angular.mock.module('common.filters');

        angular.mock.inject(($injector) => {
            this.$filter =  $injector.get('$filter');
        });
    });

    describe('default filter', function() {
        beforeEach(function() {
            this.defaultFilter = (value, defaultValue) => {
                return this.$filter('default')(value, defaultValue);
            };
        });

        it('should return the default value if the input is null', function() {
            let result = this.defaultFilter(null, 'defaultValue');

            expect(result).to.equal('defaultValue');
        });

        it('should return the default value if the input is undefined', function() {
            let result = this.defaultFilter(undefined, 'defaultValue');

            expect(result).to.equal('defaultValue');
        });

        it('should return NaN if the input is NaN', function() {
            let result = this.defaultFilter(NaN, 'defaultValue');

            expect(result).to.not.equal('defaultValue');
            expect(result).to.deep.equal(NaN);
        });

        it('should return the input string if it is truthy', function() {
            let result = this.defaultFilter('truthyValue', 'defaultValue');

            expect(result).to.equal('truthyValue');
        });
    });
});
