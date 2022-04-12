const UIObject = require('../UIObject')
let selectItem = ".//li/span[text()='%s']";
class Combobox extends UIObject{
    constructor(selector, driver){
        super(selector, driver);
        this.browser = driver? driver: browser;
    }

    selectByText(text){
        this.getElement()
        this.element.waitForDisplayed();
        this.element.selectByVisibleText(text);
    }
    
    getSelectedText(){
        return this.getElement().$('[value="' + this.getValue() + '"]').getText();
    }

    selectByClicking(text){
        // Using for dropdown list created by angular
        // step: Click to element -> click to select option
        this.click();
        // browser.pause(5000)
        let selectSelector = selectItem.replace('%s', text);
        this.getElement().$(selectSelector).waitForDisplayed({ timeout: 5000 });
        this.getElement().$(selectSelector).click();
    }

}
module.exports = Combobox;