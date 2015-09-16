import angular from 'angular';

class NavigationCtrl {
    constructor($rootScope) {
        this.navItems = $rootScope.navItems;
    }
}

NavigationCtrl.$inject = ['$rootScope'];

function navigationDirective() {
    return {
        restrict: 'E',
        replace: true,
        controller: 'NavigationCtrl',
        controllerAs: 'Navigation',
        template: require('./_navigation.html')
    };
}

navigationDirective.$inject = [];

export default angular.module('common.navigation', [])

.controller('NavigationCtrl', NavigationCtrl)

.directive('navigation', navigationDirective);
