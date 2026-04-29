const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto('http://localhost:8080/contact-us.html', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot_mobile.png' });
  await browser.close();
})();
