const {By, until} = require('selenium-webdriver');
class ProductsPage{
    constructor(driver)
    {
        this.driver = driver;
        this.searchInput = By.id('search_product');
        this.searchButton = By.id('submit_search');
        this.productCards = By.css('.product-image-wrapper');
        this.addToCartButtons = By.css('.add-to-cart');
        this.continueShoppingButton = By.css('.close-modal');
    }

    async searchProduct(term){
        await this.driver.findElement(this.searchInput).sendKeys(term);
        let button = await this.driver.findElement(this.searchButton);
        await this.driver.executeScript('arguments[0].click();', button); 
    }

    async getProductsCount()
    {
        let products = await this.driver.findElements(this.productCards);
        return products.length;
    }

    async addProductToCart(index){
        let allButtons = await this.driver.findElements(this.addToCartButtons);

        let visibleButtons = [];
        let seenIds = new Set();
        for(let btn of allButtons){
            let displayed = await btn.isDisplayed();
            if(!displayed)
            {
                continue;
            }
            let id = await btn.getAttribute('data-product-id');
            if(seenIds.has(id))
            {
                continue;
            }
            seenIds.add(id);
            visibleButtons.push(btn);
        }
        let button = visibleButtons[index];
        let productId = await button.getAttribute('data-product-id');

        // Scroll into view and hover to trigger any CSS :hover-based visibility
        await this.driver.executeScript('arguments[0].scrollIntoView({block: "center"});', button);
        await this.driver.actions().move({origin: button}).perform();

        // Click via executeScript (bypasses interactability checks, but now the button is genuinely visible after hover)
        await this.driver.executeScript('arguments[0].click();', button);

        let continueBtn = await this.driver.wait(until.elementLocated(this.continueShoppingButton), 
        5000);
        await this.driver.executeScript('arguments[0].click();', continueBtn);

        await this.driver.wait(until.elementIsNotVisible(continueBtn), 5000);
    }
}

module.exports = ProductsPage;