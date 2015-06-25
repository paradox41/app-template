import _ from 'lodash';

/**
 * Represents a Foo
 * @class
 * @param {array} data - The array of data
 * @author Will
 */
export default class Foo {
    constructor(data) {
        _.extend(this, _.omit(data, ['$$hashKey']));
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
