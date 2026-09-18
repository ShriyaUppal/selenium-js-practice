const{By, until} = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver){
        this.driver = driver;
        this.proceedToCheckoutButton = By.css('.check_out');
        this.placeOrderButton = By.css('a[href="/payment"]');
        this.nameOnCardInput = By.css('[data-qa="name-on-card"');
        this.cardNumberInput = By.css('[data-qa="card-number"]')
        this.cvcInput = By.css('[data-qa="cvc"]');
        this.expiryMonthInput = By.css('[data-qa="expiry-month"]');
        this.expiryYearInput = By.css('[data-qa="expiry-year"]');
        this.payButton = By.css('[data-qa="pay-button"]');
        this.successMessage = By.id('success_message');
    }

    async proceedToCheckout()
    {
        let button = await this.driver.findElement(this.proceedToCheckoutButton);
        await this.driver.executeScript('arguments[0].click();', button);
    }

    async placeOrder()
    {
        let button = await this.driver.findElement(this.placeOrderButton);
        await this.driver.executeScript('arguments[0].click();', button);
    }

    async fillPaymentDetails(name, carNumber, cvc, expMonth, expYear){
        await this.driver.findElement(this.nameOnCardInput).sendKeys((name));
        await this.driver.findElement(this.cardNumberInput).sendKeys(carNumber);
        await this.driver.findElement(this.cvcInput).sendKeys(cvc);
        await this.driver.findElement(this.expiryMonthInput).sendKeys(expMonth);
        await this.driver.findElement(this.expiryYearInput).sendKeys(expYear);
    }

    async payAndConfirm(){
        let button = await this.driver.findElement(this.payButton);
        await this.driver.executeScript('arguments[0].click();', button);
    }

    async isOrderSuccessfull(){
      await this.driver.wait(async ()=>{
        let url = await this.driver.getCurrentUrl();
        return url.includes('/payment_done/');
      }, 10000);
      let currentUrl = await this.driver.getCurrentUrl();
      return currentUrl.includes('/payment_done/'); 
    }
}

module.exports = CheckoutPage;