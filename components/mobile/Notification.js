const COUNT_NOTIFICATION = '';
const NOTIFICATION_CONTENT = "//*[@resource-id='android:id/status_bar_latest_event_content']";
const NOTIFICATION_HEADER = "//*[@resource-id='android:id/notification_header']";
const ALL_NOTIFICATION_TITLE = "//*[@resource-id='android:id/title']";
let notificationTitle = "//*[@resource-id='android:id/title' and contains(@text, '%s')]";
const NOTIFICATION_TEXT = "//*[@resource-id='android:id/text']";
const UIObject = require('./UIObject');

class Notification{
    // Just support for Android until now

    static openNotification(driver){
        driver.openNotifications();
    }

    static getAllNotification(driver){
        let notificationElements = [];
        let elements = new UIObject(ALL_NOTIFICATION_TITLE, driver).getElements();
        return elements;
    }

    static getNotification(title, driver){
        let notificationTitleSelector = notificationTitle.replace('%s', title);
        return new UIObject(notificationTitleSelector, driver).getElement();
    }

    static clickNotification(title, driver){
        let notificationTitleSelector = notificationTitle.replace('%s', title);
        new UIObject(notificationTitleSelector, driver).click();
    }

    static checkIfNotificationDisplayed(element, maxWait, amount = 0, driver) {
        if ((!element.isExisting() || !element.isDisplayed()) && amount <= maxWait) {
            driver.pause(5000);
            this.checkIfNotificationDisplayed(element, maxWait, amount + 1, driver);
        } else if (amount > maxWait) {
            throw new Error(`Notification could not be found or is not visible.`);
        }
    }
}

module.exports = Notification;