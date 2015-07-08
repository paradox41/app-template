import angular from 'angular';

/**
 * @example <p>{{obj.value | default:'Some other value'}}</p>
 * @author Will
 */
function defaultFilter() {
    return function(value, defaultValue) {
        // if the value is invalid, return the default value
        if (value === undefined || value === null) {
            return defaultValue || '-';
        }
        return value;
    };
}

defaultFilter.$inject = [];

export default angular.module('common.filters', [])

.filter('default', defaultFilter);
