import angular from 'angular';

class NavigationCtrl {
  /*@ngInject*/
  constructor($rootScope) {
    this.navItems = $rootScope.navItems;
  }
}

/*@ngInject*/
function navigationDirective() {
  return {
    restrict: 'E',
    replace: true,
    controller: 'NavigationCtrl',
    controllerAs: 'Navigation',
    template: require('./_navigation.html')
  };
}

export default angular.module('common.navigation', [])

.controller('NavigationCtrl', NavigationCtrl)

.directive('navigation', navigationDirective);
