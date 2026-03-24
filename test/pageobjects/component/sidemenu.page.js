import Page from '../page';

export default class Sidemenu extends Page {

    menu(param) {
        const selectors = {
            login: '#login',
            registration: '#registration',
            forgotpassword: '#forgot-password',
            form: '#form-submission',
            drag: '#drag-drop',
            ecomm: '#ecommerce-site'

        }

        return $(selectors[param]);
    }

}

