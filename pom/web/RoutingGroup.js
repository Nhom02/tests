const PageObject = require('../../components/web/PageObject');
const UIObject = require('../../components/web/UIObject');
const Table = require('../../components/web/table/Table');
const Combobox = require('../../components/web/form/Combobox');
const Modal = require('../../components/web/modal/Modal');
const LEFT_NAV_ITEM = "Routing Groups";

//------------------------Routing Group-----------------
const NEW_ROUTING_GROUP = "//span[text()='Add New']";
const ROUTING_GROUP_TABLE = "#datatable-routing_group";
let editGroupBtn = "//td[contains(text(), '%s')]/following-sibling::*//*[contains(@class,'fa-pencil-square-o')]";
let deleteGroupBtn = "//td[contains(text(), '%s')]/following-sibling::*//*[contains(@class,'fa-trash-o')]";
const DELETE_MODAL = '#modal-confirm-delete-routing';
const SUCCESS_MODAL = '.success';

//------------------------Create/Edit group--------------
const ROUTING_NAME = '#routing_group_name';
const ROUTING_STATUS = '#status';
const SEARCH_USER = '#search_user';
const SERVICE_USER_TABLE = '#datatable-service-user';
const SAVE_BTN = '#btn-save';
const CANCEL_BTN = '#btn-cancel';
const userSuggestion = ".//*[@class='autocomplete-suggestion']/strong[text() = '%s']"

class RoutingGroup extends PageObject{
    constructor(){
        super(LEFT_NAV_ITEM);
        this.routingGroupName = new UIObject(ROUTING_NAME);
        this.routingStatus = new Combobox(ROUTING_STATUS);
        this.searchUser = new UIObject(SEARCH_USER);
        this.saveBtn = new UIObject(SAVE_BTN);
        this.cancelBtn = new UIObject(CANCEL_BTN);
        this.serviceTable = new Table(SERVICE_USER_TABLE);
        this.routingGroupTable = new Table(ROUTING_GROUP_TABLE);
        this.newGroupBtn = new UIObject(NEW_ROUTING_GROUP);
        this.deleteModal = new Modal(DELETE_MODAL);
        this.successModal = new Modal(SUCCESS_MODAL);
    }

    setGroupName(name){
        this.routingGroupName.setText(name);
        return this;
    }

    selectStatus(status){
        this.routingStatus.selectByText(status);
        return this;
    }

    searchUser(user){
        this.searchUser.setText(user);
        let userSuggesstionSelector = userSuggestion.replace('%s', user);
        new UIObject(userSuggesstionSelector).click();
    }

    clickSaveBtn(){
        this.saveBtn.click();
        return this;
    }

    clickCancel(){
        this.cancelBtn.click();
        return this;
    }

    clickAddNew(){
        this.newGroupBtn.click();
        return this;
    }

    clickEditGroup(name){
        let editGroupBtnSeletor = editGroupBtn.replace('%s', name);
        new UIObject(editGroupBtnSeletor).click();
    }

    clickDeleteGroup(name){
        let editGroupBtnSeletor = deleteGroupBtn.replace('%s', name);
        new UIObject(editGroupBtnSeletor).click();
    }


    isGroupExisted(name){
        let editGroupBtnSeletor = editGroupBtn.replace('%s', name);
        return new UIObject(editGroupBtnSeletor).getElement().isDisplayed();        
    }

}

module.exports = RoutingGroup;