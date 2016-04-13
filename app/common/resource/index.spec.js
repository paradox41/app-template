import angular from 'angular';
import 'angular-mocks';

import { expect } from 'chai';

import resource from './';

class Foo {
  constructor(data) {
    this.data = data;
  }
}

describe('ResourceConfigProvider', function() {
  var ResourceConfig;

  angular.module('test.1', []).config(function(ResourceConfigProvider) {
    ResourceConfigProvider.setConfig({
      baseURL: 'http://jsonplaceholder.typicode.com'
    });
  });

  beforeEach(angular.mock.module(resource.name));
  beforeEach(angular.mock.module('test.1'));

  beforeEach(angular.mock.inject(function($injector) {
    ResourceConfig = $injector.get('ResourceConfig');
  }));

  it('should change the baseURL if the baseURL is provided', function() {
    expect(ResourceConfig).to.exist;
    expect(ResourceConfig.baseURL).to.not.be.empty;
    expect(ResourceConfig.baseURL).to.equal('http://jsonplaceholder.typicode.com');
  });
});

describe('Resource', function() {
  angular.module('test.2', []).config(function(ResourceConfigProvider) {
    ResourceConfigProvider.setConfig({
      headers: {
        'X-Auth-Token': 'bar'
      }
    });
  });

  beforeEach(angular.mock.module(resource.name));
  beforeEach(angular.mock.module('test.2'));

  beforeEach(angular.mock.inject(function($injector) {
    let Resource = this.Resource = $injector.get('Resource');

    class TestResource extends Resource {
      constructor() {
        super('test', Foo, {
          headers: {
            'X-Auth-Token': 'foo'
          }
        });
      }
    }

    this.testResource = new TestResource();
  }));

  it('should expose the CRUD methods and search', function() {
    expect(this.testResource).to.be.an.instanceof(this.Resource);

    expect(this.testResource).to.have.property('get');
    expect(this.testResource).to.have.property('create');
    expect(this.testResource).to.have.property('update');
    expect(this.testResource).to.have.property('search');
    expect(this.testResource).to.have.property('delete');
  });

  it('should set the route correctly', function() {
    expect(this.testResource.route).to.exist
      .and.to.equal('/test');
  });

  it('should set the model correctly', function() {
    expect(this.testResource.model).to.equal(Foo);
  });

  it('should have allow options to be overridden if it is provided via the constructor', function() {
    expect(this.testResource.options.headers).to.deep.equal({
      'X-Auth-Token': 'foo'
    });
  });
});
