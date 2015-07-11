import _ from 'lodash';

class User {
    constructor(user) {
        _.extend(this, user);

        console.log(this);
    }
}

export default User;
