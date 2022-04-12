const UserPage = require('../../pom/web/User');
const NAME_TR = "//td[contains(text(),'%s')]";
const assert = require('assert');
const UIObject = require('../../components/web/UIObject');

class UserWorkFlow{
    constructor(driver){
        this.browser = driver? driver:this.browser;
        this.UserPage = new UserPage(this.browser);
    }

    createNewUser(userData, cancel=false, checkExisted=false){
        if(checkExisted && this.isUserExisted(userData)){
            return;
        }
        this.UserPage.clickNewUserBtn()
        this.inputForm(userData);
        if(cancel){
            this.UserPage.clickCancel();
            return;
        }
        this.UserPage.clickSave()                 
    }

    editUser(userData, cancel=false){
        //Click edit user in grid base on name
        this.UserPage.clickEditUser('(' + userData.email + ')');
        this.inputForm(userData);
        if(cancel){
            this.UserPage.clickCancel();
            return;
        }
        this.UserPage.clickSave()         
    }

    inputForm(userData){
        this.UserPage.setFirstName(userData['firstName'])
                     .setLastName(userData['lastName'])
                     .setEmail(userData['email'])
                     .setPhone(userData['phone'])
                     .selectUserType(userData['userType'])
                     .setRole(userData['role']);
        if(userData['group']){
            userData['group'].split(',').forEach(group => {
                this.UserPage.checkGroup(group)
            });
        }
                        
    }

    getUserForm(){
        let userData = {};
        userData['firstName'] = this.UserPage.getFirstName();
        userData['lastName'] = this.UserPage.getLastName();
        userData['email'] = this.UserPage.getEmail();
        userData['phone'] = this.UserPage.getPhone();
        userData['userType'] = this.UserPage.getUserType();
        userData['role'] = this.UserPage.getRole();
        userData['group'] = this.UserPage.getGroup();
        return userData;
    }

    deleteUser(userData){
        if(!this.isUserExisted(userData)){
            return;
        }
        this.UserPage.userTable.search(userData.firstName + ' ' + userData.lastName + ' (' + userData.email);
        this.UserPage.clickDeleteUser(userData.firstName);
        // if(userData.userType != 'Manager' && userData.userType != 'Service'){
        //     this.UserPage.successModal.clickClose();
        // }
        // else{
        //     this.UserPage.deleteModal.clickDelete();
        // }
        this.UserPage.deleteModal.clickDelete();
        this.UserPage.successModal.clickClose();
    }

    checkUserPresented(name=""){
        // Check if user presented in user grid
        this.UserPage.userTable.search(name);
        let nameSelector = NAME_TR.replace('%s', name);
        expect(new UIObject(nameSelector).getElement()).toBeDisplayed({ message: 'User ' + name + 'is not displayed in grid'});
    }

    checkUserNotPresented(name=""){
        // Check if user not presented in user grid
        this.UserPage.userTable.search(name);
        let nameSelector = NAME_TR.replace('%s', name);
        expect(new UIObject(nameSelector).getElement()).not.toBeDisplayed({ message: 'User ' + name + 'is displayed in grid'});
    }

    isUserExisted(userData){
        this.UserPage.userTable.search(userData.firstName + ' ' + userData.lastName + ' (' + userData.email);
        return this.UserPage.isUserExisted(userData.firstName + ' ' + userData.lastName);
    }

    checkUserInformation(userData){
        const dataPresented = this.getUserForm();
        Object.keys(userData).forEach(function(key) {
            assert.ok(userData[key] == dataPresented[key],
                "User information is not expected. Expected: " + userData[key] + ' - Actual: '+ dataPresented[key]);
        });
    }

    get10MinEmail(){
        browser.newWindow('https://10minutemail.net/');
        // Expected 2 handles will be presented
        this.UserPage.waitForNewTabOpened(2);
        let handle = browser.getWindowHandles();
        browser.switchToWindow(handle[1]);
        
        const renewEmailBtn = new UIObject("//div[@id='d_clip_button']/following-sibling::*/li//i[contains(@class, 'fa-user-secret')]");
        renewEmailBtn.click();
        browser.pause(1000);
        const emailElement = new UIObject('#fe_text');
        const tempEmailAddress = emailElement.getValue()

        // switch to hayylo page
        browser.switchToWindow(handle[0]);
        return tempEmailAddress;
    }

    confirm10MinEmail(){
        const handle = browser.getWindowHandles();
        let isReceiveEmail = false;
        // switch to 10minute tab
        browser.switchToWindow(handle[1]);
        const invitationEmailTitle = new UIObject("//table[@id='maillist']//td[contains(text(), 'hayylo <notifications@hayylo.com>')]");
        for (let index = 0; index < 20; index++) {
            if(invitationEmailTitle.isDisplayed(10))
            {
                invitationEmailTitle.click();
                this.activeUser();
                isReceiveEmail = true;
                break;
            }
            browser.refresh();
        }
        if(!isReceiveEmail)
        {
            // Incase not receive invitation email, close this tab
            browser.closeWindow();

            // switch to hayylo admin page
            browser.switchToWindow(handle[0]);
        }
        assert.ok(isReceiveEmail,"Email invitation was not sent");
    }

    activeUser(){
        const getStartedBtn = new UIObject("//center//td/a[text()='Get Started']");
        getStartedBtn.click();
        
        // Expected 3 handles will be presented: hayylo, 10minute, active page
        this.UserPage.waitForNewTabOpened(3);
        let handle = browser.getWindowHandles();

        // switch to user active tab to set new password
        browser.switchToWindow(handle[2]);
        
        // get default password from ./data/features/web/default
        const defaultPasswd = testConfig.defaultPassword;
        if(!this.UserPage.newPasswdInput.isDisplayed(10)){
            let currentUrl = browser.getUrl();
            console.log(currentUrl);
            currentUrl = currentUrl.replace('atc.hayylo.com', "app.hayylo.com");
            console.log(currentUrl);
            browser.url(currentUrl);
        }
        this.UserPage.setActivePasswd(defaultPasswd);
        this.UserPage.setConfirmActivePasswd(defaultPasswd);
        this.UserPage.clickSubmitActiveUser();
    }

    deleteAutomationUser(){
        this.UserPage.goToPage();
        this.UserPage.userTable.search('Automation');
        const usernames = this.UserPage.userTable.getListName();
        for (let index = 0; index < usernames.length; index++) {
            const name = usernames[index];
            this.UserPage.userTable.search(name);
            this.UserPage.clickDeleteUser(name);
            this.UserPage.deleteModal.clickDelete();
            this.UserPage.successModal.clickClose();
        }
    }
}

module.exports = UserWorkFlow;