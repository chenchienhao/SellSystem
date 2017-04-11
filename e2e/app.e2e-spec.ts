import { SellSystemPage } from './app.po';

describe('sell-system App', function() {
  let page: SellSystemPage;

  beforeEach(() => {
    page = new SellSystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
