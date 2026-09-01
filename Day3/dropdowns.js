const {Builder, By, until} = require('selenium-webdriver')
const {Select} = require('selenium-webdriver/lib/select');


async function runTest()
{
    const browser = await new Builder().forBrowser('chrome').build();

    try{
        await browser.get('https://www.selenium.dev/selenium/web/formPage.html');
        let title = await browser.getTitle();
        console.log(title);
        
        let dropdownElement = await browser.findElement(By.id('redirect'));
        let select = new Select(dropdownElement);
        
        await select.selectByVisibleText('One');
        
        let selectedOption = await select.getFirstSelectedOption();
        let selectedText = await selectedOption.getText();
        console.log(`Selected: ${selectedText}`);

    }
    finally{
        await browser.quit();
    }
}

runTest();
