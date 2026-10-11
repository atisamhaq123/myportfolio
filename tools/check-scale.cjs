const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require('../../Helio Customer Portal/.tools/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:320,height:844}});
  await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
  await page.evaluate(()=>document.fonts.ready);
  console.log(JSON.stringify(await page.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.getBoundingClientRect().width,overflow:[...document.querySelectorAll('body *')].map(el=>({tag:el.tagName,class:el.className,text:el.textContent.trim().slice(0,70),right:el.getBoundingClientRect().right,left:el.getBoundingClientRect().left,scrollWidth:el.scrollWidth,clientWidth:el.clientWidth})).filter(el=>el.right>innerWidth+1||el.left< -1).slice(0,30)})),null,2));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
