const UIObject = require('./UIObject');
const ICON_MENU = '//XCUIElementTypeButton[@name="icon bar"]';
const BACK = '//XCUIElementTypeButton[@name="icon back"]';

class NavAndroid{
    constructor(_driver){
        this.driver = _driver? _driver: browser;
        this.leftNav = {
            'Feed': '//XCUIElementTypeStaticText[@name="Feed"]',
            'Schedule': '//XCUIElementTypeStaticText[@name="Schedule"]',
            'Request Something': '//XCUIElementTypeStaticText[@name="Request Something"]',
            'Notifications': '//XCUIElementTypeStaticText[@name="Notifications"]',
            'Invite People': '//XCUIElementTypeStaticText[@name="Invite People"]',
            'Sign out': '//XCUIElementTypeStaticText[@name="Sign out"]',
        }
        this.backBtn = new UIObject(BACK, this.driver);
        this.menuBtn = new UIObject(ICON_MENU, this.driver);
    }
    goToLeftNav(leftItem=""){
        // open menu
        new UIObject(ICON_MENU, this.driver).click();

        // select item
        new UIObject(this.leftNav[leftItem], this.driver).click();
    }

    back(){
        this.backBtn.click();
    }

    isMenuDisplayed(){
        return this.menuBtn.isDisplayed();
    }

    clickMenu(){
        this.menuBtn.click();
    }
}

module.exports = NavAndroid;