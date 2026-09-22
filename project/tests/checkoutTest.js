const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { baseURL, testEmail, testPassword } = require('../config/config');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const { expect } = require('chai');

describe('Checkout Tests', function () {
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
        browser = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        await browser.manage().setTimeouts({ pageLoad: 15000 });
    })

    after(async function () {
        await browser.quit();
    })

    it('should complete checkout flow successfully', async function () {
        await browser.get(baseURL);

        let loginElement = await browser.findElement(By.partialLinkText('Login'));
        await loginElement.click();
        let loginPage = new LoginPage(browser);
        await loginPage.login(testEmail, testPassword);

        await browser.get(baseURL + '/products');

        let productsPage = new ProductsPage(browser);
        await productsPage.addProductToCart(0);

        let cartPage = new CartPage(browser);
        await cartPage.goToCart();

        let itemCount = await cartPage.getCartItemCount();
        console.log('Items in cart before checkout:', itemCount);
        expect(itemCount).to.be.greaterThan(0);

        let checkoutPage = new CheckoutPage(browser);
        await checkoutPage.proceedToCheckout();
        await checkoutPage.placeOrder();

        await checkoutPage.fillPaymentDetails(
            'Test User',
            '4111111111111111',
            '123',
            '12',
            '2029'
        );
        await checkoutPage.payAndConfirm();

        let success = await checkoutPage.isOrderSuccessfull();
        expect(success).to.be.true;
    })
})