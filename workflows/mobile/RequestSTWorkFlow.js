const RequestAndroid = require('../../pom/mobile/RequestAndroid');
const RequestIOS = require('../../pom/mobile/RequestIOS');
const Gestures = require('../../components/mobile/Gestures');

class RequestSTWorkFlow{
    constructor(_driver){
        this.driver = _driver? _driver: driver;
        this.RequestPage = this.driver.isAndroid ? new RequestAndroid(this.driver): new RequestIOS(this.driver);
    }

    createNewRequest(requestData){
        this.RequestPage.clickRequest(requestData.serviceName);
        if(requestData['serviceType'] == 'Input Notes'){
            this.RequestPage.setRequestContent(requestData.note);
            this.RequestPage.clickSend();
        }
        if(requestData['serviceType'] == 'Schedule Change'){
            this.RequestPage.clickViewSchedule();
            console.log("scroll up");
            const elementScroll = this.RequestPage.getSchedule(requestData['serviceDate'], requestData['workerName']);
            Gestures.checkIfDisplayedWithScrollDown(elementScroll, 10, 0, this.driver);
            elementScroll.click();
            this.RequestPage.clickChangeOrCancel();
            this.RequestPage.clickChange();
            this.RequestPage.clickConfirmBtn();
        }
        this.RequestPage.clickDone();
    }
}

module.exports = RequestSTWorkFlow;