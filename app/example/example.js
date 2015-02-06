import * as _ from 'lodash';

class Example {
    constructor(data) {
        this.exampleData = data;
    }

    someMethod() {
        return _.map(this.exampleData, function(data) {
            return (data * 2);
        });
    }

    get data() {
        return this.exampleData;
    }
}

function ExampleState($stateProvider) {
    $stateProvider.state('app.example', {
        controller: ['data', Example],
        controllerAs: 'Example',
        url: '/example',
        templateUrl: require('./_example.html')
    });
}

export default ['$stateProvider', ExampleState];
