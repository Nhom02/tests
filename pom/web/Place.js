const PageObject = require('../../components/web/PageObject');
const UIObject = require('../../components/web/UIObject');
const Table =  require('../../components/web/table/Table');
const Modal = require('../../components/web/modal/Modal');
const LEFT_NAV_ITEM = "Places";
const ADD_PLACE_BTN = "//span[text()='Add Place']";
const PLACE_TABLE = "#place-manager";
const PLACE_INPUT = '[name="place_name"]';
const ADDRESS = '#address';
const SAVE_BTN = '#save';
const CANCEL_BTN = '#cancel';
const SUCCESS_MODAL = '.success';
let editPlaceBtn = "//td[contains(text(), '%s')]/following-sibling::*/a[text()='Edit']";
let deletePlaceBtn = "//td[contains(text(), '%s')]/following-sibling::*/a[text()='Delete']";

class Place extends PageObject{
    constructor(driver){
        super(LEFT_NAV_ITEM, '', driver);
        this.addPlaceBtn = new UIObject(ADD_PLACE_BTN, this.browser);
        this.placeTable = new Table(PLACE_TABLE, this.browser);
        this.placeNameInput = new UIObject(PLACE_INPUT, this.browser);
        this.addressInput = new UIObject(ADDRESS, this.browser);
        this.saveBtn = new UIObject(SAVE_BTN, this.browser);
        this.cancelBtn = new UIObject(CANCEL_BTN, this.browser);
        this.successModal = new Modal(SUCCESS_MODAL, this.browser);
    }

    clickAddPlace(){
        this.addPlaceBtn.click();
    }

    setPlaceName(name){
        this.placeNameInput.setText(name);
    }

    setPlaceAddress(address){
        this.addressInput.setText(address);
    }

    clickSave(){
        this.saveBtn.click();
    }

    clickCancel(){
        this.cancelBtn.click();
    }

    clickEditPlace(name){
        let editPlaceBtnSeletor = editPlaceBtn.replace('%s', name);
        new UIObject(editPlaceBtnSeletor, this.browser).click();
    }

    clickDeletePlace(name){
        let deletePlaceBtnSeletor = deletePlaceBtn.replace('%s', name);
        new UIObject(deletePlaceBtnSeletor, this.browser).click();
    }

    isPlaceExisted(name){
        let editPlaceBtnSeletor = editPlaceBtn.replace('%s', name);
        return new UIObject(editPlaceBtnSeletor, this.browser).getElement().isDisplayed();        
    }
}

module.exports = Place;