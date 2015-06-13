import angular from 'angular';
import 'angular-ui-router';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';

import exampleModule from './example';

const MODULE_NAME = 'app';

function AppStateConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('');

    $stateProvider.state('app', {
        url: '',
        abstract: true,
        template: '<div ui-view></div>'
    });
}

angular.module(MODULE_NAME, [
    'ui.router',
    'ngAria',
    'ngAnimate',
    'ngMaterial',
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

angular.bootstrap(document.querySelector('html'), [MODULE_NAME]);
