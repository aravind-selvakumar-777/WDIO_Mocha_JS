import { $ } from '@wdio/globals'
import Page from './page.js';
import Sidemenu from './component/sidemenu.page.js';


class LoginPage extends Sidemenu {
    get emailTextBox() {
        return $('#email');
    }

    get passwordTextBox() {
        return $('#password');
    }

    get loginButton() {
        return $('button=Login');
    }
    get validateSuccess() {
        return $('.success-msg h2');
    }

    get emailText() {
        return $('#guide-lines p b');
    }
    get passwordText() {
        return $('#guide-lines p:nth-child(2) b');
    }
    get showOrHideButton() {
        return $('.form-group:nth-child(2) button');
    }
    get validateError() {
        return $('.toaster');;
    }
    get emailError() {
        return $('.form-group:nth-child(1) p');;
    } get passwordError() {
        return $('.form-group:nth-child(2) p');;
    }

    async login(email, password) {
        await this.emailTextBox.setValue(email);
        await this.passwordTextBox.setValue(password);
        await this.loginButton.click();
    }

    open() {
        return super.open();
    }
}

export default new LoginPage();
