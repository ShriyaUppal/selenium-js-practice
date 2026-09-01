const {Builder, By, until} = require('selenium-webdriver');

async function runTest()
{
    let browser = await new Builder().forBrowser('chrome').build();
    try{
        await browser.get('https://www.selenium.dev/selenium/web/formPage.html');
        let title = await browser.getTitle();
        console.log(title);

        let checkBox = await browser.findElement(By.id('checky'));

        let isChecked = await checkBox.isSelected();

        if(!isChecked)
        {
            await checkBox.click();
            console.log("Checkbox checked successfully");
            let isCheckedAfter = await checkBox.isSelected();
            console.log(`Checkbox state after click: ${isCheckedAfter}`);
        }
        else{
            console.log("Checkbox already checked");
        }


    }
    finally{
        await browser.quit();
    }
}

runTest();