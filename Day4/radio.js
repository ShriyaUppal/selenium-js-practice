const {Builder, By, until} = require('selenium-webdriver');

async function runTest()
{
    let browser = await new Builder().forBrowser('chrome').build();
    try{
        await browser.get('https://www.selenium.dev/selenium/web/formPage.html');
        let title = await browser.getTitle();
        console.log(title);

        let radioButton = await browser.findElement(By.name('snack'));
        let isClicked = await radioButton.isSelected();
        if(!isClicked)
        {
            await radioButton.click();
            console.log("Radio Button clicked successfully");
            let isSelectedAfter = await radioButton.isSelected();
            console.log(`Radio Button state after click: ${isSelectedAfter}`);
        } 
    }
    finally{
        await browser.quit();
    }
}

runTest();