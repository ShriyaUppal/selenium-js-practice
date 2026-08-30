//Step1: Import builder from selenium-webdriver package
const {Builder, By, until} = require('selenium-webdriver');

//Step2: Wrap everything in async function since we need await 
async function runTest(){
    //Step3: Build the driver - specify which browser to use
    let browser = await new Builder().forBrowser('chrome').build();

    try {
        //Step4: Navigate to the website
        await browser.get('https://www.selenium.dev/documentation/');
        
        //Step5: Get the title (await because it returns a promise).
        let title = await browser.getTitle();

        //Step6: Print it 
        console.log(title);

        //Find the element by class
        let element = await browser.wait(until.elementLocated(By.className('nav-link')),
        1
        );
        await browser.wait(until.elementIsVisible(element), 5000);
        await element.click();
        console.log("element clicked successfully");

        try{
        let element1 = await browser.wait(
        until.elementLocated(By.className('this-class-does-not-exist-12345')),
        2000
        );
        console.log("Element1 found");
        }
        catch(err){
            console.log("Not Found", err.message);
        }

    }finally {
        // Step 7: Always quit, even if something above throws an error
        await browser.quit();
    }
}

runTest();
