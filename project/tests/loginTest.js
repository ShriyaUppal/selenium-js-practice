const {Builder, By} = require('selenium-webdriver');
const {baseURL, testEmail, testPassword} = require('../config/config');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('../pages/LoginPage');
const {expect} = require('chai');

describe("Login Tests", function (){
    this.timeout(30000); //since selenium actions can be slow; Mocha default timeout is (2s) too short.
    let browser;
    

    before(async function(){
        let options = new chrome.Options();
        options.setPageLoadStrategy('eager');

        if(process.env.CI)
        {
            options.addArguments('--headless=new');
            options.addArguments('--no-sandbox');
            options.addArguments('--disable-dev-shm-usage');
        }
        browser = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
        await browser.manage().setTimeouts({pageLoad: 15000});
    })

    beforeEach(async function(){
        await browser.manage().deleteAllCookies();
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

    it('should log in successfully with valid credentials', async function(){
        await browser.get(baseURL);
        console.log('1 Home Page loaded successfully.');

          let loginElement = await browser.findElement(By.partialLinkText('Login'));          
          await loginElement.click();
          console.log('2. Clicked Login Element successfully ');


          let loginPage = new LoginPage(browser);
          await loginPage.login(testEmail, testPassword);
          console.log('3. Login submitted succcessfully');

          let isSuccesfull = await loginPage.isLoginSuccessfull();
          console.log('4. Checked success:', isSuccesfull);
          expect(isSuccesfull).to.be.true;
    })
})