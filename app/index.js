import angular from 'angular';

import router from 'angular-ui-router';

import './app.scss';

const APP_NAME = 'app';

angular.module(APP_NAME, [
  router
])

.config(function($stateProvider, $urlRouterProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('');

  $stateProvider.state('app', {
    url: '',
    abstract: true,
    template: '<div ui-view></div>'
  });
})

.run(function($rootScope, $state, $stateParams) {
  'ngInject';

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  $rootScope.$on('$routeChangeError', function() {
    console.log('failed to change routes', arguments);
  });
});

angular.bootstrap(document.querySelector('html'), [APP_NAME], {
  strictDi: true
});
