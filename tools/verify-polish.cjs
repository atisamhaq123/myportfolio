const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const {chromium} = require('../../Helio Customer Portal/.tools/node_modules/playwright');
(async () => {
 const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,timeout:20000});
 const report = {checks:[],errors:[]};
 const root = path.resolve(__dirname,'..');
 try {
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  page.setDefaultTimeout(15000);
  page.on('pageerror', error => report.errors.push(error.message));
  await page.goto(pathToFileURL(path.join(root,'index.html')).href,{waitUntil:'domcontentloaded',timeout:20000});
  await page.waitForTimeout(1500);
  assert.equal(await page.locator('.hero-line').first().evaluate(el=>getComputedStyle(el).opacity),'1');
  assert.equal(await page.locator('.hero-line').first().evaluate(el=>getComputedStyle(el).animationIterationCount),'1');
  assert.equal(await page.locator('.engineering-highlight').count(),9);
  report.checks.push('Entrance animation finishes once; all 9 project engineering details render');
  console.log('PASS entrance and engineering details');
  for (const width of [1440,1024,768,390,320]) { console.log("CHECK viewport "+width); console.log("CHECK viewport "+width);
   await page.setViewportSize({width,height:width>600?1000:844});
   await page.waitForTimeout(150);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Overflow at '+width);
  }
  report.checks.push('No horizontal overflow at 1440, 1024, 768, 390, and 320 pixels');
  for (const id of ['talentflow','medica','wholesale']) {
   await page.locator('.evidence-links [data-project="'+id+'"]').click();
   assert.ok((await page.locator('#case-title').textContent()).length>0);
   await page.keyboard.press('Escape');
  }
  report.checks.push('All three engineering evidence links open case studies');
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.locator('.hero-line').first().evaluate(el=>getComputedStyle(el).animationName),'none');
  assert.equal(await page.locator('.hero-line').first().evaluate(el=>getComputedStyle(el).opacity),'1');
  report.checks.push('Reduced-motion preference disables animation and keeps content visible');
  await page.setViewportSize({width:1440,height:1000});
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:path.join(root,'assets/previews/hero-desktop.png'),animations:'disabled',timeout:20000});
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:path.join(root,'assets/previews/hero-mobile.png'),animations:'disabled',timeout:20000});
  assert.deepEqual(report.errors,[]);
  console.log(JSON.stringify(report,null,2));
  fs.writeFileSync(path.join(root,'assets/polish-verification.json'),JSON.stringify(report,null,2));
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
