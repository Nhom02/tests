const UIObject = require('../../components/mobile/UIObject');
const PageObject = require('../../components/mobile/PageObject');
const LEFT_MENU = 'Notifications';
const LATEST_NOTIFICATION = '//XCUIElementTypeApplication//XCUIElementTypeTable//XCUIElementTypeCell//XCUIElementTypeStaticText[1]';


class NotificationAndroid extends PageObject {
    constructor(_driver){
        super(_driver, LEFT_MENU);
        this.driver = (_driver)? _driver: browser;
        this.latestNotification = new UIObject(LATEST_NOTIFICATION, this.driver);
    }

    getLatestNotification(){
        return this.latestNotification.getText();
    }

    clickLatestNotification(){
        this.latestNotification.click();
    }

}

module.exports = NotificationAndroid;