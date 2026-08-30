const {Builder, By, until} = require('selenium-webdriver');
const fs = require('fs');

async function runTest()
{
    let browser = await new Builder().forBrowser('chrome').build();

    try{
        await browser.get('https://www.selenium.dev/documentation/');
        let title = await browser.getTitle();
        console.log(title);

        let button = await browser.wait(until.elementLocated(By.css('[aria-label="Search"]')),
        1000
        );
        await browser.wait(until.elementIsVisible(button), 5000);
        await button.click();
        await new Promise(resolve => setTimeout(resolve, 2000)); // pauses 2 seconds
        console.log('Button find and clicked successfully');


        let searchBar = await browser.wait(until.elementLocated(By.id('docsearch-input')),
        1000);
        await browser.wait(until.elementIsVisible(searchBar), 5000);
        await new Promise(resolve => setTimeout(resolve, 2000)); // pauses 2 seconds
        await searchBar.click();
        await new Promise(resolve => setTimeout(resolve, 2000)); // pauses 2 seconds
        await searchBar.sendKeys('waits');
        await new Promise(resolve => setTimeout(resolve, 2000)); // pauses 2 seconds
        console.log("Typed waits into search bar");

        let image = await browser.takeScreenshot();
        fs.writeFileSync('search-result.png', image, 'base64');
        console.log('Screenshot saved');
    }

    finally{
        await browser.quit();
    }
}

runTest();