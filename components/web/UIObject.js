class UIObject{

    constructor(selector, driver){
        this.selector = selector;
        this.element = '';
        this.elements = '';
        // if specific driver is not set, get driver from global parameter
        this.browser = driver? driver:browser;
    }
    getElement(){
        this.element = this.browser.$(this.selector);
        return this.element;
    }

    getElements(){

        this.element =  this.browser.$(this.selector);
        this.isDisplayed(5);
        this.elements = this.browser.$$(this.selector);            
        return this.elements;
    }

    click(){
        this.getElement();
        this.element.waitForDisplayed();
        this.element.scrollIntoView();
        this.browser.waitUntil(() => this.getElement().isClickable());
        this.element.click();
    }

    setText(value){
        this.getElement()
        this.element.scrollIntoView();
        this.element.waitForDisplayed();
        this.element.setValue(value);
    }

    getText(){
        this.getElement()
        this.element.waitForDisplayed();
        this.element.scrollIntoView();
        return this.element.getText();
    }

    getValue(){
        this.getElement()
        this.element.waitForDisplayed();
        return this.element.getValue();        
    }

    getClassName(){
        this.getElement();
        return this.element.getAttribute('class');
    }

    getAttribute(attribute){
        this.getElement();
        return this.element.getAttribute(attribute);
    }

    isDisplayed(times=1){
        for (let index = 0; index < times; index++) {
            if(this.getElement().isDisplayed()){
                return true;
            }
            this.browser.pause(500);
        }
        return false;
    }
}

module.exports = UIObject;