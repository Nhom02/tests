const UIObject = require('../UIObject')
const DELETE_BTN = "//*[text()='Delete']";
const CANCEL_BTN = "//*[text()='Cancel']";
const CLOST_BTN = "//*[text()='Close']";
const YES_BTN = "//*[text()=' Yes']";
const CONFIRM_BTN = "//*[text()='Confirm']";


class Modal extends UIObject{
    constructor(selector, driver){
        super(selector, driver);
        this.browser = driver? driver: browser;
        this.closeBtn = new UIObject(CLOST_BTN, this.browser);
        this.confirmBtn = new UIObject(CONFIRM_BTN, this.browser);
    }

    clickDelete(){
        this.getElement().$(DELETE_BTN).waitForDisplayed();
        this.getElement().$(DELETE_BTN).click();
        return this;
    }

    clickCancel(){
        this.getElement().$(CANCEL_BTN).waitForDisplayed();
        this.getElement().$(CANCEL_BTN).click();
        return this;
    }

    clickClose(){
        this.getElement().waitForDisplayed();
        const closeBtnElements = this.closeBtn.getElements();
        for (let index = 0; index < closeBtnElements.length; index++) {
            const element = closeBtnElements[index];
            if(element.isDisplayed()){
                element.click();
            }
        }
        // Wait until Modal is closed
        this.getElement().waitForDisplayed({reverse:true});
        return this;
    }

    clickYes(){
        this.getElement().$(YES_BTN).waitForDisplayed();
        this.getElement().$(YES_BTN).click();
        return this;
    }

    clickConfirm(){
        this.getElement().waitForDisplayed();
        const confirmBtnElements = this.confirmBtn.getElements();
        for (let index = 0; index < confirmBtnElements.length; index++) {
            const element = confirmBtnElements[index];
            // Handle issue in multiremote running
            // It return array instead of string
            let isDisplayed = element.isDisplayed();
            if(Array.isArray(isDisplayed)){
                isDisplayed = isDisplayed[0]; //(isDisplayed[0] === 'true');
            }
            if(isDisplayed){
                element.click();
            }
        }
        // Wait until Modal is closed
        this.getElement().waitForDisplayed({reverse:true});
        return this;
    }

}

module.exports = Modal;