

class UIObject{

    constructor(selector, _driver){
        this.selector = selector;
        this.element = '';
        this.driver = _driver?_driver:browser;
    }
    getElement(){
        this.element =  this.driver.$(this.selector);
        return this.element;
    }

    getElements(){
        return this.driver.$$(this.selector);
    }

    click(){
        this.getElement();
        // this.driver.waitUntil(() => this.getElement().isClickable());
        this.element.click();
    }

    setText(value){
        this.getElement();
        this.element.setValue(value);
    }

    getText(){
        this.getElement();
        return this.element.getText();
    }

    isDisplayed(times=10){
        for (let index = 0; index < times; index++) {
            if(this.getElement().isDisplayed()){
                return true;
            }
            this.driver.pause(1000);
        }
        return false;
    }
    scrollDown(){
        Gestures.swipeDown(1);
    }
}
module.exports = UIObject;