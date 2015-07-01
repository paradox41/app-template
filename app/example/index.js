import angular from 'angular';
import 'angular-ui-router';

import _ from 'lodash';

const STATE = 'app.example';

class ExampleCtrl {
    constructor(data) {
        this.exampleData = data;
    }

    someMethod() {
        return _.map(this.exampleData, function(data) {
            return (data * 2);
        });
    }

    get data() {
        return this.exampleData;
    }
}

ExampleCtrl.$inject = ['data'];

export default angular.module('example', [
    'ui.router'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state(STATE, {
        controller: 'ExampleCtrl',
        controllerAs: 'Example',
        url: '/example',
        template: require('./_example.html'),
        resolve: {
            data: [function() {
                return [1, 2, 3, 4, 5, 6];
            }]
        }
    });
}])

.controller('ExampleCtrl', ExampleCtrl);

export var exampleNavigation = {
    state: STATE,
    name: 'Example'
};
