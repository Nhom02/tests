const UIObject = require('../../components/mobile/UIObject');
const PageObject = require('../../components/mobile/PageObject');
const CANCEL_UPDATE = '//XCUIElementTypeButton[@name="Cancel"]';
// const CANCEL_UPDATE = '//XCUIElementTypeStaticText[@name="Update"]/parent::*/parent::*/following-sibling::XCUIElementTypeScrollView//XCUIElementTypeButton[@name="Cancel"]';
const GET_STARTED = '//XCUIElementTypeButton[@name="GET STARTED"]';
// const EMAIL_INPUT = 'value == "Mobile / Email"';
const EMAIL_INPUT = '//XCUIElementTypeTextField[@value="Mobile / Email" or @value="your mobile number"]';
const LOGIN_BTN = '//XCUIElementTypeButton[@name="Next" or @name="NEXT"]'
const NEXT_BTN = '//XCUIElementTypeButton[@name="Next" or @name="NEXT"]';
const NEXT_BTN_2 = '//XCUIElementTypeButton[@name="NEXT"]';
// const ENTER_CODE = '//XCUIElementTypeApplication[@name="hayylo"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther';
const ENTER_CODE = '//XCUIElementTypeButton[@name="Next" or @name="NEXT"]/preceding-sibling::XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther';

const ALLOW_LOCATION = "//XCUIElementTypeButton[@name='Allow While Using App']";


class LoginIOS extends PageObject {
    constructor(_driver){
        super(_driver);
        this.driver = (_driver)? _driver: browser;
        this.getStartBtn = new UIObject(GET_STARTED, this.driver);
        this.emailInput = new UIObject(EMAIL_INPUT, this.driver);
        this.loginBtn = new UIObject(LOGIN_BTN, this.driver);
        this.nextBtn = new UIObject(NEXT_BTN, this.driver);
        this.nextBtn2 = new UIObject(NEXT_BTN_2, this.driver);
        this.enterCode = new UIObject(ENTER_CODE, this.driver);
        this.allowLocationBtn = new UIObject(ALLOW_LOCATION, this.driver);
        this.cancelUpdateBtn = new UIObject(CANCEL_UPDATE, this.driver);
    }

    clickGetStart(){
        // this.acceptSendintNofitication();
        console.log("Click on cancel update if existed");
        if(this.cancelUpdateBtn.isDisplayed(10)){
            console.log("Click on cancel update because found it in view");
            this.cancelUpdateBtn.click();
        }
        if(!this.getStartBtn.isDisplayed(120)){
            console.log("Reset app as getstart button is not found")
            this.driver.reset();
        }
        this.getStartBtn.click();
    }

    setEmail(value){
        console.log('Setting value ' + value);
        this.emailInput.setText(value);
    }

    clickLogin(){
        this.loginBtn.click();
    }

    clickNextBtn(){
        this.nextBtn.click();
        this.clickNextAtLocation();
    }

    setEnterCode(code){
        console.log("start pause");
        this.driver.pause(50000);
        console.log("End pause");
        console.log("Setting code" + code);
        this.enterCode.setText(code);
    }

    clickNextAtLocation(){
        console.log("Click next at location");
        if(this.nextBtn2.isDisplayed(10)){
            this.nextBtn2.click();
            this.acceptSendintNofitication();
        }
    }

    clickAllowLocation(){
        console.log("Allow location");
        // if(this.allowLocationBtn.isDisplayed(10)){
        //     this.allowLocationBtn.click();
        // }
    }

    acceptSendintNofitication(timeout=20e3){
        for (let i = 0; i < timeout / 1e3; i++) {
            try{
                const text =  this.driver.getAlertText();
                console.log(text)
                // change this to whatever your alert text says [1]
                if (text.includes('location')) {
                    console.log("Click allow");
                    this.driver.acceptAlert();
                    // find more about 'mobile: alert' here
                    // https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-xctest-mobile-gestures.md
                    // this.driver.executeScript('mobile: alert', [{'action': 'accept', 'buttonLabel': 'Allow'}]);
    
                    // alert closed successfully
                    return true;
                }
            }catch (e) {
                console.log('// getAlertText() is throwing an Error if there is no alert visible')
                // console.log(e)
                // getAlertText() is throwing an Error if there is no alert visible
            }
            this.driver.pause(1e3);
        }        
    }

}

module.exports = LoginIOS;