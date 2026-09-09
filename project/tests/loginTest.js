const {Builder, By} = require('selenium-webdriver');
const {baseURL} = require('../config/config');
const LoginPage = require('../pages/LoginPage');
const {expect} = require('chai');

describe("Login Tests", function (){
    this.timeout(30000); //since selenium actions can be slow; Mocha default timeout is (2s) too short.
    let browser;
    
    before(async function(){
        browser = await new Builder().forBrowser('chrome').build();
    })

    after(async function(){
        await browser.quit();
    })

    it('should show an error message for invalid login credentials', async function(){
        await browser.get(baseURL);

        let loginElement = await browser.findElement(By.partialLinkText('Login'));
        await loginElement.click();
        
        let loginPage = new LoginPage(browser);
        await loginPage.login('youremail@test.com', 'wrongPassword');

        let errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).to.equal('Your email or password is incorrect!');
    })
})