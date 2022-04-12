const PageObject = require('../../components/web/PageObject');
const UIObject = require('../../components/web/UIObject');
const Table = require('../../components/web/table/Table');
const Combobox = require('../../components/web/form/Combobox')
const NEW_SERVICE_BTN = "//span[text()='New Service']";
const SERVICE_NAME = '#skill_name';
const SERVICE_DESC = '#description';
const SKILL_TYPE = '#skill_type_id';
let selectUserMember = "(//*[@id='ms-multi-select']//ul)[1]/li/span[contains(text(), '%s')]";
const SAVE_BTN = '#save';
const CANCEL_BTN = '#cancel';
const LEFT_NAV_ITEM = "Services";
const SERVICE_TABLE = '#place-manager';
let editServiceBtn = "//td[contains(text(), '%s')]/following-sibling::*/a[text()='Edit']";


class Service extends PageObject{
    constructor(driver){
        super(LEFT_NAV_ITEM, '', driver);
        this.serviceTable = new Table(SERVICE_TABLE, this.browser);
        this.newServiceBtn = new UIObject(NEW_SERVICE_BTN, this.browser);
        this.serviceNameInput = new UIObject(SERVICE_NAME, this.browser);
        this.serviceDescInput = new UIObject(SERVICE_DESC, this.browser);
        this.skillTypeSelect = new Combobox(SKILL_TYPE, this.browser);
        this.saveBtn = new UIObject(SAVE_BTN, this.browser);
    }

    clickNewService(){
        this.newServiceBtn.click();
    }

    setServiceName(name){
        this.serviceNameInput.setText(name);
    }

    setServiceDescription(decs){
        this.serviceDescInput.setText(decs);
    }

    selectSkillType(skillType){
        this.skillTypeSelect.selectByText(skillType);
    }

    clickSave(){
        this.saveBtn.click();
    }

    isServiceExisted(serviceName){
        let editServiceBtnSeletor = editServiceBtn.replace('%s', serviceName);
        return new UIObject(editServiceBtnSeletor, this.browser).getElement().isDisplayed(); 
    }

    selectUserMember(member){
        let selectUserMemberSeletor = selectUserMember.replace('%s', member);
        new UIObject(selectUserMemberSeletor, this.browser).click();        
    }
}

module.exports = Service;