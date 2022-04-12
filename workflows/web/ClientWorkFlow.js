const ClientPage = require('../../pom/web/clients/Client');
const AddClientPage = require('../../pom/web/clients/AddClient');
const EditClientPage = require('../../pom/web/clients/EditClient');
const assert = require('assert');

class ClientWorkFlow{
    constructor(driver){
        this.browser = driver? driver: browser;
        this.ClientPage = new ClientPage(this.browser);
        this.AddClientPage = new AddClientPage(this.browser);
        this.EditClientPage = new EditClientPage(this.browser);
    }

    createNewClient(clientData, checkExisted=false){
        if(checkExisted && this.isClientExisted(clientData)){
            return;
        }
        this.ClientPage.clickNewClientBtn();
        this.inputForm(clientData);
        this.AddClientPage.clickSave();
        if(this.ClientPage.successModal.isDisplayed(20)){
            this.ClientPage.successModal.clickClose();
        }else{
            console.log("Click save again");
            this.AddClientPage.clickSave();
            this.ClientPage.successModal.clickClose();
        }
        
    }

    inputForm(clientData){
        this.AddClientPage.setClientNumber(clientData['clientNumber'])
                          .setFirstName(clientData['firstName'])
                          .setLastName(clientData['lastName'])
                          .setEmail(clientData['email'])
                          .setHomePhone(clientData['homePhone'])
                          .setAddress(clientData['address'])
                          .setBranch(clientData['branch'])
                          .selectPrimaryOffice(clientData['primaryOffice'])
                          .setMobilePhone(clientData['mobilePhone'])
                          .setDateOfBirth(clientData['dateOfBirth'])
                          .setEmailLogin(clientData['emailLogin'])
                          .setPhoneLogin(clientData['phoneLogin']);
        clientData['group'].split(',').forEach(group => {
            this.AddClientPage.checkGroup(group)
        });
    }

    deleteClient(clientData){
        if(!this.isClientExisted(clientData)){
            return;
        }        
        this.ClientPage.clientTable.search(clientData.firstName + ' ' + clientData.lastName);
        this.ClientPage.clickDeleteClient(clientData.firstName + ' ' + clientData.lastName);
        this.ClientPage.confirmModal.clickDelete();
        this.ClientPage.successModal.clickClose();
    }

    startVideoCall(){
        console.log("Start video call");
        this.ClientPage.clickStartVideoCall();
    }

    isClientExisted(clientData){
        this.ClientPage.clientTable.search(clientData.firstName + ' ' + clientData.lastName);
        return this.ClientPage.isClientExisted(clientData.firstName + ' ' + clientData.lastName);
    }

    getClientDetails(){
        let clientData = {};
        clientData['clientNumber'] = this.EditClientPage.getClientNumber();
        clientData['firstName'] = this.EditClientPage.getFirstName();
        clientData['lastName'] = this.EditClientPage.getLastName();
        clientData['email'] = this.EditClientPage.getEmail();
        clientData['homePhone'] = this.EditClientPage.getHomePhone();
        clientData['branch'] = this.EditClientPage.getBranch();
        clientData['primaryOffice'] = this.EditClientPage.getPrimaryOffice();
        clientData['mobilePhone'] = this.EditClientPage.getMobilePhone();
        clientData['emailLogin'] = this.EditClientPage.getEmailLogin();
        clientData['phoneLogin'] = this.EditClientPage.getPhoneLogin();
        return clientData;
    }

    addContact(contactData){
        this.EditClientPage.clickAddContact()
                           .setContactFirstName(contactData['firstName'])
                           .setContactLastName(contactData['lastName'])
                           .setContactMobilePhone(contactData['mobilePhone'])
                           .clickSaveContact();
        this.EditClientPage.waitForSpinerGone();
        this.EditClientPage.contactSuccessModal.clickClose()
    }

    isContactExisted(contactData){
        let isContactExisted = this.EditClientPage.isContactExisted(contactData.firstName + ' ' + contactData.lastName);        
        // Handle issue in multiremote running
        // It return array instead of string
        if(Array.isArray(isContactExisted)){
            isContactExisted = isContactExisted[0];
        }
        console.log(isContactExisted);
        return isContactExisted;    
    }

    deleteContact(contactData, checkExisted=false){
        
        // Handle issue in multiremote running
        // It return array instead of string
        let isContactExisted = this.isContactExisted(contactData);
        if(Array.isArray(isContactExisted)){
            isContactExisted = isContactExisted[0]; //(isDisplayed[0] === 'true');
        }
        if(checkExisted && !isContactExisted){
            // if record is not existed, then return.
            return;
        }
        this.EditClientPage.clickDeleteContact(contactData.firstName + ' ' + contactData.lastName);
        this.EditClientPage.contactConfirmModal.clickConfirm();
    }

    getContactInformation(){
        const contactData = [];
        contactData['firstName'] = this.EditClientPage.getContactFirstName();
        contactData['lastName'] = this.EditClientPage.getContactLastName();
        contactData['mobilePhone'] = this.EditClientPage.getContactMobilePhone();
        this.EditClientPage.clickCancelBtn();
        return contactData;
    }

    checkClientInformation(clientData){
        this.EditClientPage.clickTab('Details');
        this.EditClientPage.waitForSpinerGone();
        const dataPresented = this.getClientDetails();
        Object.keys(dataPresented).forEach(function(key) {
            assert.ok(clientData[key] == dataPresented[key],
                "Client information is not expected. Expected: " + clientData[key] + ' - Actual: '+ dataPresented[key]);
        });
    }

    checkContactInformation(contactData){
        this.EditClientPage.waitForSpinerGone();
        const dataPresented = this.getContactInformation();
        Object.keys(dataPresented).forEach(function(key) {
            assert.ok(contactData[key] == dataPresented[key],
                "Contact information is not expected. Expected: " + contactData[key] + ' - Actual: '+ dataPresented[key]);
        });
    }

    getClientUserId(clientName){
        /*
            Return user_id of specific client
        */
       console.log("Client Name " + clientName);
        this.ClientPage.goToPage();
        this.ClientPage.clientTable.search(clientName)
        this.ClientPage.clickEditClient(clientName)
        return this.ClientPage.getClientUserId();
    }

    isSchedulePresented(scheduleData){
        let scheduleTime = scheduleData['Schedule_time']; // 5:20:10 PM
        scheduleTime = scheduleTime.split(':').splice(0,2); // [5, 20]

        let schedulePresented = this.EditClientPage.getScheduleByWhen(scheduleTime[0] + ":" + scheduleTime[1]);
        assert.ok(schedulePresented['clientName'] == scheduleData['Client_name'],
        'Schedule is not imported successfully. Expected client ' + scheduleData['Client_name'] + ' - Actual ' + schedulePresented['clientName']);
    }

    deleteAutomationClient(){
        this.ClientPage.goToPage();
        this.ClientPage.clientTable.search('Automation');
        const usernames = this.ClientPage.clientTable.getListName();
        for (let index = 0; index < usernames.length; index++) {
            const name = usernames[index];
            this.ClientPage.clientTable.search(name);
            this.ClientPage.clickDeleteClient(name);
            this.ClientPage.confirmModal.clickDelete();
            this.ClientPage.successModal.clickClose();
        }
    }

}

module.exports = ClientWorkFlow;