import Sidemenu from "./component/sidemenu.page";

class EcommercePage extends Sidemenu {
    //LOCATORS
    get cartbutton() {
        return $('[role="button"]');
    }
    get cartEmptyMessage() {
        return $('h1')
    }
    get visitDemoSiteLink() {
        return $('a.text-blue-600')
    }
    get emailTextBox() {
        return $('#email');
    }

    get passwordTextBox() {
        return $('#password');
    }
    get loginButton() {
        return $('button=Login');
    }
    get orderByDropdown() {
        return $('[role="combobox"]');
    }
    get allproductPrice() {
        return $$('.products .justify-between span');
    }
    get allproductName() {
        return $$('.products a.text-lg');
    }
    get favoritesButton() {
        return $('.products button');
    }
    get notification() {
        return $('[aria-live="polite"] ol');
    }
    get addToCartButton() {
        return $$('.products .justify-between button');
    }
    get cartCounter() {
        return $('[role="button"] span')
    }
    get cartItemNames() {
        return $$('.cart-list .justify-between h3');
    }
    get cartItemPrices() {
        return $$('.cart-list .justify-between div:nth-child(3) p.font-bold');
    }
    get checkoutbutton() {
        return $('button=Checkout')
    }
    get firstNameTextBox() {
        return $$('input:nth-of-type(1)')[1]
    }
    get lastNameTextBox() {
        return $$('input:nth-of-type(1)')[2]
    }
    get zipCodeTextBox() {
        return $$('input:nth-of-type(1)')[3]
    }
    get continuebutton() {
        return $('button=Continue')
    }
    get totalPrice() {
        return $('.group:nth-of-type(3) p:nth-of-type(3)');
    }
    get finishButton() {
        return $('button=Finish')
    }
    get thankYouMessage() {
        return $('#checkout-complete div h3');
    }
    get addQuantity() {
        return $('button=+');
    }
    get subtractQuantity() {
        return $('button=-');
    }
    get cartTotal() {
        return $$('#cart .text-center p.font-oswald')[1]
    }
    //ACTIONS

    async login(email, password) {
        await this.openEcommerceDemo();
        await this.emailTextBox.setValue(email);
        await this.passwordTextBox.setValue(password);
        await this.loginButton.click();
        //Ensuring cookie gets stored
        await browser.waitUntil(async () => {
            const val = await browser.getCookies(["ecom_token"]);
            return val.length > 0
        })
    }

    async openEcommerceDemo() {
        await this.open();
        await this.menu('ecomm').click();
        await this.visitDemoSiteLink.click();
    }
    async selectOrderByItem(item) {
        const options = {
            asc: 'asc',
            desc: 'dsc',
            price_asc: 'low',
            price_desc: 'high'
        }
        const key = item.toLowerCase();
        await this.orderByDropdown.click();
        await $(`[data-value=${options[key]}]`).click();
        await expect(this.orderByDropdown).not.toHaveText('Select...');// Adding this as a wait
    }

    async getAllValues(selection = 'products') {
        let items = this.allproductName;
        if (selection != 'products') {
            items = this.allproductPrice;
            return await items.map(async el => {
                const text = await el.getText()
                return this.removeDollarSign(text)
            });
        }
        return await items.map(async el => await el.getText());
    }
    sortArray(array = [], value = 'asc') {
        const logic = {
            asc: function (arr) { return [...arr].sort() },
            desc: function (arr) { return [...arr].sort().reverse() },
            asc_num: function (arr) { return [...arr].sort((a, b) => a - b) },
            desc_num: function (arr) { return [...arr].sort((a, b) => b - a) }
        }
        return logic[value](array)
    }
    async toggleFavorite() {
        await this.favoritesButton.click();
    }

    async waitForNotification(message) {
        await this.notification.waitForDisplayed();
        await expect(this.notification).toHaveText(message);
        await this.notification.waitForDisplayed({ reverse: true });
    }

    async addProductToCart(products) {
        const addedProducts = [];

        await browser.waitUntil(async () => {
            return (await this.allproductName.length) > 0;
        });

        for (let product of products) {
            for (let i = 0; i < await this.allproductName.length; i++) {
                const currentProductName = await this.allproductName[i].getText();
                if (currentProductName === product) {
                    await this.addToCartButton[i].click();
                    const price = await this.allproductPrice[i].getText();
                    addedProducts.push({ name: product, price });
                    break;
                }
            }
        }
        return addedProducts;
    }
    async validateCart(itemDetails) {
        await browser.waitUntil(async () => {
            return (await this.cartItemNames.length) > 0
        })
        for (let i = 0; i < await this.cartItemNames.length; i++) {
            const currentProductName = await this.cartItemNames[i].getText();
            const currentProductPrice = await this.cartItemPrices[i].getText();
            expect(currentProductName).toEqual(itemDetails[i].name);
            expect(currentProductPrice).toEqual(itemDetails[i].price);
        }
    }
    removeDollarSign(str) {
        return parseFloat(Number(str.split('$')[1]).toFixed(2))
    }
    calculateTotal(items) {
        const subtotal = items.reduce((acc, cur) => {
            cur = this.removeDollarSign(cur.price)
            return acc + cur
        }, 0)

        const expectedTax = parseFloat((subtotal * 0.05).toFixed(2));
        return expectedTax + subtotal;
    }
}

export default new EcommercePage();