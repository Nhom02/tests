const PageObject = require('../../../components/web/PageObject');
const UIObject = require('../../../components/web/UIObject');
const Table = require('../../../components/web/table/Table');
const Combobox = require('../../../components/web/form/Combobox');
const Modal = require('../../../components/web/modal/Modal');
const LEFT_NAV_ITEM = "Clients";
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
const BRANCH = "#custom01"
let group = "//*[text()='%s']//div[@class='cbr-state']";
const SAVE_BTN = "[name='save']";
const SMART_NOTIFICATIONS = '#is_change_notification'; 
const SMART_ACTIONS = '#is_auto_create_action';
const DELETE_MODAL = '#modal-delete';
const SUCCESS_MODAL = '.success';

class AddClient extends PageObject{
    constructor(driver){
        super(LEFT_NAV_ITEM, '', driver);
        this.browser = driver? driver: browser;
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
        this.deleteModal = new Modal(DELETE_MODAL);
        this.successModal = new Modal(SUCCESS_MODAL);
        this.saveBtn = new UIObject(SAVE_BTN);
        this.branchInput = new UIObject(BRANCH);
    }

    setClientNumber(clientNumber){
        if(this.clientNumber.isDisplayed(1)){
            this.clientNumber.setText(clientNumber);
        }
        return this;
    }

    setFirstName(firstName){
        this.firstNameInput.setText(firstName);
        return this;
    }

    setLastName(lastName){
        this.lastNameInput.setText(lastName)
        return this;
    }

    setEmail(email){
        this.emailInput.setText(email);
        return this;
    }

    setHomePhone(phone){
        this.homePhoneInput.setText(phone);
        return this;
    } 
    
    setAddress(address){
        this.addressInput.setText(address);
        return this;
    }  

    setBranch(branch){
        this.branchInput.setText(branch);
        return this;
    }

    selectPrimaryOffice(primaryOffice){
        this.primaryOffice.selectByText(primaryOffice);
        return this;
    }

    setMobilePhone(phone){
        this.mobilePhoneInput.setText(phone);
        return this;
    } 

    setDateOfBirth(dateOfBirth){
        this.dateOfBirth.setText(dateOfBirth);
        return this;
    } 


    setEmailLogin(email){
        this.emailLoginInput.setText(email);
        return this;
    } 

    setPhoneLogin(phone){
        this.phoneLoginInput.setText(phone);
        return this;
    } 

    clickSave(){
        this.saveBtn.click();
        if(this.saveBtn.getElement().isClickable()){
            this.saveBtn.click();
        }
        return;
    }    

    checkGroup(groupName){
        // groupName ex: Default
        let checkGroupSelector = group.replace('%s', groupName);
        new UIObject(checkGroupSelector).click();
    }

}

module.exports = AddClient;