const UIObject = require('../../../components/web/UIObject');
const PageObject = require('../../../components/web/PageObject');
const Table = require('../../../components/web/table/Table');
const Combobox = require('../../../components/web/form/Combobox');
const Modal = require('../../../components/web/modal/Modal');
const RIGHT_NAV_ITEM = "Company";
//-----------------------Company Profiles--------------
const COMPANY_NAME = "[name='company_name']";
const COMPANY_CODE = "[name='company_code']";
const TRADE_NAME = "[name='trade_name']";
const ABN_CODE = "[name='abn_code']";
const COMPANY_ADDRESS = "[name='address1']";
const COMPANY_TELEPHONE = "[name='phone1']";
const COMPANY_EMAIL = '[name="email"]';
const COMPANY_WEBSITE = '[name="website"]';


//-----------------------Contact Person----------------
const CONTACT_NAME = "[name='contact_name']";
const CONTACT_TELEPHONE = "[name='contact_phone']";
const CONTACT_EMAIL = "[name='contact_email']";
const CONTACT_TITLE = "[name='contact_title']";

//-----------------------Settings-----------------------
let companyFeatureCheckbox = "//*[contains(text(),'%s')]/preceding-sibling::*[1]";

const SAVE_BTN = "#save";

class AddCompany extends PageObject{
    constructor(){
        super(RIGHT_NAV_ITEM);
        this.companyName = new UIObject(COMPANY_NAME);
        this.companyCode = new UIObject(COMPANY_CODE);
        this.tradeName = new UIObject(TRADE_NAME);
        this.abnCode = new UIObject(ABN_CODE);
        this.companyAddress = new UIObject(COMPANY_ADDRESS);
        this.companyTelephone = new UIObject(COMPANY_TELEPHONE);
        this.companyEmail = new UIObject(COMPANY_EMAIL);
        this.companyWebsite = new UIObject(COMPANY_WEBSITE);
        this.contactName = new UIObject(CONTACT_NAME);
        this.contactTelephone = new UIObject(CONTACT_TELEPHONE);
        this.contactEmail = new UIObject(CONTACT_EMAIL);
        this.contactTitle = new Combobox(CONTACT_TITLE);
        this.saveBtn = new UIObject(SAVE_BTN);
    }

    setCompanyName(name){
        this.companyName.setText(name);
        return this;
    }

    setCompanyCode(code){
        this.companyCode.setText(code);
        return this;
    }

    setCompanyTrade(tradeName){
        this.tradeName.setText(tradeName);
        return this;
    }

    setCompanyABNCode(code){
        this.abnCode.setText(code);
        return this;
    }

    setCompanyAddress(address){
        this.companyAddress.setText(address);
        return this;
    }

    setCompanyTelephone(phone){
        this.companyTelephone.setText(phone);
        return this;
    }

    setCompanyEmail(email){
        this.companyEmail.setText(email);
        return this;
    }

    setCompanyWebsite(website){
        this.companyWebsite.setText(website);
        return this;
    }

    setContactName(name){
        this.contactName.setText(name);
        return this;
    }

    setContactTelephone(phone){
        this.contactTelephone.setText(phone);
        return this;
    }

    setContactEmail(email){
        this.contactEmail.setText(email);
        return this;
    }

    selectContactTitle(title){
        this.contactTitle.selectByText(title);
        return this;
    }

    clickSave(){
        this.saveBtn.click();
        return this;
    }

    checkCompanyFeature(feature){
        let companyFeatureCheckboxSelector = companyFeatureCheckbox.replace('%s', feature);
        const companyFeature =  new UIObject(companyFeatureCheckboxSelector);
        if(!companyFeature.getClassName().includes("check")){
            companyFeature.click();
        }
        return this;        
    }
    
    unCheckCompanyFeature(feature){
        let companyFeatureCheckboxSelector = companyFeatureCheckbox.replace('%s', feature);
        const companyFeature =  new UIObject(companyFeatureCheckboxSelector);
        if(companyFeature.getClassName().includes("check")){
            companyFeature.click();
        }
        return this; 
    }

}

module.exports = AddCompany;