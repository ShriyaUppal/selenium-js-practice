const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { baseURL, testEmail, testPassword } = require('../config/config');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const { expect } = require('chai');

describe('Cart Tests', function () {
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

    it('should show empty cart message when cart is empty', async function () {
        await browser.get(baseURL);

        let loginElement = await browser.findElement(By.partialLinkText('Login'));
        await loginElement.click();

        let loginPage = new LoginPage(browser);
        await loginPage.login(testEmail, testPassword);

        let cartPage = new CartPage(browser);
        await cartPage.goToCart();

        let isEmpty = await cartPage.isCartEmpty();
        expect(isEmpty).to.be.true;
    })

    it('should add products to cart and verify totals', async function () {
        await browser.get(baseURL);

        let productsPage = new ProductsPage(browser);
        let productsLink = await browser.findElement(By.css('a[href="/products"]'));
        await productsLink.click();

        await browser.wait(async () => {
            let url = await browser.getCurrentUrl();
            return url.includes('/products');
        }, 10000);


        await productsPage.addProductToCart(0);
        await productsPage.addProductToCart(1);

        let cartPage = new CartPage(browser);
        await cartPage.goToCart();

        let itemCount = await cartPage.getCartItemCount();
        console.log('Cart item count:', itemCount);
        expect(itemCount).to.equal(2);

        for (let i = 0; i < itemCount; i++) {
            let price = await cartPage.getLineTotal(i); // reusing since price==total here at qty 1
            let quantity = await cartPage.getQuantity(i);
            let total = await cartPage.getLineTotal(i);
            expect(price * quantity).to.equal(total);
        }
    })
})