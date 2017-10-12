import { AtlantisPage } from './app.po';

describe('atlantis App', () => {
  let page: AtlantisPage;

  beforeEach(() => {
    page = new AtlantisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
