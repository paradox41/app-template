/**
 * @module common.api
 */
import angular from 'angular';

import _ from 'lodash';

function ResourceProvider() {
    var config = {
        baseURL: ''
    };

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
        return resultPromise.then(function(resultData) {
            return new ResultModel(resultData);
        });
    }

    function serialize(obj) {
        return _(obj).keys().map(function(key) {
            return `encodeURIComponent(key)=encodeURIComponent(obj[key])`;
        }).value().join('&');
    }

    class Resource {
        /**
         * Base Resource class for constructing new REST routes
         * @class
         * @param  {string} route The path to the endpoint
         * @param  {function} model Optional model to be applied to the fetched resource
         * @param  {Object} options Optional configuration object
         */
        constructor(route, model, options = {}) {
            let opts = {};
            // allow global config to be overridden here
            _.extend(opts, ResourceConfig, options);

            this.route = `${opts.baseURL}/${route}`;
            this.model = model;
            this.options = opts;
        }

        get(pk, config = {}) {
            let result = $http.get(`${this.route}/${pk}`, config);

            if (this.model !== undefined) {
                return wrapResult(result, this.model);
            } else {
                return result;
            }
        }

        create(obj, config = {}) {
            return $http.post(`${this.route}`, obj, config);
        }

        update(pk, obj, config = {}) {
            return $http.put(`${this.route}/${pk}`, obj, config);
        }

        search(params, config = {}) {
            let route = this.route;

            if (params) {
                params = serialize(params);

                route = `${route}?${params}`;
            }

            let result = $http.get(`${route}`, config);

            if (this.model !== undefined) {
                let Model = this.model;

                return result.then(function(response) {
                    response.data = _.map(response.data, function(obj) {
                        return new Model(obj);
                    });

                    return response.data;
                });
            }
        }

        delete(pk, config = {}) {
            return $http.delete(`${this.route}/${pk}`, config);
        }
    }

    return Resource;
}

ResourceFactory.$inject = ['$http', 'ResourceConfig'];

export default angular.module('common.api', [])

.provider('ResourceConfig', ResourceProvider)

.factory('Resource', ResourceFactory);
