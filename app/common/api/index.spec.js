import angular from 'angular';
import 'angular-mocks';

import './';

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

    beforeEach(angular.mock.module('common.api'));
    beforeEach(angular.mock.module('test.1'));

    beforeEach(inject(function($injector) {
        ResourceConfig = $injector.get('ResourceConfig');
    }));

    it('should change the baseURL if the baseURL is provided', function() {
        expect(ResourceConfig).to.exist;
        expect(ResourceConfig.baseURL).to.not.be.empty;
        expect(ResourceConfig.baseURL).to.equal('http://jsonplaceholder.typicode.com');
    });
});

describe('Resource', function() {
    var testResource;
    var Resource;
    var ResourceConfig;

    angular.module('test.2', []).config(function(ResourceConfigProvider) {
        ResourceConfigProvider.setConfig({
            headers: {
                'X-Auth-Token': 'bar'
            }
        });
    });

    beforeEach(angular.mock.module('common.api'));
    beforeEach(angular.mock.module('test.2'));

    beforeEach(inject(function($injector) {
        Resource = $injector.get('Resource');
        ResourceConfig = $injector.get('ResourceConfig');

        class TestResource extends Resource {
            constructor() {
                super('test', Foo, {
                    headers: {
                        'X-Auth-Token': 'foo'
                    }
                });
            }
        }

        testResource = new TestResource();
    }));

    it('should expose the CRUD methods and search', function() {
        expect(testResource).to.be.an.instanceof(Resource);

        expect(testResource).to.have.property('get');
        expect(testResource).to.have.property('create');
        expect(testResource).to.have.property('update');
        expect(testResource).to.have.property('search');
        expect(testResource).to.have.property('delete');
    });

    it('should set the route correctly', function() {
        expect(testResource.route).to.exist
            .and.to.equal('/test');
    });

    it('should set the model correctly', function() {
        expect(testResource.model).to.equal(Foo);
    });

    it('should have allow options to be overridden if it is provided via the constructor', function() {
        expect(testResource.options.headers).to.deep.equal({
            'X-Auth-Token': 'foo'
        });
    });
});
