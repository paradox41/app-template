import _ from 'lodash';

class Foo {
    constructor(data) {
        _.extend(this, _.omit(data, '$$hashKey'));
    }

    get name() {
        return `${this.first} ${this.last}`;
    }

    set name(val) {
        let [first, last] = val.split(' ');
        this.first = first;
        this.last = last;
    }
}

export default Foo;
