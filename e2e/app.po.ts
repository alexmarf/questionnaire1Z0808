import { browser, by, element } from 'protractor';

export class Questionnaire1Z0808Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
