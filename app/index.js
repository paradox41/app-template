import angular from 'angular';

// import angular modules
import 'angular-ui-router';

// import common modules
import resource from './common/resource';
import filters from './common/filters';
import navigation from './common/navigation';

// import regular modules
import users, {
    userNavigation
} from './users';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [
    'ui.router',
    users.name,
    resource.name,
    filters.name,
    navigation.name
])

.config(['$stateProvider', '$urlRouterProvider', 'ResourceConfigProvider',
    function($stateProvider, $urlRouterProvider, ResourceConfigProvider) {

        ResourceConfigProvider.setConfig({
            baseURL: 'http://jsonplaceholder.typicode.com'
        });

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

        $rootScope.navItems = [userNavigation];

        $rootScope.$on('$routeChangeError', function() {
            console.log('failed to change routes', arguments);
        });
    }
]);

angular.bootstrap(document.querySelector('html'), [MODULE_NAME]);
