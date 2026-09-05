const {Builder, By} = require('selenium-webdriver');
const {baseURL} = require('../config/config');
const LoginPage = require('../pages/LoginPage');

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
        console.log("Login Attempted");
    }
    finally{
        await browser.quit();
    }
}

runLoginTest();