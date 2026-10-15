const fs = require('node:fs');
const path = require('node:path');
const portfolio = path.resolve(__dirname, '..');
const {chromium} = require(path.join(portfolio,'../../Helio Customer Portal/.tools/node_modules/playwright'));
(async () => {
 const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 let count = 0, total = 0;
 try {
  const page = await browser.newPage();
  for (const project of fs.readdirSync(path.join(portfolio,'assets/screenshots'))) {
   const input = path.join(portfolio,'assets/screenshots',project);
   const output = path.join(portfolio,'assets/thumbnails',project);
   fs.mkdirSync(output,{recursive:true});
   for (const file of fs.readdirSync(input).filter(file=>file.endsWith('.png'))) {
    const data = 'data:image/png;base64,'+fs.readFileSync(path.join(input,file)).toString('base64');
    const result = await page.evaluate(async ({data,mobile}) => {
     const image = new Image();image.src=data;await image.decode();
     const canvas=document.createElement('canvas');
     canvas.width=mobile?780:1440;
     canvas.height=mobile?1688:1000;
     const ctx=canvas.getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);
     const height=Math.min(image.naturalHeight,canvas.height*(image.naturalWidth/canvas.width));
     ctx.drawImage(image,0,0,image.naturalWidth,height,0,0,canvas.width,height/(image.naturalWidth/canvas.width));
     return canvas.toDataURL('image/webp',.9).split(',')[1];
    },{data,mobile:file.includes('mobile')});
    const buffer=Buffer.from(result,'base64');total+=buffer.length;count++;
    fs.writeFileSync(path.join(output,file.replace(/\.png$/,'.webp')),buffer);
   }
  }
  console.log(`${count} optimized previews generated; ${(total/1024/1024).toFixed(2)} MB total. Full-page PNG originals preserved.`);
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
