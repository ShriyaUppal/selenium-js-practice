const {By} = require('selenium-webdriver');
class ProductsPage{
    constructor(driver)
    {
        this.driver = driver;
        this.searchInput = By.id('search_product');
        this.searchButton = By.id('submit_search');
        this.productCards = By.css('.product-image-wrapper');
        this.addToCartButtons = By.css('.add-to-cart');
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
}

module.exports = ProductsPage;