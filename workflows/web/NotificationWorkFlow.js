const NotificationPage = require('../../pom/web/Notification');

class NotificationWorkFlow{
    constructor(){
        this.NotificationPage = new NotificationPage();
    }

    async goToAssignedAction(){
        this.openBellNotification();
        this.NotificationPage.clickNotificationFirstItem();
    }

    openBellNotification(){
        if(this.NotificationPage.notificationDropDown.isDisplayed()){
            return;
        }
        this.NotificationPage.clickBellIcon();
    }

    closeBellNotification(){
        if(this.NotificationPage.notificationDropDown.isDisplayed()){
            this.NotificationPage.clickBellIcon();
        }
    }


}

module.exports = new NotificationWorkFlow();