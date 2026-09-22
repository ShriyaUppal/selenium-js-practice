const { Builder, By } = require('selenium-webdriver');
const { baseURL, productsURL } = require('../config/config');
const ProductsPage = require('../pages/ProductsPage');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

describe('Products Test Cases', function () {
    this.timeout(30000);
    let browser;

    before(async function () {
        let options = new chrome.Options();
        options.setPageLoadStrategy('eager');
        if (process.env.CI) {
            options.addArguments('--headless=new');
            options.addArguments('--no-sandbox');
            options.addArguments('--disable-dev-shm-usage');
        }
        browser = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        await browser.manage().setTimeouts({ pageLoad: 15000 });
    })

    beforeEach(async function () {
        await browser.manage().deleteAllCookies();
    })

    after(async function () {
        await browser.quit();
    })

    it('should search products by searching a product in search bar', async function () {
        await browser.get(productsURL);

        let productsPage = new ProductsPage(browser);
        await productsPage.searchProduct('T-Shirts');

        let result = await productsPage.getProductsCount();
        expect(result).to.be.greaterThan(0);
    })
})