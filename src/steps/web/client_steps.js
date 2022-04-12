const ClientWF = require('../../../workflows/web/ClientWorkFlow');
const scope = require('../../hooks/scope');
const {Given, Then, When} = require('cucumber');
const assert = require('assert');
const _browser = (typeof myBrowser !== 'undefined')? myBrowser:browser;
const ClientWorkFlow = new ClientWF(_browser);
const ActionWF = require('../../../workflows/web/ActionWorkFlow');
const ActionWorkFlow = new ActionWF(_browser);
// Given("I'm in Client Page", ()=>{
//     ClientWorkFlow.ClientPage.goToPage();
// })

When("I create client", (data)=>{
    if(!scope.context.hasOwnProperty("client")){
        scope.context.client = [];
    }
    data.hashes().forEach(clientData => {
        ClientWorkFlow.createNewClient(clientData);
        scope.context.client.push(clientData);
    });
})

When("I create client if not exist", (data)=>{
    if(!scope.context.hasOwnProperty("client")){
        scope.context.client = [];
    }
    data.hashes().forEach(clientData => {
        ClientWorkFlow.createNewClient(clientData, true);
        scope.context.client.push(clientData);
    });
})

When("I delete client", ()=>{
    const clientCreated = scope.context.client
    ClientWorkFlow.ClientPage.goToPage();
    clientCreated.forEach(clientData => {
        ClientWorkFlow.deleteClient(clientData)
    });
    
})

When("Create new action is opened in client {string} details", (client)=>{
    ClientWorkFlow.ClientPage.clientTable.waitForProcessingMessageGone();
    ClientWorkFlow.ClientPage.clickEditClient(client);
    ClientWorkFlow.ClientPage.waitForSpinerGone();
    ClientWorkFlow.EditClientPage.clickTab('Action');
    ActionWorkFlow.ActionPage.clickCreateAction();
});

Then("The Create an action for screen is not shown", ()=>{
    expect(ActionWorkFlow.ActionPage.createActionForHeader.getElement()).not.toBeDisplayed({ message: 'Create an action for screen is shown', });
    ActionWorkFlow.ActionPage.clickCloseAction();
});

Then("The Search for a client screen is not shown", ()=>{
    expect(ActionWorkFlow.ActionPage.searchForClientHeader.getElement()).not.toBeDisplayed({ message: 'The Search for a worker screen is shown', });
    ActionWorkFlow.ActionPage.clickCloseAction();
});

When("I go to client {string} details page", (client)=>{
    ClientWorkFlow.ClientPage.clientTable.waitForProcessingMessageGone();
    ClientWorkFlow.ClientPage.clickEditClient(client);
    ClientWorkFlow.ClientPage.waitForSpinerGone();
    ClientWorkFlow.EditClientPage.clickTab('Action');
    ClientWorkFlow.ClientPage.waitForSpinerGone();
});

Then("There will be a Action tab in client container", ()=>{
    expect(ClientWorkFlow.EditClientPage.actionTab.getElement()).toBeDisplayed({ message: 'Action tab in client container is not shown', });
});

Then("I can allows viewing all of the action of selected client", ()=>{
    expect(ClientWorkFlow.EditClientPage.actionComponent.getElement()).toBeDisplayed({ message: 'Action content in client container is not shown', });
});

When("I go to action tab in Client details", ()=>{
    ClientWorkFlow.ClientPage.waitForSpinerGone();
    ClientWorkFlow.EditClientPage.clickTab('Action');
    ClientWorkFlow.ClientPage.waitForSpinerGone();
});

Then('The information of this client should be displayed as same the input data', ()=>{
    let clientData = scope.context.client.slice(-1)[0];
    assert.ok(ClientWorkFlow.isClientExisted(clientData),
    'User ' + clientData.firstName + ' is not displayed');

    // The Name, User Type, Role should be displayed as same as the updated
    ClientWorkFlow.ClientPage.clickEditClient(clientData.firstName + ' ' + clientData.lastName);
    ClientWorkFlow.checkClientInformation(clientData);
});

