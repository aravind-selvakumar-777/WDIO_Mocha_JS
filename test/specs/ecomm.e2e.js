import ecommercePage from "../pageobjects/ecommerce.page"

describe('End to End scenario', function () {
    before(async () => {
        await ecommercePage.login('practice@qabrains.com', 'Password123');
    })
    beforeEach(async () => {
        await ecommercePage.openEcommerceDemo();
    })
    it('Add a product to cart and perform checkout', async () => {
        const products = ['Sample Trouser Name', 'Sample T-Shirt Name'];
        const addedProducts = await ecommercePage.addProductToCart(products);
        await ecommercePage.cartbutton.click();
        //IN CART PAGE
        await ecommercePage.validateCart(addedProducts);
        await ecommercePage.checkoutbutton.click();
        //Checkout: Your Information
        await ecommercePage.firstNameTextBox.setValue('Davy')
        await ecommercePage.lastNameTextBox.setValue('Jones')
        await ecommercePage.zipCodeTextBox.setValue('2134')
        await ecommercePage.continuebutton.click();

        //Final checkout page
        const total = ecommercePage.calculateTotal(addedProducts);
        await expect(ecommercePage.totalPrice).toHaveText(expect.stringContaining(total.toString()))
        await ecommercePage.finishButton.click();

        //Thank you page
        await expect(ecommercePage.thankYouMessage).toHaveText('Thank you for your order!'.toUpperCase())
    })
})