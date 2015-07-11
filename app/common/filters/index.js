/**
 * @module common.filters
 */
import angular from 'angular';

/**
 * @example <p>{{obj.value | default:'Some other value'}}</p>
 * @author Will
 * @param {any} value The value to be tested
 * @param {any} defaultValue The fallback value
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
