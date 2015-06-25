import angular from 'angular';
import 'angular-material';

class NavigationCtrl {
    constructor($mdSidenav, $mdMedia) {
        this.$mdSidenav = $mdSidenav;
        this.$mdMedia = $mdMedia;
    }

    toggle(side = 'left') {
        this.$mdSidenav(side).toggle();
    }
}

NavigationCtrl.$inject = ['$mdSidenav', '$mdMedia'];

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
