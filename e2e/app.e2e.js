var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var expect = chai.expect;

describe('app', function() {
  it('working', function() {
    browser.get('index.html');

    expect(element(by.css('h1')).getText()).to.eventually.equal('Hello World!');
  });
});
