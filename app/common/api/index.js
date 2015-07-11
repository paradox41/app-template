import angular from 'angular';

import _ from 'lodash';

function ResourceFactory($http) {

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
        // TODO(will): Make baseURL configurable via a provider
        constructor(route, model, baseURL = '') {
            this.route = `${baseURL}/${route}`;
            this.model = model;
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

ResourceFactory.$inject = ['$http'];

export default angular.module('common.api', [])

.factory('Resource', ResourceFactory);
