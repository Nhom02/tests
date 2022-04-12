const UIObject = require('../../components/web/UIObject');
const PageObject = require('../../components/web/PageObject');
const NOTIFICATION_DROPDOWN = '.notifications';
const BELL_NOTI = '#notification-id';
const MARK_AS_READ = '#mark-all-read';
const COUNT_NOTI = '.class-notification-number';
const COUNT_MESSAGE = '.class-count-message';
const ALL_NOTIFICATION = ".//li[@class='external']/a";
const NOTIFICATION = ".//li[contains(@class, 'notification-success')]/a";
const PANEL_TITLE = '.panel-title';
const NOTIFICATION_SEND_DATE = ".//li[contains(@class, 'notification-success')]//span[contains(@class, 'time')]";

class Notification extends PageObject{
    constructor(){
        super();
        this.bellIcon = new UIObject(BELL_NOTI);
        this.markAsReadBtn = new UIObject(MARK_AS_READ);
        this.countNotification = new UIObject(COUNT_NOTI);
        this.countMessage = new UIObject(COUNT_MESSAGE);
        this.notificationItem = new UIObject(NOTIFICATION);
        this.viewAllNotification = new UIObject(ALL_NOTIFICATION);
        this.panelTitle = new UIObject(PANEL_TITLE);
        this.sendDate = new UIObject(NOTIFICATION_SEND_DATE);
        this.notificationDropDown = new UIObject(NOTIFICATION_DROPDOWN);
    }

    clickBellIcon(){
        this.bellIcon.click();
        return this;
    }

    clickMarkAsRead(){
        this.markAsReadBtn.click();
        return this;
    }

    getCountNotification(){
        if(this.countNotification.isDisplayed()){
            return this.countNotification.getText();
        }
        return 0;
    }

    getCountMessage(){
        if(this.countMessage.isDisplayed()){
            return this.countMessage.getText();
        }
        return 0;        
    }

    clickViewAllNotification(){
        this.viewAllNotification.click();
        return this;
    }

    clickNotificationFirstItem(){
        this.notificationItem.click();
        return this;
    }

    getNotificationFirstItem(){
        return this.notificationItem.getText();
    }

    getSendDateOfFirstItem(){
        if(this.sendDate.isDisplayed()){
            return this.sendDate.getText();
        }        
    }

    getAllSendDate(){
        let sendDate = [];
        if(!this.sendDate.isDisplayed()){
            return sendDate;
        }
        const sendDateElements = this.sendDate.getElements();
        for (let index = 0; index < sendDateElements.length; index++) {
            const element = sendDateElements[index];
            sendDate.push(element.getText());
        }
        return sendDate;
    }

    isPagePresented(){
        return this.panelTitle.isDisplayed();
    }
}
module.exports = Notification;