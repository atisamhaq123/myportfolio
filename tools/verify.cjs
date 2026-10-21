const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const portfolio = path.resolve(__dirname, '..');
const {chromium} = require(path.join(portfolio, '../../Helio Customer Portal/.tools/node_modules/playwright'));
(async () => {
 const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const results = {checks:[],errors:[]};
 try {
  const context = await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});
  const page = await context.newPage();
  page.on('pageerror',e => results.errors.push(e.message));
  const url = pathToFileURL(path.join(portfolio,'index.html')).href;
  await page.goto(url,{waitUntil:'networkidle'});
  await page.evaluate(async () => {await document.fonts.ready;document.querySelectorAll('img').forEach(i => i.loading='eager')});
  await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))));
  fs.mkdirSync(path.join(portfolio,'assets/previews'),{recursive:true});
  await page.screenshot({path:path.join(portfolio,'assets/previews/hero-desktop.png'),animations:'disabled'});
  assert.equal(await page.locator('.project-card').count(),14);
  const projects = await page.evaluate(() => window.portfolioProjects);
  for (const project of projects) {
   assert.equal(project.screens.length,5);
   for (const [file] of project.screens) assert.ok(fs.existsSync(path.join(portfolio,'assets/screenshots',project.id,file)),`Missing ${project.id}/${file}`);
  }
  results.checks.push('14 projects, exactly 5 screenshots each, all 70 original files exist');
  await page.getByRole('button',{name:'Ecommerce',exact:true}).click();
  assert.equal(await page.locator('.project-card:visible').count(),3);
  await page.getByRole('button',{name:'Business platforms',exact:true}).click();
  assert.equal(await page.locator('.project-card:visible').count(),8);
  await page.getByRole('button',{name:'Marketplaces',exact:true}).click();
  assert.equal(await page.locator('.project-card:visible').count(),3);
  await page.locator('[data-filter="All"]').click();
  results.checks.push('All three category filters show the correct projects');
  for (const project of projects) {
   await page.locator(`.card-case-link[data-project="${project.id}"]`).click();
   await page.locator('#case-dialog').evaluate(dialog => {dialog.querySelectorAll('img').forEach(i => i.loading='eager')});
   await page.waitForTimeout(180);
   assert.equal(await page.locator('#case-title').textContent(),project.title);
   assert.equal(await page.locator('#case-dialog .screenshot-button').count(),5);
   assert.equal(await page.locator('#case-dialog img').evaluateAll(images=>images.filter(i=>!i.complete||!i.naturalWidth).length),0,`Broken gallery image ${project.id}`);
   await page.locator('[data-image="0"]').click();
   await page.locator('#viewer-image').evaluate(image => image.decode());
   assert.ok(await page.locator('#viewer-image').evaluate(image=>image.naturalWidth>=1440));
   await page.keyboard.press('ArrowRight');
   assert.ok((await page.locator('#image-counter').textContent()).startsWith('2 of 5'));
   await page.locator('#image-next').click();
   await page.locator('#image-next').click();
   await page.locator('#viewer-image').evaluate(image => image.decode());
   assert.ok(await page.locator('#viewer-image').evaluate(image=>image.naturalWidth>=390));
   await page.keyboard.press('Escape');
   assert.equal(await page.locator('#image-dialog').evaluate(d=>d.open),false);
   assert.equal(await page.locator('#case-dialog').evaluate(d=>d.open),true);
   await page.keyboard.press('Escape');
  }
  results.checks.push('All 14 case studies, all 70 gallery images, full-resolution viewer, navigation, and Escape close work');
  await page.locator('#brief-open').click();
  await page.locator('[name="project"]').fill('A custom Laravel customer portal');
  await page.locator('[name="details"]').fill('Customer sign-in, project status, documents, and a responsive dashboard.');
  await page.locator('[name="timeline"]').fill('6 weeks');
  await page.getByRole('button',{name:'Create my brief'}).click();
  assert.ok((await page.locator('#brief-output').inputValue()).includes('Hi Atisam,'));
  assert.ok((await page.locator('#brief-output').inputValue()).includes('6 weeks'));
  await page.getByRole('button',{name:'Copy message'}).click();
  assert.ok((await page.locator('#copy-status').textContent()).length>0);
  await page.keyboard.press('Escape');
  results.checks.push('Project brief generation and copy feedback work');
  fs.mkdirSync(path.join(portfolio,'assets/previews'),{recursive:true});
  for (const width of [1440,1024,768,390,320]) {
   await page.setViewportSize({width,height:width>600?1000:844});
   await page.evaluate(()=>scrollTo(0,0));
   await page.waitForTimeout(200);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Portfolio overflow at ${width}`);
   assert.equal(await page.locator('img').evaluateAll(images=>images.filter(i=>!i.complete||!i.naturalWidth).length),0,`Broken image at ${width}`);
   if(width===1440||width===390){await page.screenshot({path:path.join(portfolio,'assets/previews',width===1440?'portfolio-desktop.png':'portfolio-mobile.png'),fullPage:true,animations:'disabled'});await page.screenshot({path:path.join(portfolio,'assets/previews',width===1440?'hero-desktop.png':'hero-mobile.png'),animations:'disabled'});}
  }
  results.checks.push('No page overflow or broken images at 1440, 1024, 768, 390, and 320 pixels');
  await page.locator('.card-case-link[data-project="talentflow"]').click();
  assert.equal(await page.locator('#case-dialog').evaluate(d=>d.scrollWidth>d.clientWidth+1),false,'Mobile case study overflow');
  await page.screenshot({path:path.join(portfolio,'assets/previews/case-study-mobile.png'),animations:'disabled'});
  await page.keyboard.press('Escape');
  await page.goto(url+'#project-medica',{waitUntil:'networkidle'});
  assert.equal(await page.locator('#case-title').textContent(),'Medica');
  results.checks.push('Mobile case study layout and shareable project hashes work');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto(url,{waitUntil:'networkidle'});
  assert.equal(await page.locator('.hero-line').first().evaluate(element=>getComputedStyle(element).animationName),'none');
  assert.equal(await page.locator('.hero-line').first().evaluate(element=>getComputedStyle(element).opacity),'1');
  await page.locator('.evidence-links [data-project="medica"]').click();
  assert.equal(await page.locator('#case-title').textContent(),'Medica');
  results.checks.push('Reduced-motion preference disables entrance animation; engineering evidence links open the correct case study');
  assert.deepEqual(results.errors,[],'JavaScript errors');
  console.log(JSON.stringify(results,null,2));
 } finally {
  fs.writeFileSync(path.join(portfolio,'assets/verification-report.json'),JSON.stringify(results,null,2));
  await browser.close();
 }
})().catch(error=>{console.error(error);process.exit(1)});
