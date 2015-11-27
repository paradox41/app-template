import {extend} from 'lodash';

export default class User {
    /**
     * The User class.
     * @class
     * @param {Object} user - A user object
     */
    constructor(user) {
        extend(this, user);
    }
}
