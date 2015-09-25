/**
 * @module common.api
 * @author Will
 * @description Base class for creating REST endpoints
 */
import angular from 'angular';

import _ from 'lodash';

/**
 * @description Provider for `Resource`
 * @example angular.module('example', []).config(['ResourceConfigProvider',
 *     function(ResourceConfigProvider) {
 *         // pass some config options
 *         ResourceConfigProvider.setConfig({});
 *     }
 * ]);
 */
function ResourceProvider() {
    /**
     * @namespace
     * @type {Object}
     * @property {Object} - config
     * @property {String} - config.baseURL The base URL for all API requests
     */
    var config = {
        baseURL: ''
    };

    /**
     * Set global configuration for Resource.
     * @param {Object} opts - Options object
     */
    this.setConfig = function(opts) {
        _.extend(config, opts);
    };

    this.$get = [function() {
        return config;
    }];
}

ResourceProvider.$inject = [];

function ResourceFactory($http, ResourceConfig) {

    function wrapResult(resultPromise, ResultModel) {
        return resultPromise.then(function(response) {
            return new ResultModel(response.data);
        });
    }

    function serialize(obj) {
        return _(obj).keys().map(function(key) {
            let param = encodeURIComponent(key);
            let value = encodeURIComponent(obj[key]);

            return `${param}=${value}`;
        }).value().join('&');
    }

    function returnResponse(response) {
        return response.data;
    }

    /** @namespace */
    class Resource {
        /**
         * Base Resource class for constructing new REST routes.
         * @class
         * @param  {string} route - The path to the endpoint
         * @param  {function} model - Optional model to be applied to the fetched resource
         * @param  {Object} - options Optional configuration object. Options passed via the provider are overridden here if
         * provided. Options passed to methods override the options passed to the constructor.
         */
        constructor(route, model, options = {}) {
            // allow global config to be overridden here
            let opts = _.extend({}, ResourceConfig, options);

            this.route = `${opts.baseURL}/${route}`;
            this.model = model;
            this.options = opts;
        }

        /**
         * Get a specific resource [GET].
         * @instance
         * @param  {integer} pk - The primary key or the id
         * @param  {Object} config - Config to be passed to Angular's `$http.get()`
         * Will override any options passed in via the provider and the constructor.
         * @return {promise}
         */
        get(pk, config = {}) {
            // again, allow individual methods to override the options above it
            // without modifying the original options block
            let options = _.extend({}, _.cloneDeep(this.options), config);
            let result = $http.get(`${this.route}/${pk}`, options);

            if (this.model !== undefined) {
                return wrapResult(result, this.model);
            } else {
                return result.then(returnResponse);
            }
        }

        /**
         * Create an object [POST].
         * @instance
         * @param  {Object} obj - The object graph
         * @param  {Object} config - Config to be passed to Angular's `$http.post()`
         * @return {promise}
         */
        create(obj, config = {}) {
            let options = _.extend({}, _.cloneDeep(this.options), config);

            return $http.post(`${this.route}`, obj, options).then(returnResponse);
        }

        /**
         * Update an object [PUT].
         * @instance
         * @param  {integer} pk - The primary key or the id of the object to update
         * @param  {Object} obj - The new object
         * @param  {Object} config - Config to be passed to Angular's `$http.put()`
         * @return {promise}
         */
        update(pk, obj, config = {}) {
            let options = _.extend({}, _.cloneDeep(this.options), config);

            return $http.put(`${this.route}/${pk}`, obj, options).then(returnResponse);
        }

        /**
         * Search a particular resource [GET].
         * @instance
         * @param  {Object} params - Search params to be serialized
         * @param  {Object} config - Config to be passed to Angular's `$http.get()`
         * @return {promise}
         */
        search(params, config = {}) {
            let route = this.route;
            let options = _.extend({}, _.cloneDeep(this.options), config);

            if (params) {
                params = serialize(params);

                route = `${route}?${params}`;
            }

            let result = $http.get(`${route}`, options);

            if (this.model !== undefined) {
                let Model = this.model;

                return result.then(function(response) {
                    response.data = _.map(response.data, function(obj) {
                        return new Model(obj);
                    });

                    return response.data;
                });
            } else {
                return result.then(returnResponse);
            }
        }

        /**
         * Delete an object [DELETE].
         * @param  {integer} pk - The primary key or the id
         * @param  {Object} config - Config to be passed to Angular's `$http.delete()`
         * @return {promise}
         */
        delete(pk, config = {}) {
            let options = _.extend({}, _.cloneDeep(this.options), config);

            return $http.delete(`${this.route}/${pk}`, options);
        }
    }

    return Resource;
}

ResourceFactory.$inject = ['$http', 'ResourceConfig'];

export default angular.module('common.api', [])

.provider('ResourceConfig', ResourceProvider)

.factory('Resource', ResourceFactory);
