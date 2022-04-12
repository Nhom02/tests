const UIObject = require('../../components/mobile/UIObject');
const PageObject = require('../../components/mobile/PageObject');
const LEFT_MENU = 'Request Something';
const BUY_ST_BTN = '//*[@resource-id="com.hayylo.android.hayyloapp:id/btnNeedSomething"]';
const CONFIRM_BTN = '//*[@resource-id="com.hayylo.android.hayyloapp:id/btnConfirm"]';
const DONE_BTN = '//*[@resource-id="com.hayylo.android.hayyloapp:id/btnDone"]';
const SEND_BTN = '//*[@resource-id="com.hayylo.android.hayyloapp:id/btnSubmit"]';
const REQUEST_CONTENT = '//*[@resource-id="com.hayylo.android.hayyloapp:id/edtContent"]';
let requestBtn = '//*[@class="android.widget.Button" and @text="%s"]';
const VIEW_SCHEDULE = '//*[@resource-id="com.hayylo.android.hayyloapp:id/btnConfirm"]';
// const SCHEDULE = "//*[@resource-id='com.hayylo.android.hayyloapp:id/recyclerView']/*[@class='android.view.ViewGroup']/*[@resource-id='com.hayylo.android.hayyloapp:id/layout_left']/*[@resource-id='com.hayylo.android.hayyloapp:id/txt_day_of_month' and @text='25']";
let schedule = "//*[@resource-id='com.hayylo.android.hayyloapp:id/recyclerView']" +
                 "/*[@class='android.view.ViewGroup']/*[@resource-id='com.hayylo.android.hayyloapp:id/layout_left']" +
                 "/*[@resource-id='com.hayylo.android.hayyloapp:id/txt_day_of_month' and @text='%s1']/parent::*" +
                 "/following-sibling::*[@resource-id='com.hayylo.android.hayyloapp:id" +
                 "/txtNameCategory' and contains(@text, '%s2')]";

const CHANGE_BTN = '//*[@resource-id="com.hayylo.android.hayyloapp:id/btnRequestChange"]';
const CHANGE_OR_CANCEL_BTN = '//*[@resource-id="com.hayylo.android.hayyloapp:id/btnSend"]';


class RequestAndroid extends PageObject {
    constructor(_driver){
        super(_driver, LEFT_MENU);
        this.driver = (_driver)? _driver: browser;
        this.confirmBtn = new UIObject(CONFIRM_BTN, this.driver);
        this.buySomeThingBtn = new UIObject(BUY_ST_BTN, this.driver);
        this.doneBtn = new UIObject(DONE_BTN, this.driver);
        this.sendBtn = new UIObject(SEND_BTN, this.driver);
        this.requestContent = new UIObject(REQUEST_CONTENT, this.driver);
        this.viewScheduleBtn = new UIObject(VIEW_SCHEDULE, this.driver);
        this.changeBtn = new UIObject(CHANGE_BTN, this.driver);
        this.changeOrCancelBtn = new UIObject(CHANGE_OR_CANCEL_BTN, this.driver);
    }

    clickRequest(name){
        console.log("name " + name); 
        let requestBtnSelector = requestBtn.replace('%s', name);
        new UIObject(requestBtnSelector, this.driver).getElement().waitForDisplayed();
        new UIObject(requestBtnSelector, this.driver).click();
    }

    clickConfirmBtn(){
        this.confirmBtn.click();
        return this;
    }


    clickDone(){
        if(this.doneBtn.isDisplayed(60)){
            this.doneBtn.click();
        }
        
    }

    clickSend(){
        this.sendBtn.click();
    }

    setRequestContent(content){
        this.requestContent.setText(content);
    }

    clickViewSchedule(){
        this.viewScheduleBtn.click();
    }

    getSchedule(serviceDate, workerName){
        console.log("name " + workerName); 
        let scheduleSelector = schedule.replace('%s1', serviceDate).replace('%s2', workerName);
        console.log(scheduleSelector)
        return new UIObject(scheduleSelector, this.driver).getElement();       
    }

    clickChange(){
        this.changeBtn.click();
    }

    clickChangeOrCancel(){
        this.changeOrCancelBtn.click();
    }

}

module.exports = RequestAndroid;