const {Builder, By} = require('selenium-webdriver');
const {baseURL} = require('../config/config');
const LoginPage = require('../pages/LoginPage');
const {expect} = require('chai');

async function runLoginTest(){
    let browser = await new Builder().forBrowser('chrome').build();
    try{
        await browser.get(baseURL);
    
        let title = await browser.getTitle();
        console.log(title);

        let loginElement = await browser.findElement(By.partialLinkText('Login'));
        await loginElement.click();

        let loginPage = new LoginPage(browser);
        await loginPage.login('youremail@test.com', 'wrongPassword');
        let errMessage = await loginPage.getErrorMessage();
        console.log(`Error Message: ${errMessage}`);

        expect(errMessage).to.equal('Your email or password is incorrect!');
        console.log(`Assertion passed: correct error message shown`);

    }
    finally{
        await browser.quit();
    }
}

runLoginTest();