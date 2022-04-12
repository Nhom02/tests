const UIObject = require('../../components/mobile/UIObject');
const PageObject = require('../../components/mobile/PageObject');
const LEFT_MENU = 'Notification';
const LATEST_NOTIFICATION = '//*[@resource-id="com.hayylo.android.hayyloapp:id/title" and @index="1"]';
const BACK_ICON = '//*[@resource-id="com.hayylo.android.hayyloapp:id/close_back_image"]';


class NotificationAndroid extends PageObject {
    constructor(_driver){
        super(_driver, LEFT_MENU);
        this.driver = (_driver)? _driver: browser;
        this.latestNotification = new UIObject(LATEST_NOTIFICATION, this.driver);
        this.backBtn = new UIObject(BACK_ICON, this.driver);
    }

    getLatestNotification(){
        return this.latestNotification.getText();
    }

    clickLatestNotification(){
        this.latestNotification.click();
    }

    back(){
        this.backBtn.click();
    }

}

module.exports = NotificationAndroid;