const PageObject = require('../../components/web/PageObject');
let UIObect = require('../../components/web/UIObject');

const USERNAME = "[name='username']";
const PASSWORD = "[name='passwd']"
const SIGNIN_NEXT = "#sign-in-next";
const SUBMIT_BTN = '#account-sign-in-button';

class Login{
    constructor(driver){
        this.browser = driver? driver: browser;
        this.usernameInput = new UIObect(USERNAME, this.browser)
        this.nextBtn = new UIObect(SIGNIN_NEXT, this.browser)
        this.passwordInput = new UIObect(PASSWORD, this.browser)
        this.submitBtn = new UIObect(SUBMIT_BTN, this.browser);
    }

    setUsername(username){
        this.usernameInput.setText(username)
        return this
    }

    setPassword(password){
        this.passwordInput.setText(password)
        return this
    }

    clickNext(){
        this.nextBtn.click();
        return this;
    }

    clickSubmit(){
        this.submitBtn.click();
        return this;
    }

}

module.exports = Login;