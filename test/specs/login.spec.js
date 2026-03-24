import loginPage from "../pageobjects/login.page";

describe('Login scennarios', function () {

    beforeEach(async () => {
        await loginPage.open();
        await loginPage.menu('login').click();
    })
    it('Success login scenario', async function () {
        await expect(browser).toHaveTitle('QA Practice Site');
        await loginPage.login('qa_testers@qabrains.com', 'Password123');
        await expect(loginPage.validateSuccess).toHaveText('LOGIN SUCCESSFUL')
    })

    it('Get credentials from the site and login', async () => {
        const email = await loginPage.emailText.getText();
        const password = await loginPage.passwordText.getText();
        await loginPage.login(email, password);
        await expect(loginPage.validateSuccess).toHaveText('LOGIN SUCCESSFUL')
    })

    it('Ensure the show/hide functionality of password is working', async () => {
        const password = 'RANDOMPASSWORD';
        await loginPage.passwordTextBox.setValue(password)
        await expect(loginPage.passwordTextBox).toHaveAttribute('type', 'password');
        await loginPage.showOrHideButton.click();//SHOW
        await expect(loginPage.passwordTextBox).toHaveAttribute('type', 'text');
        await loginPage.showOrHideButton.click();//HIDE
        expect(await loginPage.passwordTextBox.getProperty('value')).toBe(password);
    })

    it('Login with invalid credentials', async function () {
        await loginPage.login('qa_testers@qa.com', 'Pass123'); //Invalid
        await loginPage.validateError.waitForDisplayed();
        await expect(loginPage.validateError).toBeDisplayed();
        await expect(loginPage.validateError).toHaveText('Your email and password both are invalid!');
    })
    it('Login with empty credentials', async function () {
        await loginPage.loginButton.click();
        await expect(loginPage.emailError).toBeDisplayed();
        await expect(loginPage.passwordError).toBeDisplayed();
        await expect(loginPage.emailError).toHaveText('Email is a required field');
        await expect(loginPage.passwordError).toHaveText('Password is a required field');
    })

})