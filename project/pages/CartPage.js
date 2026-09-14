const {By} = require('selenium-webdriver');

class CartPage{
    constructor(driver)
    {
        this.driver = driver;
        this.cartNavLink = By.css('a[href="/view_cart"]');
        this.emptyCartMsg = By.id('empty_cart');
        this.emptyCartLink = By.css('#empty_cart a[href="/products"]');
        this.cartRows = By.css('#cart_info_table tbody tr');
        this.productName = By.css('.cart_description h4 a');
        this.productPrice = By.css('.cart_price p');
        this.productQuantity = By.css('.cart_quantity button');
        this.productTotal = By.css('.cart_total_price');
        this.deleteButtons = By.css('.cart_quantity_delete');
    }

    async goToCart()
    {
        let cartLink = await this.driver.findElement(this.cartNavLink);
        await this.driver.executeScript('arguments[0].click();', cartLink);

        await this.driver.wait(async () => {
        let rows = await this.driver.findElements(this.cartRows);
        if (rows.length > 0) return true;
        let emptyElements = await this.driver.findElements(this.emptyCartMsg);
        if (emptyElements.length > 0) {
            return await emptyElements[0].isDisplayed();
        }
        return false;
    }, 10000);
    }

    async isCartEmpty()
    {
        let emptyElements = await this.driver.findElements(this.emptyCartMsg);
        if(emptyElements.length === 0)
        {
            return false;
        }
        return await emptyElements[0].isDisplayed();
    }

    async clickHereToBuyProducts()
    {
        let hereLink = await this.driver.findElement(this.emptyCartLink);
        await this.driver.executeScript('arguments[0].click();', hereLink);
    }

    async getCartItemCount()
    {
        let rows = await this.driver.findElements(this.cartRows);
        return rows.length;
    }

    async getProductNames()
    {
        let elements = await this.driver.findElements(this.productName);
        let names = [];
        for(let e1 of elements)
        {
            names.push(await e1.getText());
        }
        return names;
    }

    async getLineTotal(index)
    {
        let totals = await this.driver.findElements(this.productTotal);
        let text = await totals[index].getText();
        return parseInt(text.replace(/[^0-9]/g, ''));
    }

    async getSumOfLineTotals(){
        let totals = await this.driver.findElements(this.productTotal);
        let sum = 0;
        for(let e1 of totals)
        {
            let text = await e1.getText();
            sum += parseInt(text.replace(/[^0-9]/g, ''));
        }
        return sum;
    }

    async getQuantity(index)
    {
        let buttons = await this.driver.findElements(this.productQuantity);
        let text = await buttons[index].getText();
        return parseInt(text);
    }
}

module.exports = CartPage;