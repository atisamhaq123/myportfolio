const fs = require('node:fs');
const path = require('node:path');
const {spawn, spawnSync} = require('node:child_process');
const {createHmac} = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const out = path.resolve(__dirname, '..');
const {chromium} = require(path.join(root, 'Helio Customer Portal/.tools/node_modules/playwright'));
const php = 'C:/wamp64/bin/php/php8.4.15/php.exe';
const projects = [
 {id:'aurelle',folder:'Furniture Selling Website',port:8131,doc:'.',router:'router.php'},
 {id:'helio',folder:'Helio Customer Portal',port:8132,doc:'public'},
 {id:'lingua',folder:'lingua LMS for english learning',port:8133,doc:'public',router:'public/router.php'},
 {id:'marketplace',folder:'MarketPlace Application',port:8134,laravel:true,router:path.join(out,'tools/marketplace-router.php')},
 {id:'medica',folder:'Medical Software',port:8135,laravel:true},
 {id:'veyra',folder:'Real-estate platform',port:8136,doc:'public',router:'public/router.php'},
 {id:'talentflow',folder:'talentflow Recruitment CRM system',port:8137,laravel:true},
 {id:'wholesale',folder:'wholesaler ecommerce platform',port:8138,doc:'public',router:'public/router.php'},
 {id:'zenda',folder:'Zenda Store',port:8139,doc:'.',router:path.join(out,'tools/zenda-router.php')}
];
function totp(secret){
 const bits=[...secret].map(c=>'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.indexOf(c).toString(2).padStart(5,'0')).join('');
 const key=Buffer.from(bits.match(/.{8}/g).map(b=>parseInt(b,2)));
 const counter=Buffer.alloc(8);counter.writeBigUInt64BE(BigInt(Math.floor(Date.now()/30000)));
 const digest=createHmac('sha1',key).update(counter).digest();
 return ((digest.readUInt32BE(digest[19]&15)&0x7fffffff)%1000000).toString().padStart(6,'0');
}
async function main(){
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const report=[];
 try{for(const config of projects.filter(p=>!process.argv[2]||process.argv.slice(2).includes(p.id))){
  console.log('START '+config.id);
  const cwd=path.join(root,config.folder),base='http://127.0.0.1:'+config.port;
  const publicRoot=path.join(cwd,config.laravel?'public':config.doc);
  const router=config.router?path.resolve(cwd,config.router):config.laravel?path.join(cwd,'vendor/laravel/framework/src/Illuminate/Foundation/resources/server.php'):null;
  const args=['-d','xdebug.mode=off','-d','session.save_path='+path.join(out,'tools/sessions'),'-S','127.0.0.1:'+config.port,'-t',publicRoot];
  if(router)args.push(router);
  fs.mkdirSync(path.join(out,'tools/sessions'),{recursive:true});
  const server=spawn(php,args,{cwd:config.laravel?publicRoot:cwd,env:{...process.env,XDEBUG_MODE:'off'},windowsHide:true,stdio:['ignore','pipe','pipe']});
  let logs='';server.stderr.on('data',d=>{logs=(logs+d).slice(-6000)});
  const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2});
  const page=await context.newPage();
  if(config.id==='zenda')await page.route('https://s.w.org/images/core/emoji/**/svg/1f50d.svg',route=>route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path d="M23 23L33 33" stroke="#8193a6" stroke-width="5" stroke-linecap="round"/><circle cx="15" cy="15" r="12" fill="#d8eff8" fill-opacity=".7" stroke="#8193a6" stroke-width="3"/></svg>'}));
  let fixture;
  const record={id:config.id,folder:config.folder,screenshots:[],errors:[]};
  page.on('pageerror',e=>record.errors.push(e.message));
  const goto=async(route)=>{
   const response=await page.goto(base+route,{waitUntil:'networkidle',timeout:45000});
   if(response.status()>=400)throw Error('HTTP '+response.status()+' '+route+' '+(await page.locator('body').innerText()).slice(0,350));
   await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img[loading="lazy"]').forEach(i=>i.loading='eager');await Promise.race([Promise.all([...document.images].map(i=>i.complete?Promise.resolve():new Promise(r=>{i.onload=i.onerror=r}))),new Promise(r=>setTimeout(r,5000))]);});
   await page.waitForTimeout(350);
  };
  const snap=async(name,label,route,mobile=false)=>{
   await page.setViewportSize(mobile?{width:390,height:844}:{width:1440,height:1000});
   if(route!==null)await goto(route);
   await page.screenshot({path:path.join(out,'assets/screenshots',config.id,name+'.png'),fullPage:true,animations:'disabled'});
   const metrics=await page.evaluate(()=>({width:innerWidth,height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth+1,brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).length,brokenImagePaths:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}));
   record.screenshots.push({file:name+'.png',label,mobile,url:page.url(),...metrics});
   console.log('CAPTURE '+config.id+'/'+name+' '+JSON.stringify(metrics));
  };
  const login=async(route,email,password)=>{
   await goto(route);
   await page.locator('input[type=email],input[name=email]').first().fill(email);
   await page.locator('input[type=password]').first().fill(password);
   await page.locator('form').filter({has:page.locator('input[type=password]')}).locator('button[type=submit],button:not([type]),input[type=submit]').first().click();
   await page.waitForLoadState('networkidle');
  };
  try{
   fs.mkdirSync(path.join(out,'assets/screenshots',config.id),{recursive:true});
   for(let i=0;i<30;i++){try{await fetch(base);break;}catch{await new Promise(r=>setTimeout(r,250));}}
   await goto('/');
   if(config.id==='aurelle'){
    await snap('01-home-desktop','Furniture storefront · desktop','/');
    await snap('02-catalog-desktop','Product catalog · desktop','/shop.php');
    const url=await page.locator('a[href*="product.php"]').first().getAttribute('href');
    await snap('03-product-desktop','Product details · desktop','/'+url.replace(/^\//,''));
    await snap('04-home-mobile','Furniture storefront · mobile','/',true);
    await snap('05-catalog-mobile','Product catalog · mobile','/shop.php',true);
   }else if(config.id==='helio'){
    await page.getByRole('button',{name:'Enter customer demo'}).click();await page.waitForLoadState('networkidle');
    await snap('01-dashboard-desktop','Solar customer dashboard · desktop','/index.php?page=dashboard');
    await snap('02-energy-desktop','Energy reporting · desktop','/index.php?page=energy');
    await snap('03-project-desktop','Installation timeline · desktop','/index.php?page=project');
    await snap('04-dashboard-mobile','Customer dashboard · mobile','/index.php?page=dashboard',true);
    await snap('05-project-mobile','Installation timeline · mobile','/index.php?page=project',true);
   }else if(config.id==='lingua'){
    await snap('01-home-desktop','Learning marketplace · desktop','/');
    await snap('02-tutors-desktop','Tutor discovery · desktop','/?page=tutors');
    await login('/?page=login','student@lingua.test','Demo123!');
    await snap('03-dashboard-desktop','Student workspace · desktop','/?page=dashboard');
    await snap('04-dashboard-mobile','Student workspace · mobile','/?page=dashboard',true);
    await snap('05-tutors-mobile','Tutor discovery · mobile','/?page=tutors',true);
   }else if(config.id==='marketplace'){
    await snap('01-marketplace-desktop','Classifieds discovery · desktop','/');
    const listing=new URL(await page.locator('a[href*="/listings/"]').first().getAttribute('href'),base).pathname;
    await snap('02-listing-desktop','Listing detail · desktop',listing);
    await login('/login','seller@example.com','MarketPlace123!');
    await snap('03-dashboard-desktop','Seller inventory · desktop','/dashboard');
    await snap('04-marketplace-mobile','Classifieds discovery · mobile','/',true);
    await snap('05-listing-mobile','Listing detail · mobile',listing,true);
   }else if(config.id==='medica'){
    const result=spawnSync(php,['-d','xdebug.mode=off','tests/browser/fixture.php'],{cwd,encoding:'utf8',windowsHide:true});
    if(result.status!==0)throw Error('Medical preview fixture failed: '+result.stderr);
    fixture=JSON.parse(result.stdout);
    await login('/login',fixture.email,fixture.password);
    await page.getByLabel('Authenticator code').fill(totp(fixture.secret));
    await page.getByRole('button',{name:'Verify & continue'}).click();await page.waitForLoadState('networkidle');
    await snap('01-dashboard-desktop','Clinic overview · desktop','/');
    await snap('02-patients-desktop','Patient directory · desktop','/patients');
    await snap('03-appointments-desktop','Appointment scheduling · desktop','/appointments');
    await snap('04-dashboard-mobile','Clinic overview · mobile','/',true);
    await snap('05-patients-mobile','Patient directory · mobile','/patients',true);
   }else if(config.id==='talentflow'){
    await login('/login','admin@talentflow.test','TalentFlow!2026');
    await snap('01-dashboard-desktop','Recruitment overview · desktop','/');
    await snap('02-pipeline-desktop','Candidate pipeline · desktop','/workspace/applications');
    await snap('03-candidates-desktop','Candidate directory · desktop','/workspace/candidates');
    await snap('04-dashboard-mobile','Recruitment overview · mobile','/',true);
    await snap('05-jobs-mobile','Job management · mobile','/workspace/jobs',true);
   }else if(config.id==='veyra'){
    await snap('01-home-desktop','Real estate homepage · desktop','/');
    const links=await page.locator('a').evaluateAll(a=>a.map(i=>({text:i.textContent.trim(),href:i.getAttribute('href')})));
    console.log('VEYRA LINKS '+JSON.stringify(links.slice(0,55)));
    const browse=links.find(l=>/properties|buy|search/i.test(l.href)&&!/#/.test(l.href));
    const browseRoute=new URL(browse.href,base).pathname;
    await snap('02-properties-desktop','Property discovery · desktop',browseRoute);
    const property=await page.locator('a').evaluateAll(a=>a.map(i=>i.getAttribute('href')).find(h=>/\/property\?/.test(h||'')));
    const propertyUrl=new URL(property,base);
    await snap('03-property-desktop','Property details · desktop',propertyUrl.pathname+propertyUrl.search);
    await snap('04-home-mobile','Real estate homepage · mobile','/',true);
    await snap('05-property-mobile','Property details · mobile',propertyUrl.pathname+propertyUrl.search,true);
   }else if(config.id==='wholesale'){
    await login('/login','retailer@mystore.test','DemoStore!2026');
    console.log('WHOLESALE LINKS '+JSON.stringify(await page.locator('a').evaluateAll(a=>a.map(i=>({text:i.textContent.trim(),href:i.getAttribute('href')})).slice(0,45))));
    await snap('01-marketplace-desktop','Wholesale marketplace · desktop','/');
    const offer=await page.locator('a').evaluateAll(a=>a.map(i=>i.getAttribute('href')).find(h=>/\/product\?/.test(h||'')));
    const productUrl=new URL(offer,base);const productRoute=productUrl.pathname+productUrl.search;
    await snap('02-product-desktop','Supplier comparison · desktop',productRoute);
    const bag=await page.locator('a').evaluateAll(a=>a.map(i=>i.getAttribute('href')).find(h=>/cart|bag/.test(h||'')));
    await snap('03-bag-desktop','Wholesale order bag · desktop',new URL(bag,base).pathname);
    await snap('04-marketplace-mobile','Wholesale marketplace · mobile','/',true);
    await snap('05-product-mobile','Supplier comparison · mobile',productRoute,true);
   }else if(config.id==='zenda'){
    await snap('01-home-desktop','Artisan storefront · desktop','/');
    await snap('02-shop-desktop','WooCommerce catalog · desktop','/shop/');
    const product=await page.locator('a[href*="/product/"]').first().getAttribute('href');
    await snap('03-product-desktop','WooCommerce product detail · desktop',new URL(product,base).pathname);
    await snap('04-home-mobile','Artisan storefront · mobile','/',true);
    await snap('05-shop-mobile','WooCommerce catalog · mobile','/shop/',true);
   }
   console.log('DONE '+config.id);
  }catch(error){record.failure=error.message;console.log('FAILED '+config.id+' '+error.message);console.log(logs.slice(-1400));}
  finally{
   if(fixture){const result=spawnSync(php,['-d','xdebug.mode=off','tests/browser/fixture.php','cleanup',fixture.email],{cwd,encoding:'utf8',windowsHide:true});if(result.status!==0)console.log('FIXTURE CLEANUP FAILED '+result.stderr);}
   await context.close();server.kill();report.push(record);
   const file=path.join(out,'assets/capture-report.json');let previous=[];if(fs.existsSync(file))previous=JSON.parse(fs.readFileSync(file));
   fs.writeFileSync(file,JSON.stringify([...previous.filter(p=>p.id!==record.id),record],null,2));
  }
 }}finally{await browser.close();}
 console.log('RESULT '+JSON.stringify(report.map(r=>({id:r.id,count:r.screenshots.length,failure:r.failure}))));
}
main().catch(e=>{console.error(e);process.exit(1)});
