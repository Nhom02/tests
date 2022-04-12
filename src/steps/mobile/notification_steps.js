const {Given, Then, When} = require('cucumber');
const Notification = require('../../../components/mobile/Notification');
const NotificationWorkFlow = require('../../../workflows/mobile/NotificationWorkFlow');
const _driver = (typeof myDevice !== 'undefined')? myDevice:browser;
const NotificationWF = new NotificationWorkFlow(_driver);
var assert = require('assert');

Then('The post has to be displayed on the {string} mobile Notification Page', (type)=>{
    NotificationWF.NotificationPage.goToPage();
    console.log(NotificationWF.NotificationPage.getLatestNotification());
    expectedLog = NotificationWF.NotificationPage.getLatestNotification();
    assert.ok(expectedLog.includes('has shared a post, please review') || expectedLog.includes('has shared an update. Please have a look on the feed'), "has shared a post, please review");
});

Then('Push notification is present in mobile device', ()=>{
    console.log("Check push notification");
    if(!_driver.isAndroid){
        console.log("Push notification test just work for Android platform only. IOS is not supported for this type for verification");
        return;
    }
    _driver.openNotifications();
    let notificationElement = Notification.getNotification('hayylo', _driver);
    Notification.checkIfNotificationDisplayed(notificationElement, 30, 1, _driver);
    console.log("Click back button");
    _driver.pressKeyCode(4);
    // _driver.pause(5000);
    // notificationElement.click();
});
