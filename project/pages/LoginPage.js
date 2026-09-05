const {By} = require('selenium-webdriver');

class LoginPage{
    constructor(driver)
    {
        this.driver = driver;
        this.emailInput = By.css('[data-qa="login-email"]');
        this.passwordInput = By.css('[data-qa="login-password"]');
        this.loginButton = By.css('[data-qa="login-button"]');
    }

    async login(email, password){
        await this.driver.findElement(this.emailInput).sendKeys(email);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        let button = await this.driver.findElement(this.loginButton);
        await this.driver.executeScript('arguments[0].click();', button);
    }
}

module.exports = LoginPage;