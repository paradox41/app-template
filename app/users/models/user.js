import {extend} from 'lodash';

export default class User {
    /**
     * The User class
     * @class
     * @param  {Object} user
     * @return {Object} A User
     */
    constructor(user) {
        extend(this, user);

        console.log(this);
    }
}
