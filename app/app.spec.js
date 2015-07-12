import angular from 'angular';
import _ from 'lodash';

describe('karma tests with chai', function() {
    it('should expose the Chai assert method', function() {
        assert.ok('everything', 'everything is ok');
    });

    it('should expose the Chai expect method', function() {
        expect('foo').to.not.equal('bar');
    });
});

describe('just checking that libraries work', function() {

    it('works for lodash', function() {
        expect(_.size([1, 2, 3])).to.equal(3);
    });

    it('works for angular', function() {
        expect(angular).to.exist;
    });
});
