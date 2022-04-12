const UIObject = require('../../components/mobile/UIObject');
const PageObject = require('../../components/mobile/PageObject');
const LEFT_MENU = 'Invite People';

const ADD_SOME_ONE = '//XCUIElementTypeButton[@name="icon plus"]';
const NAME = 'value == "Name"';
const MOBILE_NUMBER = 'value == "Mobile Number"';
const INVITE_BTN = '//XCUIElementTypeButton[@name="INVITE"]';

class InviteAndroid extends PageObject {
    constructor(_driver){
        super(_driver, LEFT_MENU);
        this.driver = (_driver)? _driver: browser;
        this.addSomeOneBtn = new UIObject(ADD_SOME_ONE, this.driver);
        this.nameInput = new UIObject(`-ios predicate string:${NAME}`, this.driver);
        this.mobileNumberInput = new UIObject(`-ios predicate string:${MOBILE_NUMBER}`, this.driver);
        this.inviteBtn = new UIObject(INVITE_BTN, this.driver);
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