import { Questionnaire1Z0808Page } from './app.po';

describe('questionnaire1-z0808 App', () => {
  let page: Questionnaire1Z0808Page;

  beforeEach(() => {
    page = new Questionnaire1Z0808Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
