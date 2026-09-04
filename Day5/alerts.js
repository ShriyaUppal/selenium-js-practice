const {Builder, By, until} = require('selenium-webdriver');

async function runTest()
{
    let browser = await new Builder().forBrowser('chrome').build();
    try{
        await browser.get('https://www.selenium.dev/selenium/web/alerts.html');
        let title = await browser.getTitle();
        console.log(title);

        let alertBtn = await browser.findElement(By.id('alert'));
        await alertBtn.click();
        console.log('Button Clicked to trigger alert');

        await browser.wait(until.alertIsPresent());
        let alert = await browser.switchTo().alert();
        let text = await alert.getText();
        console.log(text);
        await alert.accept();
        }
    finally{
        await browser.quit();
    }
}

runTest();