const UIObject = require('./UIObject')
const DROPDOWN_MENU = "//div[contains(@class, 'dropdown-menu')]";
const SELECTED_ITEMS = "//*[@class='selected-container']//span";
const CLEAR_SELECTED_ITEMS = "//*[text()='Clear selected items']";
const SUGGEST_ITEMS = "//*[@class='suggestion-container']//li";
const SEARCH_INPUT = "//input[contains(@class, 'multiple-select-search-box')]";
const DROP_SEARCH_BTN = "//div[contains(@class, 'input-group-addon')]";
let selectedItem = "//*[@class='selected-container']//span[text()='%s']";
let suggestItem = "//*[@class='suggestion-container']//span[text()='%s']";

class Filter extends UIObject{
    // Filter object is used in Action page
    // Support to clear selected item, select option filtering

    constructor(selector, driver){
        super(selector, driver);
        this.browser = driver? driver:browser;
        this.dropDownMenu = new UIObject(selector + DROPDOWN_MENU, this.browser);
        this.selectedItem = new UIObject(SELECTED_ITEMS, this.browser);
        this.dropSearchBtn = new UIObject(DROP_SEARCH_BTN, this.browser);
        this.suggestItem = new UIObject(SUGGEST_ITEMS, this.browser);
        this.searchInput = new UIObject(SEARCH_INPUT, this.browser);
    }

    clearSelectedItem(){
        this.openFilter();
        this.getElement().waitForDisplayed();
        // let selectedElements = this.getElement().$$(CLEAR_SELECTED_ITEMS);
        let selectedElements = this.selectedItem.getElements();
        for (let index = 0; index < selectedElements.length; index++) {
            const element = selectedElements[index];
            if(element.isDisplayed() == 'false' || !element.isDisplayed()){
                continue;
            }
            element.waitForDisplayed();
            element.scrollIntoView();
            element.click();
        }
        this.closeFilter();
    }

    isSelected(item){
        this.openFilter();
        let selectedItemSeletor = selectedItem.replace('%s', item);
        return this.getElement().$(selectedItemSeletor).isExisting()
    }

    select(item){
        this.openFilter();
        this.searchValue(item);
        if(this.isSelected(item)){
            return;
        }
        const suggestItemSeletor = suggestItem.replace('%s', item);
        const suggestItemElement = new UIObject(suggestItemSeletor, this.browser);
        suggestItemElement.click();
        this.dropSearch();
        this.closeFilter();
    }

    openFilter(){
        let isDropdownOpen = this.dropDownMenu.isDisplayed(1);
        if(!isDropdownOpen){
            this.click();
        }
        
    }

    closeFilter(){
        if(this.dropDownMenu.isDisplayed(1)){
            this.click();
        }
        
    }

    searchValue(value){
        const searchElements = this.searchInput.getElements();
        for (let index = 0; index < searchElements.length; index++) {
            const element = searchElements[index];
            if(element.isDisplayed()){
                element.setValue(value);
            }
        }
    }

    dropSearch(){
        if(this.dropSearchBtn.isDisplayed()){
            this.dropSearchBtn.click();
        }
    }

    getSelectedValue(){
        let selectedValue = [];
        this.openFilter();
        this.getElement().waitForDisplayed();
        let selectedElements = this.selectedItem.getElements();
        for (let index = 0; index < selectedElements.length; index++) {
            const element = selectedElements[index];
            if(element.isDisplayed()){
                selectedValue.push(element.getText())
            }
        }
        this.closeFilter();
        return selectedValue;     
    }

    getSuggestedItems(){
        let suggestedItems = [];
        this.openFilter();
        this.getElement().waitForDisplayed();
        let suggestedElements = this.suggestItem.getElements();
        for (let index = 0; index < suggestedElements.length; index++) {
            const element = suggestedElements[index];
            if(element.isDisplayed()){
                suggestedItems.push(element.getText())
            }
        }
        this.closeFilter();
        return suggestedItems;     
    }

}
module.exports = Filter;