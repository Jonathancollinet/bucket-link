import { FrontBucketlinkPage } from './app.po';

describe('front-bucketlink App', () => {
  let page: FrontBucketlinkPage;

  beforeEach(() => {
    page = new FrontBucketlinkPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
