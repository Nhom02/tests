const {Given, Then, When} = require('cucumber');
const NotificationWorkFlow = require('../../../workflows/web/NotificationWorkFlow');
const ActionWorkFlow = require('../../../workflows/web/ActionWorkFlow');
const fs = require("fs");
const assert = require('assert');
const scope = require('../../hooks/scope');

When('I click on assigned action notification', ()=>{
    NotificationWorkFlow.openBellNotification();
    NotificationWorkFlow.goToAssignedAction();
});

When('I get number of notification bell', ()=>{
    NotificationWorkFlow.NotificationPage.waitForSpinerGone();
    scope.context.tempData['numberOfNotification']  = NotificationWorkFlow.NotificationPage.getCountNotification();
});

When('I get notification send date', ()=>{
    NotificationWorkFlow.openBellNotification();
    const notificationSendDateAll = NotificationWorkFlow.NotificationPage.getAllSendDate();
    scope.context.tempData['notificationSendDateAll'] = notificationSendDateAll;
    scope.context.tempData['notificationSendDate']  = NotificationWorkFlow.NotificationPage.getSendDateOfFirstItem();
});

When('I click on first notification', ()=>{
    NotificationWorkFlow.openBellNotification();
    NotificationWorkFlow.NotificationPage.clickNotificationFirstItem();
    NotificationWorkFlow.NotificationPage.waitForSpinerGone();
    new ActionWorkFlow(browser).ActionPage.clickCloseEditAction();
});

When('I click on mark as read notification', ()=>{
    NotificationWorkFlow.openBellNotification();
    NotificationWorkFlow.NotificationPage.clickMarkAsRead();
});


When('I click on view all notification message', ()=>{
    NotificationWorkFlow.openBellNotification();
    NotificationWorkFlow.NotificationPage.clickViewAllNotification();
});

Then('The notification should be removed from the notification list', ()=>{
    NotificationWorkFlow.openBellNotification();
    const notificationSendDateAll = NotificationWorkFlow.NotificationPage.getAllSendDate();
    NotificationWorkFlow.closeBellNotification();
    // Verify notification with send date is not displayed in notification list
    assert.ok(!notificationSendDateAll.includes(scope.context.tempData['notificationSendDate']), "The notification is not removed from the notification list");
});

Then('The number of notification bell should be decreased one number', ()=>{
    const numberOfNotiBefore = scope.context.tempData['numberOfNotification'];
    const numberOfNotiAfter = NotificationWorkFlow.NotificationPage.getCountNotification();
    assert.ok(numberOfNotiAfter <  numberOfNotiBefore,
              "The number of notification bell is not decreased one number. Before: " + numberOfNotiBefore + " - After: " + numberOfNotiAfter);
}); 

Then('The number of notification should be back to zero', ()=>{
    const countMessage = NotificationWorkFlow.NotificationPage.getCountMessage();
    assert.ok(countMessage == 0,
        "The number of notification is not back to zero. Expected: 0 - Actual: " + countMessage);
});

Then('Notification page should be presented', ()=>{
    expect(NotificationWorkFlow.NotificationPage.panelTitle.getElement()).toBeVisible({ message: 'Notification page is not presented', })
    // browser.pause(10000);
});


