const PageObject = require('../../../components/web/PageObject');
const UIOBject = require('../../../components/web/UIObject');
const Table = require('../../../components/web/table/Table');
const Combobox = require('../../../components/web/form/Combobox');
const Modal = require('../../../components/web/modal/Modal');
const UIObject = require('../../../components/web/UIObject');
const LEFT_NAV_ITEM = "Clients";
const ACTION_TAB = '#client-actions';
const CONTACT_TAB = 'a[href="#contacts"]';
const DETAILS_TAB = 'a[href="#client_details"]';
const SCHEDULE_TAB = 'a[href="#schedule"]';
const ACTION_COMPONENT = '//hayylo-action';
const CLIENT_NUMBER = "[name='client_number']";
const FIRST_NAME = "[name='first_name']";
const LAST_NAME = "[name='last_name']";
const ADDRESS = "[name='address']";
const PRIMARY_OFFICE = "#primary_office";
const EMAIL = "[name='share_email']";
const HOME_PHONE = "[name='home_phone']";
const MOBILE_PHONE = "[name='share_mobile_phone']";
const DATE_BIRTH = "[name='date_birth']";
const EMAIL_LOGIN = "[name='email']";
const PHONE_LOGIN = "[name='mobile_phone']";
const BRANCH = "#custom01";
const GROUP_CHECKED = "//div[contains(@class, 'cbr-checked')]/parent::*";

//---------------------------------------Contact Tab-----------------------------
const ADD_CONTACT_BTN = '#input-contact';
const CONTACT_FIRST_NAME = '#contact_first_name';
const CONTACT_LAST_NAME = '#contact_last_name';
const CONTACT_HOME_PHONE = '#contact_home_phone';
const CONTACT_MOBILE_PHONE = '#contact_mobile_phone';
const SAVE_CONTACT_BTN = "(//*[@name='save'])[2]";
const CONTACT_TABLE = '#datatable-contacts';
let deleteContactBtn = "//td[contains(text(), '%s')]//following-sibling::*/span[contains(@class, 'fa-trash-o')]";
let contactNameTable = "//td[contains(text(), '%s')]";
const CONTACT_CONFIRM_MODAL = '#modal-confirm-delete-contact';
const CONTACT_SUCCESS_MODAL = '#modal-contact-success';
const CONTACT_CANCEL_BTN = "//*[contains(@class, 'text-right')]//a[text()='Cancel']";
const clientCol = "//*[text()[self::text()[contains(normalize-space(.),'%time')]]]/following-sibling::*[1]";


const CLIENT_TAB_SELECTOR = {
    'Details': DETAILS_TAB,
    'Action': ACTION_TAB,
    'Contacts': CONTACT_TAB,
    'Schedules': SCHEDULE_TAB
}

class EditClient extends PageObject{
    constructor(driver){
        super(LEFT_NAV_ITEM, '', driver);
        this.browser = driver? driver: browser;
        this.actionTab = new UIOBject(ACTION_TAB);
        this.detailsTab = new UIOBject(DETAILS_TAB);
        this.contactTab = new UIOBject(CONTACT_TAB);
        this.actionComponent = new UIOBject(ACTION_COMPONENT);
        this.clientNumber = new UIObject(CLIENT_NUMBER)
        this.firstNameInput = new UIObject(FIRST_NAME);
        this.lastNameInput = new UIObject(LAST_NAME);
        this.addressInput = new UIObject(ADDRESS);
        this.homePhoneInput = new UIObject(HOME_PHONE);
        this.mobilePhoneInput = new UIObject(MOBILE_PHONE);
        this.emailInput = new UIObject(EMAIL);
        this.primaryOffice = new Combobox(PRIMARY_OFFICE);
        this.dateOfBirth = new UIObject(DATE_BIRTH);
        this.emailLoginInput = new UIObject(EMAIL_LOGIN);
        this.phoneLoginInput = new UIObject(PHONE_LOGIN);
        this.branchInput = new UIObject(BRANCH);
        this.groupChecked = new UIObject(GROUP_CHECKED);
        this.addContactBtn = new UIOBject(ADD_CONTACT_BTN);
        this.contactFirstNameInput = new UIOBject(CONTACT_FIRST_NAME);
        this.contactLastNameInput = new UIOBject(CONTACT_LAST_NAME);
        this.contactMobilePhoneInput = new UIOBject(CONTACT_MOBILE_PHONE);
        this.saveContactBtn = new UIOBject(SAVE_CONTACT_BTN);
        this.contactConfirmModal = new Modal(CONTACT_CONFIRM_MODAL, this.browser);
        this.contactTable = new Table(CONTACT_TABLE, this.browser);
        this.contactCancelBtn = new UIOBject(CONTACT_CANCEL_BTN, this.browser);
        this.contactSuccessModal = new Modal(CONTACT_SUCCESS_MODAL, this.browser);
    }

