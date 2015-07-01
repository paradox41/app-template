import angular from 'angular';
import 'angular-material';

class NavigationCtrl {
    constructor($rootScope, $mdSidenav, $mdMedia) {
        this.$mdSidenav = $mdSidenav;
        this.$mdMedia = $mdMedia;

        this.navItems = $rootScope.navItems;
    }

    toggle(side = 'left') {
        this.$mdSidenav(side).toggle();
    }
}

NavigationCtrl.$inject = ['$rootScope', '$mdSidenav', '$mdMedia'];

function navigationDirective() {
    return {
        restrict: 'E',
        replace: true,
        controller: 'NavigationCtrl',
        controllerAs: 'Navigation',
        template: require('./_navigation.html')
    };
}

export default angular.module('common.navigation', [
    'ngMaterial'
])

.controller('NavigationCtrl', NavigationCtrl)

.directive('navigation', navigationDirective);
