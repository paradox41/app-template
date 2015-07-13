/**
 * @module users
 */
import angular from 'angular';
import 'angular-ui-router';

import commonApi from 'common/api';

import {User} from './models';

import edit from './edit';

const STATE = 'app.users';

class UsersCtrl {
    constructor(users) {
        this.users = users;
    }
}

UsersCtrl.$inject = ['users'];

function UserResourceFactory(Resource) {
    class UserResource extends Resource {
        constructor() {
            super('users', User);
        }
    }

    return new UserResource();
}

UserResourceFactory.$inject = ['Resource'];

export default angular.module('users', [
    commonApi.name,
    edit.name
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state(STATE, {
        controller: 'UsersCtrl',
        controllerAs: 'Users',
        url: '/users',
        template: require('./_users.html'),
        resolve: {
            users: ['UserResource', function(UserResource) {
                return UserResource.search();
            }]
        }
    });
}])

.controller('UsersCtrl', UsersCtrl)

.factory('UserResource', UserResourceFactory);

export var userNavigation = {
    state: STATE,
    name: 'Users',
    icon: 'face'
};
