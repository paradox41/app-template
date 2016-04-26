import angular from 'angular';

import 'angular-ui-router';

import './app.scss';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [
  'ui.router'
])

.config( /*@ngInject*/ function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('');

  $stateProvider.state('app', {
    url: '',
    abstract: true,
    template: '<div ui-view></div>'
  });
})

.run( /*@ngInject*/ function($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  $rootScope.$on('$routeChangeError', function() {
    console.log('failed to change routes', arguments);
  });
});

angular.bootstrap(document.querySelector('html'), [MODULE_NAME], {
  strictDi: true
});
