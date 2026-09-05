const {Builder, By, until, Actions} = require('selenium-webdriver');

async function runTest(){
    let browser = await new Builder().forBrowser('chrome').build();

    try{
        await browser.get('https://www.selenium.dev/selenium/web/mouse_interaction.html');
        let title = await browser.getTitle();
        console.log(title);
        
        let dragElement = await browser.findElement(By.id('draggable'));
        let dropElement = await browser.findElement(By.id('droppable'));
        
        let beforeDropStatus = await browser.findElement(By.id('drop-status'));
        console.log(`Status before drop: ${await beforeDropStatus.getText()}`);

 
        await browser.actions().dragAndDrop(dragElement, dropElement).perform();

        let afterDropStatus = await browser.findElement(By.id('drop-status'));
        console.log(`Status after drop: ${await afterDropStatus.getText()}`);
    }
    finally{
        await browser.quit();
    }
}

runTest();