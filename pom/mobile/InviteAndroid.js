const UIObject = require('../../components/mobile/UIObject');
const PageObject = require('../../components/mobile/PageObject');
const LEFT_MENU = 'Invite People';

const ADD_SOME_ONE = 'new UiSelector().text("Add someone").className("android.widget.TextView")';
const NAME = 'new UiSelector().text("Name").className("android.widget.EditText")';
const MOBILE_NUMBER = 'new UiSelector().text("Mobile Number").className("android.widget.EditText")';
const INVITE_BTN = 'new UiSelector().text("INVITE").className("android.widget.Button")';

class InviteAndroid extends PageObject {
    constructor(_driver){
        super(_driver, LEFT_MENU);
        this.driver = (_driver)? _driver: browser;
        this.addSomeOneBtn = new UIObject(`android=${ADD_SOME_ONE}`, this.driver);
        this.nameInput = new UIObject(`android=${NAME}`, this.driver);
        this.mobileNumberInput = new UIObject(`android=${MOBILE_NUMBER}`, this.driver);
        this.inviteBtn = new UIObject(`android=${INVITE_BTN}`, this.driver);
    }

    clickAddSomeOne(){
        this.addSomeOneBtn.click();
        return this;
    }

    setName(name){
        this.nameInput.setText(name);
        return this;
    }

    setMobileNumber(mobile){
        this.mobileNumberInput.setText(mobile);
        return this;
    }

    clickInvite(){
        this.inviteBtn.click();
        return this;
    }

}

module.exports = InviteAndroid;