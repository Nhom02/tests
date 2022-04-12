const UIObject = require('./UIObject');
const ICON_MENU = '//*[@resource-id="com.hayylo.android.hayyloapp:id/icon_menu"]';
const BACK = '//*[@resource-id="com.hayylo.android.hayyloapp:id/ivBack"]';


class NavAndroid{
    constructor(_driver){
        this.driver = _driver? _driver: browser;
        this.leftNav = {
            'Schedule': 'new UiSelector().text("Schedule").className("android.widget.TextView")',
            'Assignments': 'new UiSelector().text("Assignments").className("android.widget.TextView")',
            'Feed': 'new UiSelector().text("Feed").className("android.widget.TextView")',
            'My Profile': 'new UiSelector().text("My Profile").className("android.widget.TextView")',
            'Availability': 'new UiSelector().text("Availability").className("android.widget.TextView")',
            'Notification': 'new UiSelector().text("Notifications").className("android.widget.TextView")',
            'Settings': 'new UiSelector().text("Settings").className("android.widget.TextView")',
            'Help': 'new UiSelector().text("Help").className("android.widget.TextView")',
            'Sign out': 'new UiSelector().text("Sign out").className("android.widget.TextView")',
            'Request Something': 'new UiSelector().text("Request Something").className("android.widget.TextView")',
            'Invite People': 'new UiSelector().text("Invite People").className("android.widget.TextView")'
        }
        this.backBtn = new UIObject(BACK, this.driver);
        this.menuBtn = new UIObject(ICON_MENU, this.driver);
    }
    goToLeftNav(leftItem=""){
        // open menu
        this.menuBtn.click();

        this.driver.pause(2000);
        // select item
        new UIObject(`android=${this.leftNav[leftItem]}`, this.driver).click();
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