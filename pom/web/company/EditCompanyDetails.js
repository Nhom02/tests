const PageObject = require('../../../components/web/PageObject');
const UIObject = require('../../../components/web/UIObject');
const Table = require('../../../components/web/table/Table');
const Combobox = require('../../../components/web/form/Combobox');
const Modal = require('../../../components/web/modal/Modal');
const RIGHT_NAV_ITEM = "Edit Company Details";
const Nav = require('../../../components/web/Nav');
const Checkbox = require('../../../components/web/form/Checkbox');
const ACTION_TAB =  '#tab_action_menu';
const ACTION_CLIENT_TAB = '#li_tab_menu_action_web_client_faf';
const ACTION_WOKRER_TAB = '#li_tab_menu_action_web_worker';
const ACTION_APP_TAB = '#li_tab_menu_action_app_client_faf';
const CLIENT_OPTION_NAME = '#txt_add_menu_action_web_client_faf';
const WORKER_OPTION_NAME = '#txt_add_menu_action_web_worker';
const APP_OPTION_NAME = '#txt_add_menu_action_app_client_faf';
let saveMenuStructureBtn = ".//*[@id='%s']//fieldset/input[2]";
let addNewServiceTypeBtn = ".//*[@id='%s']//fieldset/fieldset//input[@value='Add new']";
let serviceTypeLi = ".//*[@id='%s']//ol[@id='%s']//span[contains(@id, 'span_title')]";
let serviceTypeNarrow = ".//*[@id='%s1']//ol//span[contains(text(), '%s2')]/following::span[1]/i";//".//*[@id='tab_menu_action_web_client_faf']//ol//span[text()='Message Received']/following::span[1]/i";
let serviceTypeSpanId = ".//*[@id='%s1']//ol//span[contains(text(), '%s2')]/following::span[1]";
const CLIENT_TAB = 'tab_menu_action_web_client_faf';
const WORKER_TAB = 'tab_menu_action_web_worker';
const APP_TAB = 'tab_menu_action_app_client_faf';
const ACTION_CLIENT_MENU = 'menu_action_web_client_faf';
const ACTION_WORKER_MENU = 'menu_action_web_worker';
const ACTION_APP_MENU = 'menu_action_app_client_faf';


// Sample serivce type service_title77777777menu_action_web_worker
// 77777777 => => get ID from serviceTypeNarrow
// menu_action_web_worker => ID of client/worker/app tab content
const SERVICE_NAME = "#service_title"; 
const SERVICE_TYPE = "#option_type";
const NUM_OF_DAYS = "#number_of_day_";
const ROUTING_GROUP = "#routing_group_"
const POST_TO_FEED = '#post_to_feed_';
const FOLLOW_UP = '#follow_up_';
const SERVICE_INSTRUCTION = '#service_instruction';
let deleteServiceTypeBtn = ".//input[@data-service-type-id='%s']";

const SERVICE_SELECTOR = {
    'client': ACTION_CLIENT_MENU,
    'worker': ACTION_WORKER_MENU,
    'app': ACTION_APP_MENU
}

const ACTION_TAB_SELECTOR = {
    'client': CLIENT_TAB,
    'worker': WORKER_TAB,
    'app': APP_TAB   
}

// -----------------------Company Profile Tab--------------------
const COMPANY_NAME = '[name="company_name"]';

class EditCompanyDetails extends PageObject{
    constructor(driver){
        super(RIGHT_NAV_ITEM, '', driver);
        this.browser = driver? driver: browser;
        this.actionTab = new UIObject(ACTION_TAB, this.browser);
        this.actionClientTab = new UIObject(ACTION_CLIENT_TAB, this.browser);
        this.actionWorkerTab = new UIObject(ACTION_WOKRER_TAB, this.browser);
        this.actionAppTab = new UIObject(ACTION_APP_TAB, this.browser);
        this.clientOptionNameInput = new UIObject(CLIENT_OPTION_NAME, this.browser);
        this.workerOptionNameInput = new UIObject(WORKER_OPTION_NAME, this.browser);
        this.appOptionNameInput = new UIObject(APP_OPTION_NAME, this.browser);
        this.companyName = new UIObject(COMPANY_NAME, this.browser)
    }

    goToPage()
    {
        //Used to go to child page.
        new Nav(this.browser).goToRightNav(RIGHT_NAV_ITEM);
        return this;
    }

