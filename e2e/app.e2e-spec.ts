import { AemdemoPage } from './app.po';

describe('aemdemo App', function() {
  let page: AemdemoPage;

  beforeEach(() => {
    page = new AemdemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
