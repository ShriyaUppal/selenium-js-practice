const {By, until} = require('selenium-webdriver');

class ContactPage {
    constructor(driver)
    {
        this.driver = driver;
        this.contactUsLink = By.css('a[href="/contact_us"]');
        this.nameInput = By.css('[data-qa="name"]');
        this.emailInput = By.css('[data-qa="email"]');
        this.subjectInput = By.css('[data-qa="subject"]');
        this.messageInput = By.css('[data-qa="message"]');
        this.submitButton = By.css('[data-qa="submit-button"]');
        this.successMessage = By.css('.status.alert.alert-success');
    }

    async goToContactUsForm(){
        let link = await this.driver.findElement(this.contactUsLink);
        await this.driver.executeScript('arguments[0].click();', link);
    }

    async fillContactForm(name, email, subject, message){
        await this.driver.findElement(this.nameInput).sendKeys(name);
        await this.driver.findElement(this.emailInput).sendKeys(email);
        await this.driver.findElement(this.subjectInput).sendKeys(subject);
        await this.driver.findElement(this.messageInput).sendKeys(message);
    }

    async submitContactForm()
    {
        let button = await this.driver.findElement(this.submitButton);
        await this.driver.executeScript('arguments[0].click();', button);

        let alert = await this.driver.wait(until.alertIsPresent(), 5000);
        await alert.accept();
    }

    async getSuccessMessage()
    {
        let successElement = await this.driver.wait(
            until.elementIsVisible(await this.driver.findElement(this.successMessage)),
            10000
        );
        return await successElement.getText();
    }
}

module.exports = ContactPage;