    clickAddNewServiceType(type){
        let addNewServiceTypeBtnSelector = addNewServiceTypeBtn.replace('%s', ACTION_TAB_SELECTOR[type]);
        new UIObject(addNewServiceTypeBtnSelector, this.browser).click();
        return this;
    }

    clickSaveMenuStructure(type)
    {
        let saveMenuStructureSelector = saveMenuStructureBtn.replace('%s', ACTION_TAB_SELECTOR[type]);
        new UIObject(saveMenuStructureSelector, this.browser).click();
        return this;
    }

    setClientOptionName(serviceName){
        this.clientOptionNameInput.setText(serviceName);
        return this;
    }

    setWorkerOptionName(serviceName){
        this.workerOptionNameInput.setText(serviceName);
        return this;
    }

    setAppOptionName(serviceName){
        this.appOptionNameInput.setText(serviceName);
        return this;
    }

    setServiceName(serviceName, type, id){
        let serviceNameSelector = SERVICE_NAME + id + SERVICE_SELECTOR[type];
        new UIObject(serviceNameSelector, this.browser).setText(serviceName);
        return this;         
    }

    setServiceInstruction(serviceName, type, id){
        let serviceNameSelector = SERVICE_INSTRUCTION + id + SERVICE_SELECTOR[type];
        new UIObject(serviceNameSelector, this.browser).setText(serviceName);
        return this;         
    }

    selectServiceType(serviceType, type, id){
        let serviceTypeSelector = SERVICE_TYPE + id + SERVICE_SELECTOR[type];
        new Combobox(serviceTypeSelector, this.browser).selectByText(serviceType);
        return this;
    }

    checkFollowUp(check=true, type, id){
        let followUpSelector = FOLLOW_UP + id + SERVICE_SELECTOR[type];
        if(check) new Checkbox(followUpSelector).check();
        else new Checkbox(followUpSelector, this.browser).unCheck();
        return this;
    }

    checkPostToFeed(check=true, type, id){
        let postToFeedSelector = POST_TO_FEED + id + SERVICE_SELECTOR[type];
        if(check) new Checkbox(postToFeedSelector, this.browser).check();
        else new Checkbox(postToFeedSelector, this.browser).unCheck();
        return this;
    }

    setNumberOfDays(day, type, id){
        let numberOfDaysSelector = NUM_OF_DAYS + id + SERVICE_SELECTOR[type];
        new UIObject(numberOfDaysSelector, this.browser).setText(day);
        return this;
    }

    selectRoutingGroup(routingGroup, type, id){
        
        let routingGroupSelector = ROUTING_GROUP + id + SERVICE_SELECTOR[type];
        new Combobox(routingGroupSelector, this.browser).selectByText(routingGroup);
        return this;
    }

    clickDeleteServiceType(id){
        let deleteServiceTypeSelector = deleteServiceTypeBtn.replace('%s', id);
        new UIObject(deleteServiceTypeSelector, this.browser).click();
        return this;
    }

    clickOpenServiceType(serviceName, type){
        let actionSelector = ACTION_TAB_SELECTOR[type];
        let serviceTypeNarrowSelector = serviceTypeNarrow.replace('%s1', actionSelector).replace('%s2', serviceName);
        new UIObject(serviceTypeNarrowSelector, this.browser).click();
        return this;
    }

    getServiceTypeId(serviceName, type){
        let actionSelector = ACTION_TAB_SELECTOR[type];
        let serviceTypeSpanIdSelector = serviceTypeSpanId.replace('%s1', actionSelector).replace('%s2', serviceName);
        if(new UIObject(serviceTypeSpanIdSelector, this.browser).isDisplayed(5)){
            return new UIObject(serviceTypeSpanIdSelector, this.browser).getElement().getAttribute("data-id");
        }
        return false;
    }

    clickClientTab(){
        this.actionClientTab.click();
        return this;
    }

    clickWorkerTab(){
        this.actionWorkerTab.click();
        return this;
    }

    clickAppTab(){
        this.actionAppTab.click();
        return this;
    }

    clickActionTab(){
        this.actionTab.click();
        if(!this.actionTab.getClassName().includes('active')){
            this.actionTab.click();
        }
        return this;
    }

    getCompanyName(){
        return this.companyName.getValue();
    }
}

module.exports = EditCompanyDetails;