const UIObject = require('../../components/mobile/UIObject');
const PageObject = require('../../components/mobile/PageObject');
const LEFT_MENU = 'Request Something';
const BUY_ST_BTN = '//XCUIElementTypeStaticText[@name="Buy Something"]';
const CONFIRM_BTN = '//XCUIElementTypeStaticText[@name="CONFIRM"]';
const DONE_BTN = '//XCUIElementTypeButton[contains(@name,"DONE")]';
const SEND_BTN = '//XCUIElementTypeApplication[@name="hayylo"]//XCUIElementTypeStaticText[@name="SEND"]';
const REQUEST_CONTENT = '//XCUIElementTypeApplication[@name="hayylo"]//XCUIElementTypeTextView';
let requestBtn = '//XCUIElementTypeStaticText[@name="%s"]';
const VIEW_SCHEDULE = '//XCUIElementTypeButton[@name="VIEW SCHEDULE"]';
let schedule = "//XCUIElementTypeStaticText[contains(@name, '%serviceDate')]/following-sibling::XCUIElementTypeStaticText[contains(@name, '%workerName')]";
const CHANGE_BTN = '//XCUIElementTypeButton[@name="CHANGE"]';
const CHANGE_OR_CANCEL_BTN = '//XCUIElementTypeButton[@name="CHANGE OR CANCEL"]';
const PREFERED_TIME = "//XCUIElementTypeStaticText[@name='Select your preferred time']/following-sibling::XCUIElementTypeStaticText[1]";


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
        this.preferedTimeBtn = new UIObject(PREFERED_TIME, this.driver);
    }

    clickConfirmBtn(){
        this.confirmBtn.click();
        return this;
    }

    clickRequest(name){
        let requestBtnSelector = requestBtn.replace('%s', name);
        new UIObject(requestBtnSelector, this.driver).getElement().waitForDisplayed();
        new UIObject(requestBtnSelector, this.driver).click();
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

    setRequestContent(content){
        this.requestContent.setText(content);
    }

    clickViewSchedule(){
        this.viewScheduleBtn.click();
    }

    getSchedule(serviceDate, workerName){
        console.log("name " + workerName); 
        let scheduleSelector = schedule.replace('%serviceDate', serviceDate).replace('%workerName', workerName);
        console.log(scheduleSelector)
        return new UIObject(scheduleSelector, this.driver).getElement();       
    }

    clickChange(){
        this.changeBtn.click();
    }

    clickChangeOrCancel(){
        this.changeOrCancelBtn.click();
        this.clickPreferedTime();
    }

    clickPreferedTime(){
        this.preferedTimeBtn.click();
    }

}

module.exports = RequestAndroid;