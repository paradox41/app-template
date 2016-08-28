import { AppPage } from './app.page-object';

describe('app', function() {
  beforeEach(function() {
    this.page = new AppPage();
    this.page.load();
  });

  it('should work', function() {
    expect(this.page.getTitle().getText()).to.eventually.equal('Hello World!');
  });
});
