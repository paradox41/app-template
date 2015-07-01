import angular from 'angular';

// import angular modules
import 'angular-ui-router';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';

// import common modules
import navigationModule from './common/navigation';

// import regular modules
import exampleModule, {
    exampleNavigation
} from './example';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [
    'ui.router',
    'ngAria',
    'ngAnimate',
    'ngMaterial',
    exampleModule.name,
    navigationModule.name
])

.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('');

        $stateProvider.state('app', {
            url: '',
            abstract: true,
            template: '<div ui-view></div>'
        });
    }
])

.constant('version', require('../package.json').version)

.run(['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.navItems = [exampleNavigation];

        $rootScope.$on('$routeChangeError', function() {
            console.log('failed to change routes', arguments);
        });
    }
]);

angular.bootstrap(document.querySelector('html'), [MODULE_NAME]);
