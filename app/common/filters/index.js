import angular from 'angular';

/*@ngInject*/
function defaultFilter() {
    return function(value, defaultValue) {
        // if the value is invalid, return the default value
        if (value === undefined || value === null) {
            return defaultValue || '-';
        }
        return value;
    };
}

export default angular.module('common.filters', [])

.filter('default', defaultFilter);