Then('I create new client contact', (data)=>{
    if(!scope.context.hasOwnProperty("clientContact")){
        scope.context.clientContact = [];
    }
    data.hashes().forEach(contactData => {
        ClientWorkFlow.ClientPage.clickEditClient(contactData.clientName);
        ClientWorkFlow.EditClientPage.clickTab('Contacts');
        ClientWorkFlow.EditClientPage.waitForSpinerGone();
        ClientWorkFlow.addContact(contactData);
        scope.context.clientContact.push(contactData);
    });
});


Then('The information of this client contact should be displayed as same the input data', ()=>{
    let contactData = scope.context.clientContact.slice(-1)[0];
    assert.ok(ClientWorkFlow.isContactExisted(contactData),
    'User ' + contactData.firstName + ' is not displayed');

    // The Name, User Type, Role should be displayed as same as the updated
    ClientWorkFlow.EditClientPage.clickContactName(contactData.firstName + ' ' + contactData.lastName);
    ClientWorkFlow.checkContactInformation(contactData);
});

Then('I delete contact for client', (data)=>{
    data.hashes().forEach(contactData => {
        ClientWorkFlow.ClientPage.clickEditClient(contactData.clientName);
        ClientWorkFlow.EditClientPage.clickTab('Contacts');
        ClientWorkFlow.EditClientPage.waitForSpinerGone();
        ClientWorkFlow.deleteContact(contactData);
    });
});

Then('The deleted contact should not be displayed in Client Contact page', ()=>{
    let contactData = scope.context.clientContact.pop();
    assert.ok(!ClientWorkFlow.isContactExisted(contactData), 'The deleted contact of client still display in Client Page');
});

When('I delete single client', ()=>{
    let clientData = scope.context.client.slice(-1)[0];
    ClientWorkFlow.deleteClient(clientData);
});

Then('The deleted client should not be displayed in Client Page', ()=>{
    let clientData = scope.context.client.pop();
    assert.ok(!ClientWorkFlow.isClientExisted(clientData), 'The deleted client still display in Client Page')    
})

Then('I delete contact for client if exised', (data)=>{
    data.hashes().forEach(contactData => {
        // If not define client name, get client from default data
        if(!contactData['clientName']){
            testConfig.userCreds.forEach(element => {
                if(element['role'] == 'Client')
                {
                    contactData.clientName = element.firstName + ' ' + element.lastName;
                }                
            });
        }
        ClientWorkFlow.ClientPage.clickEditClient(contactData.clientName);
        ClientWorkFlow.EditClientPage.clickTab('Contacts');
        _browser.pause(5000);
        ClientWorkFlow.EditClientPage.waitForSpinerGone();
        ClientWorkFlow.deleteContact(contactData, true);
    });
});


Then('New peple is added into default client contact', (data)=>{
    let defaultClient;
    testConfig.userCreds.forEach(element => {
        if(element['role'] == 'Client')
        {
            defaultClient = element;
        }                
    });
    console.log(defaultClient);
    _browser.pause(5000);
    ClientWorkFlow.ClientPage.clickEditClient(defaultClient.firstName + ' ' + defaultClient.lastName);
    let contactData = data.hashes()[0];
    ClientWorkFlow.EditClientPage.waitForSpinerGone();
    ClientWorkFlow.EditClientPage.clickTab('Contacts');
    ClientWorkFlow.EditClientPage.waitForSpinerGone();
    _browser.pause(5000);
    assert.ok(ClientWorkFlow.isContactExisted(contactData),
    'New invited people ' + contactData.firstName + ' is not displayed');
});

Given("I click edit action on default client", ()=>{
    let defaultClient;
    testConfig.userCreds.forEach(element => {
        if(element['role'] == 'Client')
        {
            defaultClient = element;
        }                
    });
    console.log(defaultClient);
    ClientWorkFlow.ClientPage.clickEditClient(defaultClient.firstName + ' ' + defaultClient.lastName);
    ClientWorkFlow.EditClientPage.waitForSpinerGone();
    ClientWorkFlow.EditClientPage.clickTab('Action');
    ActionWorkFlow.ActionPage.sortAction('ID', 'desc');
    let newestAction = ActionWorkFlow.getNewestAction();
    // Store action row data into context
    if(!scope.context.hasOwnProperty("action")){
        scope.context.action = [];
    }
    scope.context.action.push(newestAction);
    ActionWorkFlow.ActionPage.clickActionRowByID(newestAction[0]);

});