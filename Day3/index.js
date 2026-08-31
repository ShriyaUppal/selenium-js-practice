const {Builder, By, until} = require('selenium-webdriver');
async function runTest()
{
    let browser = await new Builder().forBrowser('chrome').build();
    try{
        await browser.get('https://www.selenium.dev/documentation/');
        let title = await browser.getTitle();
        console.log(title);

        await browser.wait(until.elementsLocated(By.css('.nav-item')), 5000);
        let elements = await browser.findElements(By.css('.nav-item'));
        console.log(elements.length);

        for(let e1 of elements)
        {
            let text = await e1.getText();
            console.log(text); 
        }


    }
    finally{
        await browser.quit();    
    }
}

runTest();