const PageObject = require('../../components/web/PageObject');
const UIObject = require('../../components/web/UIObject');

//---------------------Action page------------------
const LEFT_NAV_ITEM = "Data Import Events";
let eventRow = "//div[@id='tab_new_event']//div[@class='item']/span[contains(text(), '%s')]/parent::*";
let eventDetails = "//div[@id='tab_new_event']//div[@class='item']/span[contains(text(), '%s')]/parent::*/a[@class='details']";

const assert = require('assert');

class DataImportEvent extends PageObject{
    constructor(driver){
        super(LEFT_NAV_ITEM, "", driver);
        this.browser = driver? driver: browser;
    }

    clickEventDetails(importedFileName){
        /*
            Click event details base on file name imported
        */
        let eventDetailsSelector = eventDetails.replace('%s', importedFileName);
        new UIObject(eventDetailsSelector, this.driver).getElement().waitForDisplayed();
        new UIObject(eventDetailsSelector, this.driver).click();
        
    }

}

module.exports = DataImportEvent;