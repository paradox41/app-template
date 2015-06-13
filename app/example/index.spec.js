import angular from 'angular';
import 'angular-mocks';

import './';

describe('example', function() {

    beforeEach(angular.mock.module('example'));

    describe('ExampleCtrl', function() {
        var scope;
        var ExampleCtrl;

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            ExampleCtrl = $controller('ExampleCtrl as Example', {
                $scope: scope,
                data: [1, 2, 3, 4, 5, 6]
            });
        }));

        it('should be available on scope as Example', function() {
            expect(scope.Example).to.equal(ExampleCtrl);
        });

        it('should load example data', function() {
            expect(scope.Example.exampleData).to.not.be.undefined;
        });

        it('should load example data as an array', function() {
            expect(scope.Example.exampleData).to.be.an('array');
        });

        it('should have a property called data that returns exampleData', function() {
            expect(scope.Example.data).to.be.an('array');
            expect(scope.Example.data).to.deep.equal(scope.Example.exampleData);
        });

        it('should have a method called someMethod that returns the double for each value', function() {
            expect(scope.Example.someMethod()).to.deep.equal([2, 4, 6, 8, 10, 12]);
        });

    });
});
