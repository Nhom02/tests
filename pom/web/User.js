const PageObject = require('../../components/web/PageObject');
const UIObject = require('../../components/web/UIObject');
const Table = require('../../components/web/table/Table');
const Combobox = require('../../components/web/form/Combobox');
const Modal = require('../../components/web/modal/Modal');

const NEW_USER_BTN = "//span[text()='New User']";
const FIRST_NAME = "[name='first_name']";
const LAST_NAME = "[name='last_name']";
const EMAIL = "[name='email']";
const PHONE = "[name='phone_number']";
const USER_TYPE = "#user_type";
const ROLE = "[name='role_content']";
const SAVE_BTN = "[name='save']";
const CANCEL_BTN = "[name='cancel']";
const LEFT_NAV_ITEM = "Users";
const USER_TABLE = "#place-manager";
const DELETE_MODAL = '#modal-delete'
const SUCCESS_MODAL = '.success';
const GROUP_TITLE = '.wktitle';
const GROUP_CHECKED = "//div[contains(@class, 'cbr-checked')]/parent::*";
let editUserBtn = "//td[contains(text(), '%s')]/following-sibling::*/a[@class='fa-user']";
let deleteUserBtn = "//td[contains(text(), '%s')]/following-sibling::*/a[@class='fa-trash-o']";
let userName = "//td[contains(text(), '%s')]";
let groupCheckBox = "//*[text()='%s']//div[@class='cbr-state']";

//-----------------------------Active page----------------
const NEW_PASSWD = '[name="passwd"]';
const CONFIRM_PASSWD = '[name="new_passwd"]';
const SUBMIT_BTN = "//form[@name='activeForm']//button[@type='submit']";

class User extends PageObject{

    constructor(driver){
        super(LEFT_NAV_ITEM, '', driver);
        this.newUserBtn = new UIObject(NEW_USER_BTN);
        this.userTable = new Table(USER_TABLE, driver);
        this.firstNameInput = new UIObject(FIRST_NAME);
        this.lastNameInput = new UIObject(LAST_NAME);
        this.emailInput = new UIObject(EMAIL);
        this.phoneInput = new UIObject(PHONE);
        this.userType = new Combobox(USER_TYPE);
        this.roleInput = new UIObject(ROLE);
        this.cancelBtn = new UIObject(CANCEL_BTN);
        this.saveBtn = new UIObject(SAVE_BTN);
        this.deleteModal = new Modal(DELETE_MODAL, this.browser);
        this.successModal = new Modal(SUCCESS_MODAL, this.browser);
        this.groupTitle = new UIObject(GROUP_TITLE);
        this.groupChecked = new UIObject(GROUP_CHECKED);
        this.newPasswdInput = new UIObject(NEW_PASSWD);
        this.confirmPassedInput = new UIObject(CONFIRM_PASSWD);
        this.submitActiveUserBtn = new UIObject(SUBMIT_BTN);
    }

    clickNewUserBtn(){
        // $("//span[text()='New User']").click();
        this.newUserBtn.click();
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

    setPhone(phone){
        this.phoneInput.setText(phone);
        return this;
    }    

    selectUserType(userType){
        this.userType.setText(userType);
        return this;
    }

    setRole(role){
        this.roleInput.setText();
        return this;
    }

    clickSave(){
        this.saveBtn.click();
        return;
    }

    clickCancel(){
        this.cancelBtn.click();
        return;
    }

    clickEditUser(name){
        let editUserBtnSeletor = editUserBtn.replace('%s', name);
        new UIObject(editUserBtnSeletor).click();
    }

    clickDeleteUser(name){
        let editUserBtnSeletor = deleteUserBtn.replace('%s', name);
        new UIObject(editUserBtnSeletor, this.browser).click();
    }

    isUserPresented(name){
        this.userTable.search(name)
        let userNameSelector = userName.replace('%s', name);
        return new UIObject(userNameSelector).element.isDisplayed();
    }

    getFirstName(){
        //get First name value in edit user form
        return this.firstNameInput.getValue();
    }

    getLastName(){
        //get Last name value in edit user form
        return this.lastNameInput.getValue();
    }

    getEmail(){
        //get E-mail value in edit user form
        return this.emailInput.getValue();
    }

    getPhone(){
        //get Mobile Phone in edit user form
        return this.phoneInput.getValue();
    }

    getUserType(){
        // get User Type in edit user form
        return this.userType.getSelectedText();
    }

    getRole(){
        //get Role in edit user form
        return this.roleInput.getValue();
    }

    isUserExisted(name){
        let editUserBtnSeletor = editUserBtn.replace('%s', name);
        return new UIObject(editUserBtnSeletor).getElement().isDisplayed();        
    }

    checkGroup(groupName){
        // groupName ex: Default
        let checkGroupSelector = groupCheckBox.replace('%s', groupName);
        new UIObject(checkGroupSelector).click();
    }

    getGroup(){
        let group = '';
        if(this.groupTitle.isDisplayed()){
            group = [];
            const groupCheckedElements = this.groupChecked.getElements();
            for (let index = 0; index < groupCheckedElements.length; index++) {
                const element = groupCheckedElements[index];
                group.push(element.getText());
            }
            group = group.toString();
        }
        return group;
    }

    setActivePasswd(password){
        this.newPasswdInput.setText(password);
        return this;
    }

    setConfirmActivePasswd(password){
        this.confirmPassedInput.setText(password);
    }

    clickSubmitActiveUser(){
        this.submitActiveUserBtn.click();
    }

}

module.exports = User;