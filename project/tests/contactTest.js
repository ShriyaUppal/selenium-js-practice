const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { baseURL } = require('../config/config');
const ContactPage = require('../pages/ContactPage');
const { expect } = require('chai');

describe('Contact Us Tests', function () {
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
    });

    after(async function () {
        await browser.quit();
    });

    it('should submit contact form successfully', async function () {
        await browser.get(baseURL);

        let contactPage = new ContactPage(browser);
        await contactPage.goToContactUsForm();

        await contactPage.fillContactForm(
            'test-user',
            'user@example.com',
            'Feedback of website.',
            'UI and Overall experience is good.'
        );
        await contactPage.submitContactForm();
        let message = await contactPage.getSuccessMessage();
        expect(message).to.equal('Success! Your details have been submitted successfully.');
    });
})