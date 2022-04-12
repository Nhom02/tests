const NotificationAndroid = require('../../pom/mobile/NotificationAndroid');
const NotificationIOS = require('../../pom/mobile/NotificationIOS');

class NotificationWorkFlow{
    constructor(_driver){
        this.driver = _driver? _driver: driver;
        this.NotificationPage = this.driver.isAndroid ? new NotificationAndroid(this.driver): new NotificationIOS(this.driver);
    }

    getNewestNotification(){
        
    }
}

module.exports = NotificationWorkFlow;