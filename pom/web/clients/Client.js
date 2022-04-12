const PageObject = require('../../../components/web/PageObject');
const UIOBject = require('../../../components/web/UIObject');
const Table = require('../../../components/web/table/Table');
const Combobox = require('../../../components/web/form/Combobox');
const Modal = require('../../../components/web/modal/Modal');
const LEFT_NAV_ITEM = "Clients";
const START_VIDEO_CALL = '#btn-start-video-call';
const CLIENT_TABLE = "#place-manager";
let editClientBtn = "//a[contains(text(), '%s')]/parent::*/following-sibling::*/a[@class='fa-user']";
let deleteClientBtn = "//a[contains(text(), '%s')]/parent::*/following-sibling::*/a[@class='fa-trash-o']";
const NEW_CLIENT_BTN = "//span[text()='Add New Client']";
const SUCCESS_MODAL = '.success';
const CONFIRM_MODAL = '#modal-confirm';

class Client extends PageObject{
    constructor(driver){
        super(LEFT_NAV_ITEM, '', driver);
        this.browser = driver? driver: browser;
        this.startVideoCallBtn = new UIOBject(START_VIDEO_CALL);
        this.clientTable = new Table(CLIENT_TABLE, this.browser);
        this.newClientBtn = new UIOBject(NEW_CLIENT_BTN);
        this.successModal = new Modal(SUCCESS_MODAL);
        this.confirmModal = new Modal(CONFIRM_MODAL);
    }

    clickStartVideoCall(){
        this.startVideoCallBtn.click();
    }

    clickEditClient(name){
        let editClientBtnSeletor = editClientBtn.replace('%s', name);
        new UIObject(editClientBtnSeletor, this.browser).click();
    }

    clickDeleteClient(name){
        let deleteUserBtnSeletor = deleteClientBtn.replace('%s', name);
        new UIObject(deleteUserBtnSeletor).click();
    }

    clickNewClientBtn(){
        this.newClientBtn.click()
        return this;
    }

    isClientExisted(name){
        let editClientBtnSeletor = editClientBtn.replace('%s', name);
        return new UIObject(editClientBtnSeletor).getElement().isDisplayed();        
    }


    getClientUserId(){
        let editUrl = this.browser.getUrl();
        // get last element after / slash
        let editUserId = editUrl.split("/").slice(-1)[0];
        return editUserId;
    }

}

module.exports = Client;