import { expect } from '@wdio/globals'
import registrationPage from '../pageobjects/registration.page';
import data from '../../test-data/testData_registration'
describe('Registration Scenarios', function () {

    beforeEach(async () => {
        await registrationPage.open();
        await registrationPage.menu('registration').click();
    })
    it('Registration success case', async function () {
        await registrationPage.signUpButton.waitForEnabled({ timeout: 5000, timeoutMsg: 'Sign Up button is not Enabled!' });
        await registrationPage.fillRegistrationDetails(data.name, data.country, data.account, data.email, data.password);
        await expect(registrationPage.validateSuccess).toHaveText('REGISTRATION SUCCESSFUL');
    });


})