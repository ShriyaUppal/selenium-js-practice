const {Builder, By, until, Actions} = require('selenium-webdriver');

async function runTest()
{
    let browser = await new Builder().forBrowser('chrome').build();

    try{
        await browser.get('https://www.selenium.dev/selenium/web/mouse_interaction.html');
        let title = await browser.getTitle();
        console.log(title);

        let beforeStatus = await browser.findElement(By.id('move-status'));
        console.log(`Status before hover: ${await beforeStatus.getText()}`);

        let hoverElement = await browser.findElement(By.id('hover'));
        await browser.actions().move({origin: hoverElement}).perform();

        let afterStatus = await browser.findElement(By.id('move-status'));
        console.log(`Status after hover: ${await afterStatus.getText()}`);
    }
    finally{
        await browser.quit();
    }
}

runTest();