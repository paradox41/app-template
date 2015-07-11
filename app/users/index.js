import angular from 'angular';
import 'angular-ui-router';

import 'common/api';

import {User} from './models';

const STATE = 'app.users';

class UsersCtrl {
    constructor(UserResource) {
        UserResource.search().then((response) => {
            this.users = response;
        });
    }
}

UsersCtrl.$inject = ['UserResource'];

function UserResourceFactory(Resource) {
    // resource via http://jsonplaceholder.typicode.com/
    return new Resource('users', User, 'http://jsonplaceholder.typicode.com');
}

UserResourceFactory.$inject = ['Resource'];

export default angular.module('users', [
    'common.api'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state(STATE, {
        controller: 'UsersCtrl',
        controllerAs: 'Users',
        url: '/users',
        template: require('./_users.html')
    });
}])

.controller('UsersCtrl', UsersCtrl)

.factory('UserResource', UserResourceFactory);

export var userNavigation = {
    state: STATE,
    name: 'Users'
};
