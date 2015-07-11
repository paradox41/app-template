/**
 * @module Users
 */
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
    class UserResource extends Resource {
        constructor() {
            super('users', User);
        }
    }

    return new UserResource();
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
    name: 'Users',
    icon: 'face'
};
