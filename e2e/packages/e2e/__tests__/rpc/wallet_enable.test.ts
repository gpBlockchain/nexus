import { launchWithNexus } from '../../src/setup/launch';
import { MNEMONIC, NEXUS_BUILD_PATH, PASSWd, UserName } from '../config/config';
import { setUpNexus } from '../../src/setup/setup';
import { wallet_enable } from '../../src/nexus/servicer/rpc';
import { failedTestScreenshot, injectionTestStatus, step } from '../util';
import { BrowserContext, Page } from 'playwright';
import { NexusWallet } from '../../src/types';
import { urlTransferDomainName } from '../../src/nexus/helper/popup';

injectionTestStatus();
describe('wallet_enable', function () {
  let browser: BrowserContext;
  let nexusWallet: NexusWallet;
  let page: Page;
  it('demo', async () => {
    const connectedUrl = 'https://www.baidu.com';
    await step('launchWithNexus', async () => {
      browser = await launchWithNexus({ nexusPath: NEXUS_BUILD_PATH });
    });

    await step('setUpNexus', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      nexusWallet = await setUpNexus(browser, {
        mock: true,
        userName: UserName,
        seed: MNEMONIC,
        passwd: PASSWd,
      });
    });

    await step('goto baidu', async () => {
      page = await browser.newPage();
      await page.goto(connectedUrl);
    });
    await step('connect', async () => {
      await Promise.all([wallet_enable(page), nexusWallet.connect()]);
    });

    await step('get white list', async () => {
      const list = await nexusWallet.popup.queryWhitelist();
      expect(list).toContain(urlTransferDomainName(connectedUrl));
    });
  });
  afterEach(async () => {
    // @ts-ignore
    await failedTestScreenshot(browser);
  });

  afterAll(async () => {
    await browser.close();
  });
});
