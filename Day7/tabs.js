const {Builder, By, until} = require('selenium-webdriver');

async function runTabsTest()
{
    let browser = await new Builder().forBrowser('chrome').build();
    try{
        await browser.get('https://www.selenium.dev/selenium/web/window_switching_tests/page_with_frame.html');
        let title = await browser.getTitle();
        console.log(`Original tab title is: ${title}`);

        let originalWindow = await browser.getWindowHandle();
        console.log(originalWindow);

        let element = await browser.findElement(By.linkText('Open new window'));
        await element.click();
        
        let allWindows = await browser.getAllWindowHandles();
        console.log(`Total windows are: ${allWindows.length}`);
        for(let handle of allWindows)
        {
            if(handle !== originalWindow)
            {
                await browser.switchTo().window(handle);
                let newTitle = await browser.getTitle();
                console.log(`New Title is: ${newTitle}`);
                break;
            }
        }
        await browser.switchTo().window(originalWindow);
        let afterSwitchTitle = await browser.getTitle();
        console.log(`After switch original title is: ${afterSwitchTitle}`);
    }
    finally{
        await browser.quit();
    }
}
runTabsTest();