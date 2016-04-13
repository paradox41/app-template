import angular from 'angular';

import _ from 'lodash';

/*@ngInject*/
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

/*@ngInject*/
function ResourceFactory($http, ResourceConfig) {

  function wrapResult(resultPromise, ResultModel) {
    return resultPromise.then(function(response) {
      return new ResultModel(response.data);
    });
  }

  function encode(obj) {
    return _.map(obj, function(value, param) {
      param = encodeURIComponent(param);
      value = encodeURIComponent(value);

      return `${param}=${value}`;
    }).value().join('&');
  }

  function returnResponse(response) {
    return response.data;
  }

  class Resource {
    constructor(route, model, options = {}) {
      // allow global config to be overridden here
      let opts = _.extend({}, ResourceConfig, options);

      this.route = `${opts.baseURL}/${route}`;
      this.model = model;
      this.options = opts;
    }

    get(pk, config = {}) {
      let options = _.extend({}, _.cloneDeep(this.options), config);
      let result = $http.get(`${this.route}/${pk}`, options);

      if (this.model !== undefined) {
        return wrapResult(result, this.model);
      } else {
        return result.then(returnResponse);
      }
    }

    create(obj, config = {}) {
      let options = _.extend({}, _.cloneDeep(this.options), config);

      return $http.post(`${this.route}`, obj, options).then(returnResponse);
    }

    update(pk, obj, config = {}) {
      let options = _.extend({}, _.cloneDeep(this.options), config);

      return $http.put(`${this.route}/${pk}`, obj, options).then(returnResponse);
    }

    search(params, config = {}) {
      let route = this.route;
      let options = _.extend({}, _.cloneDeep(this.options), config);

      if (params) {
        params = encode(params);

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

    delete(pk, config = {}) {
      let options = _.extend({}, _.cloneDeep(this.options), config);

      return $http.delete(`${this.route}/${pk}`, options);
    }
  }

  return Resource;
}

export default angular.module('common.resource', [])

.provider('ResourceConfig', ResourceProvider)

.factory('Resource', ResourceFactory);
