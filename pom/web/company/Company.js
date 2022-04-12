const PageObject = require('../../../components/web/PageObject');
const UIOBject = require('../../../components/web/UIObject');
const Table = require('../../../components/web/table/Table');
const Combobox = require('../../../components/web/form/Combobox');
const Modal = require('../../../components/web/modal/Modal');
const LEFT_NAV_ITEM = "Company";

const COMPANY_TABLE = "#place-manager";
let editCompanyBtn = "//td[contains(text(), '%s')]/following-sibling::*/a[@class='fa-user']";
let deleteCompanyBtn = "//td[contains(text(), '%s')]/following-sibling::*/a[@class='fa-trash-o']";
const NEW_TABLE_BTN = "//span[text()='Add New']";
const SUCCESS_MODAL = '.success';
const CONFIRM_MODAL = '#modal-confirm';

class Company extends PageObject{
    constructor(driver){
        super(LEFT_NAV_ITEM, "", driver);
        this.browser = driver? driver:browser;
        this.companyTable = new Table(COMPANY_TABLE);
        this.newCompanyBtn = new UIOBject(NEW_TABLE_BTN);
        this.successModal = new Modal(SUCCESS_MODAL);
        this.confirmModal = new Modal(CONFIRM_MODAL);
    }

    clickEditCompany(name){
        let editCompanyBtnSeletor = editCompanyBtn.replace('%s', name);
        new UIObject(editCompanyBtnSeletor, this.browser).click();
        return this;
    }

    clickDeleteCompany(name){
        let deleteCompanyBtnSeletor = deleteCompanyBtn.replace('%s', name);
        new UIObject(deleteCompanyBtnSeletor).click();
        return this;
    }

    clickNewCompanyBtn(){
        this.newCompanyBtn.click()
        return this;
    }

}

module.exports = Company;