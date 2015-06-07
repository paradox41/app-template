import angular from 'angular';
import 'angular-ui-router';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';

import filtersModule from './common/filters';

import exampleModule from './example';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [
    'ui.router',
    'ngAria',
    'ngAnimate',
    'ngMaterial',
    filtersModule.name,
    exampleModule.name
])

.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    AppStateConfig
])

.constant('version', require('../package.json').version)

.run(['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$routeChangeError', function() {
            console.log('failed to change routes', arguments);
        });
    }
]);

function AppStateConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('');

    $stateProvider.state('app', {
        url: '',
        abstract: true,
        template: '<div ui-view></div>'
    });
}

angular.bootstrap(document.querySelector('html'), [MODULE_NAME]);
