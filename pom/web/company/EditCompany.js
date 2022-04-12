const PageObject = require('../../../components/web/PageObject');
const UIObject = require('../../../components/web/UIObject');
const Table = require('../../../components/web/table/Table');
const Combobox = require('../../../components/web/form/Combobox');
const Modal = require('../../../components/web/modal/Modal');
const RIGHT_NAV_ITEM = "Company";
const Nav = require('../../../components/web/Nav');
const Checkbox = require('../../../components/web/form/Checkbox');
const UploadFile = require('../../../components/web/form/UploadFile')

const ADD_COMPANY_TAB = ".//li//span[text()='Add a Company']";
const SERVICE_TYPE_TAB = ".//li//span[text()='Service Type']";
const IMPORT_DATA_TAB = '//a[@href="#import_data"]'
const ACTION_CUSTOM_FILTER = '#action_custom01_filter_title';

//-------------------------Add a company Tab
const SAVE_BTN = "#save";
let companyFeatureCheckbox = "//*[contains(text(),'%s')]/preceding-sibling::*[1]";

//-------------------------Import Data tab----------------------
const DOWNLOAD_EXTERNAL_TEMPLATE_BTN = '//a[text()="External Request Template"]';
const IMPORT_EXTERNAL_FILE = '#file_data_import';

const COMPANY_TAB_SELECTOR = {
    'Add a Company': ADD_COMPANY_TAB,
    'Service Type': SERVICE_TYPE_TAB,
    'Import Data': IMPORT_DATA_TAB
}

class EditCompany extends PageObject{
    constructor(driver){
        super(RIGHT_NAV_ITEM, "", driver);
        this.browser = driver? driver: browser;
        this.addCompanyTab = new UIObject(ADD_COMPANY_TAB);
        this.saveCompany = new UIObject(SAVE_BTN);
        this.customValueFilter = new UIObject(ACTION_CUSTOM_FILTER);
        this.downloadExternalTemplateBtn = new UIObject(DOWNLOAD_EXTERNAL_TEMPLATE_BTN, this.browser);
        this.importExternalFile = new UploadFile(IMPORT_EXTERNAL_FILE, this.browser);
    }

    clickSaveCompany(){
        this.saveCompany.click();
    }

    clickAddCompanyTab(){
        this.addCompanyTab.click();
    }

    setCustomFilter(customValue){
        this.customValueFilter.setText(customValue);
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

    getCompanyFeatureElement(feature){
        let companyFeatureCheckboxSelector = companyFeatureCheckbox.replace('%s', feature);
        const companyFeature =  new UIObject(companyFeatureCheckboxSelector);
        return companyFeature.getElement();          
    }

    clickTab(tabName){
        new UIObject(COMPANY_TAB_SELECTOR[tabName], this.browser).click();
    }

    clickExternalRequestTemplate(){
        this.downloadExternalTemplateBtn.click();
    }

    importExternalExcelData(path){
        this.importExternalFile.uploadFile(path);
    }
}

module.exports = EditCompany;