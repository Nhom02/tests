const UIObject = require("../UIObject");
// const SEARCH = "//*[@id='place-manager_wrapper']//input[@type='search']";
let SEARCH_INPUT = "//input[@type='search']";
let PROCESSING_MESSAGE = '#place-manager_processing';
const NEXT_PAGE = "//ul[@class='pagination']//li[contains(@class, 'previous')]/a";
const PREV_PAGE = "//ul[@class='pagination']//li[contains(@class, 'next')]/a";
const LATEST_PAGE = "//ul[@class='pagination']//li[contains(@class, 'next')]/preceding-sibling::*[1]/a";
const NAME_COL = '//tr/td[1]';


class Table extends UIObject{
    constructor(selector, driver){
        super(selector, driver);
        this.browser = driver? driver: browser;
        //Table pagination
        this.nextPage = new UIObject(NEXT_PAGE, this.browser);
        this.prevPage = new UIObject(PREV_PAGE, this.browser);
        this.latestPage = new UIObject(LATEST_PAGE, this.browser);
        this.nameCol = new UIObject(NAME_COL, this.browser);
    }

    getColHeaderName(){
        let col = [];
        let headerElements = this.getElement().$('thead').$('tr').$$('th');
        for (let index = 0; index < headerElements.length; index++) {
            const element = headerElements[index];
            col.push(element.getText());
        }
        return col;
    }

    search(searchText){
        // let searchSelector = searchInput.replace('%s', this.selector);
        new UIObject(SEARCH_INPUT, this.browser).setText(searchText)
        this.waitForProcessingMessageGone();
    }

    getTotalPage(){
        return this.latestPage.getText();
    }

    goToNextPage(){
        this.nextPage.click();
        return this;
    }

    goToPrevPage(){
        this.prevPage.click();
        return this;
    }

    waitForProcessingMessageGone(times=5){
        // Wait until processing message gone
        let retries = 0;
        while (retries <= times) {
            let processingElement = new UIObject(PROCESSING_MESSAGE, this.browser).getElement();
            if(!processingElement.isDisplayed()){
                break;
            }
            let displayCss = processingElement.getCSSProperty('display');
            if(displayCss['value'] === 'none'){
                break;
            }
            browser.pause(1000)
            retries += 1;
        }
    }

    getListName(){
        let name = [];
        let nameElements = this.nameCol.getElements();
        for (let index = 0; index < nameElements.length; index++) {
            const element = nameElements[index];
            if(element.isDisplayed()){
                let recordName = element.getText();
                if(recordName.includes("Click Add New") || recordName.includes("No matching records") || recordName.includes("To create a client") ){
                    continue;
                }
                name.push(recordName);
            }
        }
        return name;
    }

}

module.exports = Table;