const {Builder, By, until} = require('selenium-webdriver');
const {Select} = require('selenium-webdriver/lib/select');

async function runTest(){
    let browser = await new Builder().forBrowser('chrome').build(); 
    try{
        await browser.get('https://www.selenium.dev/selenium/web/formPage.html');
        let title = await browser.getTitle();
        console.log(title);

        let element = await browser.findElement(By.name('selectomatic'));
        let select = new Select(element);
        let options = await select.getOptions();
        let randomIndx = Math.floor(Math.random() * options.length);

        await select.selectByIndex(randomIndx);
        let selectedOption = await select.getFirstSelectedOption();
        let selectedText = await selectedOption.getText();
        console.log(`Selected: ${selectedText}`);

    }
    finally{
        await browser.quit();
    }
}
runTest();