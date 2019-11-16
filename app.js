const puppeteer = require('puppeteer');
const fs = require('fs');
var _ = require('lodash');

let rawdata = fs.readFileSync('portfolio.json');
let portfolio = JSON.parse(rawdata).portfolio;

console.log(portfolio)

async function recomendation() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for(var i in portfolio){
        var item = portfolio[i]
        await page.goto('http://www.attainix.com/ICTrackerDetail.aspx?stockcode=' + item.stockCode, {
                waitUntil: 'networkidle2'
        });
        let html = await page.$eval('section div div div div div div fieldset table tbody tr td span#ctl00_PageContent_lbl_Combined_Outlook', e => e.innerHTML)
        console.log(item.stockName, "==>", html)
        }

    await browser.close();
}

recomendation()

