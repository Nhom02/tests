const UIObject = require('../UIObject');


class Select2{
    constructor(id, driver){
        this.browser = driver? driver: browser;
        this.id = id;
        this.options = new UIObject('#select2-' + id + '-results', this.browser);
        this.openOption = new UIObject("//*[@id='" + id + "']/following-sibling::*", this.browser);

    }

    openSelection(){
        if(this.options.isDisplayed(5)){
            return;
        }
        this.openOption.click()
    }

    closeSelection(){
        if(this.options.isDisplayed(5)){
            this.openOption.click();
        }
    }

    select(value){
        this.openSelection();
        let optionSelector = "//*[@id='select2-"+ this.id +"-results']//*[text()='"+ value +"']";
        new UIObject(optionSelector, this.browser).click();
    }

    search(value){
        this.openSelection();
        let searchElements = new UIObject('.select2-search__field', this.browser).getElements();
        for (let index = 0; index < searchElements.length; index++) {
            const element = searchElements[index];
            if(element.isDisplayed()){
                element.setValue(value);
                break;
            }
            
        }
    }
}

module.exports = Select2;