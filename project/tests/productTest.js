const {Builder, By} = require('selenium-webdriver');
const {baseURL, productsURL} = require('../config/config');
const ProductsPage = require('../pages/ProductsPage');
const {expect} = require('chai');

describe('Products Test Cases', function(){
    this.timeout(30000);
    let browser;

    before(async function(){
        browser = await new Builder().forBrowser('chrome').build();
    })

    beforeEach(async function(){
        await browser.manage().deleteAllCookies();
    })

    after(async function(){
        await browser.quit();
    })

    it('should search products by searching a product in search bar', async function(){
        await browser.get(productsURL);
        // let productElement = await browser.findElement(By.linkText('Products'));
        // await productElement.click();

        let productsPage = new ProductsPage(browser);
        await productsPage.searchProduct('T-Shirts');

        let result = await productsPage.getProductsCount();
        expect(result).to.be.greaterThan(0);
    })  
})