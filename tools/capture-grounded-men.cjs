const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../../..');
const portfolio = path.resolve(__dirname, '..');
const { chromium } = require(path.join(root, 'Helio Customer Portal/.tools/node_modules/playwright'));

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const output = path.join(portfolio, 'assets/screenshots/grounded-men');
  const previews = path.join(portfolio, 'assets/thumbnails/grounded-men');
  fs.mkdirSync(output, { recursive: true });
  fs.mkdirSync(previews, { recursive: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
    const page = await context.newPage();
    await page.goto(process.env.GROUNDED_MEN_URL || 'http://localhost:8097', { waitUntil: 'networkidle' });
    const capture = async file => {
      await page.evaluate(async () => { await document.fonts.ready; document.activeElement?.blur(); });
      await page.screenshot({ path: path.join(output, file), fullPage: true, animations: 'disabled' });
    };
    await capture('01-home-desktop.png');
    await page.setViewportSize({ width: 390, height: 844 });
    await capture('04-home-mobile.png');
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.getByRole('button', { name: 'Member login' }).click();
    await page.getByRole('button', { name: 'Administrator', exact: true }).click();
    await page.getByRole('heading', { name: /Good (morning|afternoon|evening)/ }).waitFor();
    await capture('02-dashboard-desktop.png');
    await page.getByRole('button', { name: 'Class schedule', exact: true }).click();
    await page.locator('main h1').waitFor();
    await capture('03-schedule-desktop.png');
    await page.getByRole('button', { name: 'Overview', exact: true }).click();
    await page.setViewportSize({ width: 390, height: 844 });
    await capture('05-dashboard-mobile.png');
    for (const file of fs.readdirSync(output).filter(file => file.endsWith('.png'))) {
      const data = 'data:image/png;base64,' + fs.readFileSync(path.join(output, file)).toString('base64');
      const encoded = await page.evaluate(async ({ data, mobile }) => {
        const image = new Image(); image.src = data; await image.decode();
        const canvas = document.createElement('canvas');
        canvas.width = mobile ? 780 : 1440;
        canvas.height = mobile ? 1688 : 1000;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f6f7f2'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        const height = Math.min(image.naturalHeight, canvas.height * image.naturalWidth / canvas.width);
        ctx.drawImage(image, 0, 0, image.naturalWidth, height, 0, 0, canvas.width, height * canvas.width / image.naturalWidth);
        return canvas.toDataURL('image/webp', .9).split(',')[1];
      }, { data, mobile: file.includes('mobile') });
      fs.writeFileSync(path.join(previews, file.replace(/\.png$/, '.webp')), Buffer.from(encoded, 'base64'));
    }
    console.log('Grounded Men: saved 5 original captures and 5 optimized previews.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
