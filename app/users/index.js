import angular from 'angular';
import 'angular-ui-router';

import resource from 'common/resource';

import { User } from './models';

import edit from './edit';

const STATE = 'app.users';

class UsersCtrl {
  /*@ngInject*/
  constructor(users) {
    this.users = users;
  }
}

/*@ngInject*/
function UserResourceFactory(Resource) {
  class UserResource extends Resource {
    constructor() {
      super('users', User);
    }
  }

  return new UserResource();
}

export default angular.module('users', [
  'ui.router',
  resource.name,
  edit.name
])

.config( /*@ngInject*/ function($stateProvider) {
  $stateProvider.state(STATE, {
    controller: 'UsersCtrl',
    controllerAs: 'Users',
    url: '/users',
    template: require('./_users.html'),
    resolve: {
      /*@ngInject*/
      users(UserResource) {
        return UserResource.search();
      }
    }
  });
})

.controller('UsersCtrl', UsersCtrl)

.factory('UserResource', UserResourceFactory);

export var userNavigation = {
  state: STATE,
  name: 'Users',
  icon: 'face'
};
