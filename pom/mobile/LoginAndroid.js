const UIObject = require('../../components/mobile/UIObject');
const PageObject = require('../../components/mobile/PageObject');
const GET_STARTED = 'android.widget.Button';
const EMAIL_INPUT = "//*[@resource-id='com.hayylo.android.hayyloapp:id/loginMailPhone']";
// const EMAIL_INPUT = 'new UiSelector().text("Mobile / Email").className("android.widget.EditText")';
const LOGIN_BTN = "//*[@resource-id='com.hayylo.android.hayyloapp:id/login_btn']";


// const LOGIN_BTN = 'new UiSelector().text("Next").className("android.widget.TextView")'
// const NEXT_BTN = '~com.hayylo.android.hayyloapp:id/btnNext';
const NEXT_BTN = 'new UiSelector().text("Next").className("android.widget.Button")';

const NEXT_BTN_2 = "//*[@resource-id='com.hayylo.android.hayyloapp:id/btnNext' and @text='NEXT']";
// const NEXT_BTN = 'new UiSelector().text("NEXT").className("android.widget.Button")';

const ENTER_CODE = "//*[@resource-id='com.hayylo.android.hayyloapp:id/edtEnterCode']";

// const ENTER_CODE = 'new UiSelector().text("- - - - - -").className("android.widget.EditText")'
const ALLOW_LOCATION = "//*[@resource-id='com.android.packageinstaller:id/permission_allow_button' or @resource-id='com.android.permissioncontroller:id/permission_allow_always_button']";

// const ALLOW_LOCATION = 'new UiSelector().text("Only this time").className("android.widget.Button")';

const PROCESS_ICON = "//*[@class='android.widget.ProgressBar']/following-sibling::*[@resource-id='com.hayylo.android.hayyloapp:id/txtMessage']";


const WAITING_SPINER = 'android.widget.LinearLayout';

class LoginAndroid extends PageObject {
    constructor(_driver){
        super(_driver);
        this.driver = (_driver)? _driver: browser;
        this.getStartBtn = new UIObject(GET_STARTED, this.driver);
        // this.emailInput = new UIObject(`android=${EMAIL_INPUT}`, this.driver);
        this.emailInput = new UIObject(EMAIL_INPUT, this.driver);
        
        this.loginBtn = new UIObject(LOGIN_BTN, this.driver);

        // this.loginBtn = new UIObject(`android=${LOGIN_BTN}`, this.driver);
        // this.nextBtn = new UIObject(NEXT_BTN, this.driver);
        // this.nextBtn = new UIObject(`android=${NEXT_BTN}`, this.driver);
        this.nextBtn = new UIObject("//*[@resource-id='com.hayylo.android.hayyloapp:id/btnNext']", this.driver);

        
        
        this.nextBtn2 = new UIObject(NEXT_BTN_2, this.driver);

        // this.enterCode = new UIObject(`android=${ENTER_CODE}`, this.driver);
        this.enterCode = new UIObject(ENTER_CODE, this.driver);

        // this.allowLocationBtn = new UIObject(`android=${ALLOW_LOCATION}`, this.driver);
        this.allowLocationBtn = new UIObject(ALLOW_LOCATION, this.driver);

        this.processIcon = new UIObject(PROCESS_ICON, this.driver);
    }

    clickGetStart(){
        // console.log(this.driver);
        // this.driver.$('android.widget.Button').click();
        if(!this.getStartBtn.isDisplayed(120)){
            console.log("Reset app as getstart button is not found");
            this.driver.closeApp();
            this.driver.launchApp();
            // this.driver.reset();
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
        this.driver.pause(10000);
        console.log("Is next button display?");
        this.processIcon.getElement().waitForDisplayed({ reverse: true });
        this.clickNextAtLocation();
    }

    setEnterCode(code){
        console.log("Setting code" + code);
        this.enterCode.setText(code);
    }

    clickNextAtLocation(){
        console.log("Click next at location");
        if(this.nextBtn2.isDisplayed(10)){
            this.nextBtn2.click();
        }
        this.clickAllowLocation();
    }

    clickAllowLocation(){
        console.log("Allow location");
        if(this.allowLocationBtn.isDisplayed(10)){
            this.allowLocationBtn.click();
        }
        
    }
}

module.exports = LoginAndroid;