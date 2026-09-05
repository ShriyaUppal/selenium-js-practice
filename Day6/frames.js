const { Builder, By, until } = require('selenium-webdriver');

async function runTest() {
    let browser = await new Builder().forBrowser('chrome').build();

    try {
        await browser.get('https://www.selenium.dev/selenium/web/iframes.html');
        let title = await browser.getTitle();
        console.log(title);


        let iframe = await browser.findElement(By.id('iframe1'));
        await browser.switchTo().frame(iframe);
        let emailField = await browser.findElement(By.id('email'));
        await emailField.sendKeys('shriyauppal1615@gmail.com');

        await browser.switchTo().defaultContent();
        let titleAfter = await browser.getTitle();
        console.log(titleAfter);
    }
    finally {
        await browser.quit();
    }
}
runTest();