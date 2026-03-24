import Sidemenu from "./component/sidemenu.page";

class RegistrationPage extends Sidemenu {

    get nameTextBox() {
        return $('#name');
    }

    get countryDropdown() {
        return $('#country');
    }
    get accountDropdwon() {
        return $('#account');
    }

    get passwordTextBox() {
        return $('#password');
    }
    get emailTextBox() {
        return $('#email');
    }

    get confirmPasswordTextBox() {
        return $('#confirm_password');
    }
    get signUpButton() {
        return $('button=Signup');
    }

    get validateSuccess() {
        return $('.success-msg h2');
    }
    open() {
        return super.open();
    }
    async fillRegistrationDetails(name, country, account, mail, pass) {
        await Promise.all([
            this.nameTextBox.setValue(name),
            this.countryDropdown.selectByAttribute('value', country),
            this.accountDropdwon.selectByAttribute('value', account),
            this.emailTextBox.setValue(mail),
            this.passwordTextBox.setValue(pass),
            this.confirmPasswordTextBox.setValue(pass),
        ])
        await this.signUpButton.click()
    }

}

export default new RegistrationPage();