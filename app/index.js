import angular from 'angular';

import router from 'angular-ui-router';

import './app.scss';

const APP_NAME = 'app';

export default angular.module(APP_NAME, [
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
});

angular.bootstrap(document.querySelector('html'), [APP_NAME], {
  strictDi: true
});
