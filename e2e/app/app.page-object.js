export class AppPage {
  load() {
    browser.get('index.html');
  }

  getTitle() {
    return element(by.css('h1'));
  }
}