    clickTab(tabName){
        new UIOBject(CLIENT_TAB_SELECTOR[tabName], this.browser).click();
        return this;
    }

    getClientNumber(){
        return this.clientNumber.getValue();
    }
 
    getFirstName(){
        return this.firstNameInput.getValue();
    }

    getLastName()
    {
        return this.lastNameInput.getValue();
    }

    getAddress(){
        return this.addressInput.getValue();
    }

    getBranch(){
        return this.branchInput.getValue();
    }

    getPrimaryOffice(){
        return this.primaryOffice.getSelectedText();
    }

    getEmail(){
        return this.emailInput.getValue();
    }

    getEmailLogin(){
        return this.emailLoginInput.getValue();
    }

    getGroup(){
        group = [];
        const groupCheckedElements = this.groupChecked.getElements();
        for (let index = 0; index < groupCheckedElements.length; index++) {
            const element = groupCheckedElements[index];
            group.push(element.getText());
        }
        group = group.toString();
        return group;
    }

    getHomePhone(){
        return this.homePhoneInput.getValue();
    }

    getMobilePhone(){
        return this.mobilePhoneInput.getValue();
    }

    getPhoneLogin(){
        return this.phoneLoginInput.getValue();
    }

    setContactFirstName(firstName){
        this.contactFirstNameInput.setText(firstName);
        return this;
    }

    setContactLastName(lastName){
        this.contactLastNameInput.setText(lastName);
        return this;
    }

    setContactMobilePhone(mobilePhone){
        this.contactMobilePhoneInput.setText(mobilePhone);
        return this;
    }

    clickSaveContact(){
        this.saveContactBtn.click();
        return this;
    }

    clickDeleteContact(name){
        let editContactBtnSeletor = deleteContactBtn.replace('%s', name);
        new UIObject(editContactBtnSeletor, this.browser).click();
        return this;
    }

    clickAddContact(){
        this.addContactBtn.click();
        return this;
    }

    isContactExisted(name){
        let editContactBtnSeletor = deleteContactBtn.replace('%s', name);
        return new UIObject(editContactBtnSeletor).getElement().isDisplayed(10);        
    }

    clickContactName(name){
        let contactNameTableSeletor = contactNameTable.replace('%s', name);
        return new UIObject(contactNameTableSeletor).click();      
    }

    clickCancelBtn(){
        /*
            Click Cancel button in editing contact modal
        */
        this.contactCancelBtn.click();
    }

    getContactFirstName(){
        return this.contactFirstNameInput.getValue();
    }

    getContactLastName(){
        return this.contactLastNameInput.getValue();
    }

    getContactMobilePhone(){
        return this.contactMobilePhoneInput.getValue();
    }

    getScheduleByWhen(time){
        let scheduleData = [];
        let clientColSeletor = clientCol.replace('%time', time);
        scheduleData['clientName'] = new UIObject(clientColSeletor).getText();

        return scheduleData;
    }

}

module.exports = EditClient;