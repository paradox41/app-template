import {extend} from 'lodash';

export default class User {
    constructor(user) {
        extend(this, user);
    }
}
