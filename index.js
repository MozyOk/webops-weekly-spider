const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // TODO 毎週木曜日に201部分をインクリメンタル
  await page.goto('https://webopsweekly.com/issues/201');
  
  // TODO datas に入ってくるデータいい感じにしないとね
  var datas = await page.$$eval(".el-item > tbody > tr > td > .desc > .mainlink > a", list => {
    var datas=[];
    for (let i = 0; i < list.length; i++) {
      var data = {
        href: list[i].href,
        textContent: list[i].textContent,
        innerHTML: list[i].innerHTML
      };
      datas.push(data);
    }
    return datas;
  });

  console.log(datas)

  await browser.close();
})();
