const PageObject = require('../../components/web/PageObject');
const UIOBject = require('../../components/web/UIObject');
const Table = require('../../components/web/table/Table');
const Combobox = require('../../components/web/form/Combobox');
const Modal = require('../../components/web/modal/Modal');
const LEFT_NAV_ITEM = "Workers";
const WORKER_TABLE = "#place-manager";
let editWorkerBtn = "//a[contains(text(), '%s')]/parent::*/following-sibling::*/a[@class='fa-user']";
let deleteWorkertBtn = "//a[contains(text(), '%s')]/parent::*/following-sibling::*/a[@class='fa-trash-o']";
const NEW_WORKER_BTN = "//span[text()='Add New']";
const SUCCESS_MODAL = '.success';
const CONFIRM_MODAL = '#modal-confirm';
const EMPLOYEE_NUMBER = "[name='worker_code']";
const GROUP = "#group_idSelectBoxItContainer";
let groupOption = "//ul[@id='group_idSelectBoxItOptions']//a[text()='%s']";
const EMAIL_LOGIN = "[name='email']";
const FIRST_NAME = "[name='first_name']";
const LAST_NAME = "[name='last_name']";
const MOBILE_PHONE = "[name='phone_number']";
let service = "//*[text()='%s']//div[@class='cbr-state']";
const SAVE_BTN = "[name='save']";
const SERVICE_TITLE = "//*[@class='wktitle' and text()='Assign Service']";

//-------------------Worker Details ----------------------
const ACTION_TAB = '#worker-actions';
const ACTION_COMPONENT = '//hayylo-action';
const CANCEN_BTN = '#cancel';
const SERVICE_CHECKED = "//div[contains(@class, 'cbr-checked')]/parent::*";

//-------------------Schedule tab -------------------------
const workerCol = "//*[text()[normalize-space(.)='Today']/following-sibling::node()[1][self::br]/following-sibling::node()[1][self::text()[contains(normalize-space(.),'%time')]]]/following-sibling::*[1]";

const DETAIL_TAB = 'a[href="#worker_details"]';
const SCHEDULE_TAB = 'a[href="#schedule"]';
const WORKER_TAB_SELECTOR = {
    'Actions': ACTION_TAB,
    'Worker Details': DETAIL_TAB,
    'Schedules': SCHEDULE_TAB
}

class Worker extends PageObject{
    constructor(driver){
        super(LEFT_NAV_ITEM, "", driver);
        this.browser = driver? driver: browser;
        this.workerTable = new Table(WORKER_TABLE, this.browser);
        this.newWorkerBtn = new UIOBject(NEW_WORKER_BTN);
        this.successModal = new Modal(SUCCESS_MODAL);
        this.confirmModal = new Modal(CONFIRM_MODAL);
        this.employeeNumberInput = new UIOBject(EMPLOYEE_NUMBER);
        this.emailLoginInput = new UIOBject(EMAIL_LOGIN);
        this.firstNameInput = new UIOBject(FIRST_NAME);
        this.lastNameInput = new UIOBject(LAST_NAME);
        this.mobilePhoneInput = new UIOBject(MOBILE_PHONE);
        this.saveBtn = new UIOBject(SAVE_BTN);
        this.groupSelect = new UIOBject(GROUP);
        this.actionTab = new UIOBject(ACTION_TAB);
        this.actionComponent = new UIOBject(ACTION_COMPONENT);
        this.serviceTitle = new UIObject(SERVICE_TITLE);
        this.serviceChecked = new UIObject(SERVICE_CHECKED);
        this.cancelBtn = new UIOBject(CANCEN_BTN);
    }

    clickEditWorker(name){
        let editWorkerBtnSeletor = editWorkerBtn.replace('%s', name);
        new UIObject(editWorkerBtnSeletor, this.browser).click();
        return this;
    }

    clickDeleteWorker(name){
        let deleteWorkerBtnSeletor = deleteWorkertBtn.replace('%s', name);
        new UIObject(deleteWorkerBtnSeletor).click();
        return this;
    }

    clickNewWorkerBtn(){
        this.newWorkerBtn.click()
        return this;
    }

    checkService(serviceName){
        // serviceName ex: Default
        if(this.serviceTitle.isDisplayed()){
            let checkServiceSelector = service.replace('%s', serviceName);
            new UIObject(checkServiceSelector).click();
            return this;
        }
    }

    setEmployeeNumber(employeeNumber){
        this.employeeNumberInput.setText(employeeNumber);
        return this;
    }

    setEmailLogin(email){
        this.emailLoginInput.setText(email);
        return this;
    }

    setFirstName(firstName){
        this.firstNameInput.setText(firstName);
        return this;
    }

    setLastName(lastName){
        this.lastNameInput.setText(lastName);
        return this;
    }

    selectGroup(group){
        this.groupSelect.click();
        let groupOptionSeletor = groupOption.replace('%s', group);
        new UIObject(groupOptionSeletor).click();
        return this;
    }

    setMobilePhone(mobilePhone){
        this.mobilePhoneInput.setText(mobilePhone);
        return this;
    }

    clickSave(){
        this.saveBtn.click();
        return this;
    }

    clickActionTab(){
        this.actionTab.click();
        return this;
    }

    isWorkerExisted(name){
        let editWorkerBtnSeletor = editWorkerBtn.replace('%s', name);
        return new UIObject(editWorkerBtnSeletor).getElement().isDisplayed();       
    }

    getDeleteBtn(name){
        let deleteWorkerBtnSeletor = deleteWorkertBtn.replace('%s', name);
        return new UIObject(deleteWorkerBtnSeletor);
    }

    getEmployeeNumber(){
        return this.employeeNumberInput.getValue();
    }
        
    getGroup(){
        return this.groupSelect.getText();
    }

    getEmailLogin(){
        return this.emailLoginInput.getValue();
    }

    getFirstName(){
        return this.firstNameInput.getValue();
    }

    getLastName(){
        return this.lastNameInput.getValue();
    }

    getMobilePhone(){
        return this.mobilePhoneInput.getValue();
    }

    getPrimaryOffice(){
        return this.getPrimaryOffice.getText();
    }

    getServices(){
        let services = '';
        if(this.serviceTitle.isDisplayed()){
            services = [];
            const serviceCheckedElements = this.serviceChecked.getElements();
            for (let index = 0; index < serviceCheckedElements.length; index++) {
                const element = serviceCheckedElements[index];
                services.push(element.getText());
            }
            services = services.toString();
        }
        return services;
    }

    clickCancel(){
        this.cancelBtn.click();
    }

    getWorkerUserId(){
        let editUrl = this.browser.getUrl();
        // get last element after / slash
        let editUserId = editUrl.split("/").slice(-1)[0];
        return editUserId;
    }

    clickTab(tabName){
        new UIOBject(WORKER_TAB_SELECTOR[tabName]).click();
    }

    getScheduleByWhen(time){
        let scheduleData = [];
        let workerColSeletor = workerCol.replace('%time', time);
        scheduleData['workerName'] = new UIObject(workerColSeletor).getText();

        return scheduleData;
    }
}

module.exports = Worker;