import ecommercePage from "../pageobjects/ecommerce.page"
describe('Scenarios related to Ecommerce', function () {
    before(async () => {
        await ecommercePage.login('student@qabrains.com', 'Password123');
    })
    beforeEach(async () => {
        await ecommercePage.openEcommerceDemo();
    })
    it('Verify that the cart is empty', async () => {
        await ecommercePage.cartbutton.click();
        await expect(ecommercePage.cartEmptyMessage).toHaveText('Your cart is empty.')
    })

    it('Verify cart counter', async () => {
        const firstAddToCartButton = ecommercePage.addToCartButton[0];
        const secondAddToCartButton = ecommercePage.addToCartButton[1];
        await firstAddToCartButton.click();
        await expect(ecommercePage.cartCounter).toHaveText('1');
        await secondAddToCartButton.click();
        await expect(ecommercePage.cartCounter).toHaveText('2');

        //REMOVE FROM CART
        await firstAddToCartButton.click();
        await expect(ecommercePage.cartCounter).toHaveText('1');
        //CLEANUP
        await secondAddToCartButton.click();

    })
    it('Verify cart notifications', async () => {
        const firstAddToCartButton = ecommercePage.addToCartButton[0];
        await firstAddToCartButton.click();
        await ecommercePage.waitForNotification('Added to cart');

        //REMOVE FROM CART
        await firstAddToCartButton.click();
        await ecommercePage.waitForNotification('Removed from cart');
    })

    it('Verify "Add to cart" button text changes', async () => {
        const firstAddToCartButton = ecommercePage.addToCartButton[0];
        await expect(firstAddToCartButton).toHaveText('Add to cart');
        await firstAddToCartButton.click();
        await expect(firstAddToCartButton).toHaveText('Remove from cart');
        //CLEANUP
        await firstAddToCartButton.click();
    })
    it('Quantity button validation in cart page', async () => {
        const products = ['Sample Trouser Name'];
        const addedProducts = await ecommercePage.addProductToCart(products);
        const unitPrice = ecommercePage.removeDollarSign(addedProducts[0].price);
        await ecommercePage.cartbutton.click();
        await expect(ecommercePage.cartTotal).toHaveText(expect.stringContaining(unitPrice.toString()));
        await ecommercePage.addQuantity.click(); //increase quantity
        await ecommercePage.addQuantity.click(); //twice
        const expectedTotalTriple = (unitPrice * 3).toString();
        await expect(ecommercePage.cartTotal).toHaveText(expect.stringContaining(expectedTotalTriple));
        await ecommercePage.subtractQuantity.click();
        const expectedTotalDouble = (unitPrice * 2).toString();
        await expect(ecommercePage.cartTotal).toHaveText(expect.stringContaining(expectedTotalDouble));
    })

    describe('Ecommerce Scenarios related to Order By items', function () {
        it('Price, low to High', async () => {
            await ecommercePage.selectOrderByItem('price_asc');
            const pricesArray = await ecommercePage.getAllValues('price');
            const sorted = ecommercePage.sortArray(pricesArray, 'asc_num')
            expect(pricesArray).toEqual(sorted);

        })
        it('Price, high to low', async () => {
            await ecommercePage.selectOrderByItem('price_desc');
            const pricesArray = await ecommercePage.getAllValues('price');
            const sorted = ecommercePage.sortArray(pricesArray, 'desc_num')
            expect(pricesArray).toEqual(sorted);
        })
        /*
        Commenting since ascending function in website has some issue
        it('Product name, ascending', async () => {
            await ecommercePage.selectOrderByItem('asc');
            const productsArray = await ecommercePage.getAllValues();
            const sorted = ecommercePage.sortArray(productsArray,'asc')
            expect(productsArray).toEqual(sorted);

        })
        Commenting since descending function in website has some issue
        it('Product name, descending', async () => {
            await ecommercePage.selectOrderByItem('desc');
            const productsArray = await ecommercePage.getAllValues();
            const sorted = ecommercePage.sortArray(productsArray,'desc')
            expect(productsArray).toEqual(sorted);
        })
        */
    })
    describe('Ecommerce Scenarios related to Favorite button toggle', function () {
        it('Verify add to favorites notifications on button toggle', async () => {
            await ecommercePage.toggleFavorite();
            await ecommercePage.waitForNotification('Added to favorites');
            await ecommercePage.toggleFavorite();
            await ecommercePage.waitForNotification('Removed from favorites');
        })

        it('Verify add to favorites, button style changes', async () => {
            await ecommercePage.toggleFavorite();
            await expect(ecommercePage.favoritesButton).toHaveAttribute('style', 'color: rgb(255, 0, 0);')
            await ecommercePage.toggleFavorite();
            await expect(ecommercePage.favoritesButton).toHaveAttribute('style', 'color: rgb(34, 34, 34);')
        })
    })

}) 