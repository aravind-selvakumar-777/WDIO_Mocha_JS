import { expect } from '@wdio/globals'
import dragPage from '../pageobjects/drag.page';

describe('Drag and drop Scenarios', function () {
    beforeEach(async () => {
        await dragPage.open();
        await dragPage.menu('drag').click();
    })
    it('Drag and drop success case', async function () {
        await expect(dragPage.successMsg).not.toBeDisplayed(); //Checking if the element is not present initially
        await dragPage.dragAndDrop();
        await expect(dragPage.successMsg).toBeDisplayed();
        await expect(dragPage.successMsg).toHaveText('Dropped!');
    });


})