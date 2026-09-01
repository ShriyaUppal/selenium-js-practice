const {Builder, By, until} = require('selenium-webdriver');

async function runTest()
{
    let browser = await new Builder().forBrowser('chrome').build();
    try{
        await browser.get('https://www.selenium.dev/selenium/web/formPage.html');
        let title = await browser.getTitle();
        console.log(title);

        let elements = await browser.findElements(By.name('snack'));
        console.log(`Found ${elements.length} radio buttons`);
        let randomIndex = Math.floor(Math.random() * elements.length);
        let chosenValue = elements[randomIndex]; 
        let value = await chosenValue.getAttribute('value');
        await chosenValue.click();
        console.log(`Selected ${value} option`);
    }
    finally{
        await browser.quit();
    }
}

runTest();