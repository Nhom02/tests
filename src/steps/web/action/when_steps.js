const ActionWF = require('../../../../workflows/web/ActionWorkFlow');
var assert = require('assert');
const scope = require('../../../hooks/scope');
const {When} = require('cucumber');
const _browser = (typeof myBrowser !== 'undefined')? myBrowser:browser;
const ActionWorkFlow = new ActionWF(_browser);

When(/^I create new action\.*/, (data)=>{
    // Wait for table generated
    ActionWorkFlow.waitForSpinerGone();
    // ActionWorkFlow.waitForActionTableGenerated();
    if(!scope.context.hasOwnProperty("action")){
        scope.context.action = [];
    }
    // Store action row data into context
    data.hashes().forEach(actionData => {
        ActionWorkFlow.createNewAction(actionData);
        scope.context.action.push(actionData);
    });
    ActionWorkFlow.ActionPage.clickRefresh();
    ActionWorkFlow.waitForSpinerGone();
})

When("I edit action", (data)=>{
    ActionWorkFlow.editAction(data.hashes()[0]);
    this.ActionPage.clickRefresh();
    ActionWorkFlow.waitForSpinerGone();
})

When("I do filter {string} {string}", (filterValue, filterType)=>{
    ActionWorkFlow.waitForSpinerGone();
    if(filterType == 'Status')
    {
        ActionWorkFlow.doFilter(filterValue);
    }
    if(filterType == 'Type')
    {
        ActionWorkFlow.doFilter("", filterValue);
    }
    if(filterType == 'Group')
    {
        ActionWorkFlow.doFilter("", "", filterValue);
    }
    if(filterType == 'Branch')
    {
        ActionWorkFlow.doFilter("", "", "", filterValue);
    }
    if(filterType == 'State')
    {
        ActionWorkFlow.doFilter("", "", "", "", filterValue);
    }
    if(filterType == 'Priority')
    {
        ActionWorkFlow.doFilter("", "", "", "", "", filterValue);
    }
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.waitForActionTableGenerated(5);
});

When("I clear filter {string}", (filterType)=>{
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.waitForActionTableGenerated(5);
    ActionWorkFlow.clearFilter(filterType);
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.waitForActionTableGenerated(5);
})

When("I create action and stop at Select Service Type", (data)=>{
    ActionWorkFlow.ActionPage.goToPage();
    ActionWorkFlow.createNewActionAndStop(data.hashes()[0]);
})

When("The service type created should be displayed in Select Type of create {string} action", (createType)=>{
    let serviceTypeArr = ActionWorkFlow.getServiceType();
    let serviceDataCreated = scope.context.serviceData[createType]
    serviceDataCreated.forEach(service => {
        assert.ok(serviceTypeArr.includes(service['serviceName']), 'Service Type ' + service['serviceName'] + ' is not displayed')
    });
})

When("I click on create action", ()=>{
    // Wait for table generated
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.waitForActionTableGenerated();
    ActionWorkFlow.ActionPage.clickCreateAction();
})

When("I select create {string} action", (type)=>{
    if(type == 'client') ActionWorkFlow.ActionPage.clickClientCreation();
    if(type == 'worker') ActionWorkFlow.ActionPage.clickWorkerCreation();
})

When("I search for client/worker {string}", (name)=>{
    ActionWorkFlow.ActionPage.searchClient(name);
})

When("I click on client/worker {string}", (name)=>{
    ActionWorkFlow.ActionPage.clickClientRow(name);
})

When("Click edit on specific action", ()=>{
    // Wait for table generated
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.waitForActionTableGenerated();
    
    ActionWorkFlow.ActionPage.sortAction('ID', 'decs');

    // Get first action row
    let actionArr = ActionWorkFlow.ActionPage.getActionTable(false, 5);
    
    if (typeof actionArr === 'undefined' || actionArr.length == 0) {
        // incase can not get the action list, then try again
        actionArr = ActionWorkFlow.ActionPage.getActionTable(false, 5);
    }

    // Store action row data into context
    if(!scope.context.hasOwnProperty("action")){
        scope.context.action = [];
    }
    scope.context.action.push(actionArr[0]);
    // Click action details
    if(!ActionWorkFlow.ActionPage.clickActionRowByID(actionArr[0][0])){
        // retry one more time
        ActionWorkFlow.ActionPage.clickActionRowByID(actionArr[0][0])
    }
    ActionWorkFlow.waitForSpinerGone();
})


When("I change action {string} to {string}", (type, value)=>{
    ActionWorkFlow.waitForSpinerGone();
    if(type == 'Status'){
        ActionWorkFlow.ActionPage.selectStatus(value);
    }
    if(type == 'Due Date'){
        ActionWorkFlow.selectDueDate(value);
    }
})

When("I add the comment {string}", (comment)=>{
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.ActionPage.clickAddComment();
    ActionWorkFlow.ActionPage.setComment(comment);
    ActionWorkFlow.ActionPage.clickSaveComment();
});

When("I close the action detail", ()=>{
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.ActionPage.clickCloseEditAction();
    ActionWorkFlow.waitForSpinerGone();
})

When("I edit latest the comment with value {string}", (comment)=>{
    ActionWorkFlow.ActionPage.clickEditLatestComment();
    ActionWorkFlow.ActionPage.updateComment(comment)
    ActionWorkFlow.ActionPage.clickSaveComment();
});

When("I delete comment {string}", (comment)=>{
    ActionWorkFlow.deleteLatestComment();
});

When("Click create action", ()=>{
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.ActionPage.clickCreateAction();
});

When("I get number of actions", ()=>{
    // ActionWorkFlow.waitForActionTableGenerated();
    ActionWorkFlow.waitForSpinerGone();
    let numberAction = ActionWorkFlow.ActionPage.getActionCounter();
    scope.context.tempData['countAction'] = numberAction;
});


When("I create {string} action", (createType)=>{
    let actionStored = scope.context.action;
    for (let index = 0; index < actionStored.length; index++) {
        const actionData = actionStored[index];
        if(actionData['type'] == createType)
        {
            if(actionData['type'] == 'Client') ActionWorkFlow.ActionPage.clickClientCreation();
            if(actionData['type'] == 'Worker') ActionWorkFlow.ActionPage.clickWorkerCreation();
            ActionWorkFlow.searchClientInActionCreation(actionData);
            break;
        }
    }
});

When("I click select Due Date action", ()=>{
    ActionWorkFlow.ActionPage.dueDate.openDatePicker();
    // browser.pause(5000);
});

When("I select {string} service Type", (serviceType)=>{
    ActionWorkFlow.ActionPage.selectServiceType(serviceType);
});

When("I {string} priority icon", (checkStatus)=>{
    if(checkStatus == 'check'){
        ActionWorkFlow.ActionPage.checkPriorityIcon(true);
    }
    if(checkStatus == 'uncheck'){
        ActionWorkFlow.ActionPage.checkPriorityIcon(false);
    }
});


When("I click on Linked Action text field", ()=>{
    ActionWorkFlow.ActionPage.clickLinkedActionText();
});

When("I select Linked Action Assignee", ()=>{
    let currentUser = ActionWorkFlow.ActionPage.getCurrentUserName();
    ActionWorkFlow.ActionPage.setLinkedActionText(currentUser.trim());
    ActionWorkFlow.ActionPage.selectLinkedActionAssignee(currentUser.trim());
});

When("Click edit on action has linked task", ()=>{
    // Get action stored in create subtask test case
    let actionStored = scope.context.action.slice(-1)[0];
    ActionWorkFlow.waitForActionTableGenerated();
    ActionWorkFlow.ActionPage.scrollToTop();
    ActionWorkFlow.ActionPage.clickActionRowByID(actionStored[0]);
    ActionWorkFlow.waitForSpinerGone();
})

When("I click on priority task", ()=>{
    // Get action stored in create subtask test case
    ActionWorkFlow.ActionPage.clickSubTaskById(scope.context.tempData.subTaskPriority.prioritySubAction.ID);
    scope.context.tempData.subTaskPriority.prioritySubAction.className = ActionWorkFlow.ActionPage.priorityIcon.getClassName();
    
})

When("I click on root action task", ()=>{
    ActionWorkFlow.ActionPage.clickParentId();
});

When("I click on none priority task", ()=>{
    // Get action stored in create subtask test case
    ActionWorkFlow.ActionPage.clickSubTaskById(scope.context.tempData.subTaskPriority.nonePrioritySubAction.ID);
    scope.context.tempData.subTaskPriority.nonePrioritySubAction.className = ActionWorkFlow.ActionPage.priorityIcon.getClassName();
    ActionWorkFlow.ActionPage.clickCloseEditAction();
});

When("I click on new action created", (data)=>{
    ActionWorkFlow.waitForActionTableGenerated();
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.ActionPage.scrollToTop();
    let actionElement;
    if(data.hashes()[0]['type'] == 'Client')
    {
        actionElement = ActionWorkFlow.ActionPage.getActionRow(data.hashes()[0].clientName, data.hashes()[0].serviceType, data.hashes()[0].status, data.hashes()[0].dueDate);
    }
    if(data.hashes()[0]['type'] == 'Worker')
    {
        actionElement = ActionWorkFlow.ActionPage.getActionRow(data.hashes()[0].workerName, data.hashes()[0].serviceType, data.hashes()[0].status, data.hashes()[0].dueDate);
    }
    actionElement.click();
    ActionWorkFlow.waitForSpinerGone();
});

When("I click on Add Action button", ()=>{
    ActionWorkFlow.ActionPage.clickAddFollowUpAction();
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.ActionPage.clickCloseEditAction();
    ActionWorkFlow.ActionPage.clickRefresh();
    ActionWorkFlow.waitForActionTableGenerated();
    ActionWorkFlow.waitForSpinerGone();
});


When("I add the comment to display the scroll bar", ()=>{

    // Repeat 50 times for comment textarea display scroll bar
    let comment = "Test comment".repeat(50);
    scope.context.tempData['comment'] = comment;
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.ActionPage.clickAddComment();
    ActionWorkFlow.ActionPage.setComment(comment);
    ActionWorkFlow.ActionPage.clickSaveComment();
});

When("I select filter {string} {string}", (filterValue, filterType)=>{
    ActionWorkFlow.waitForSpinerGone();
    if(filterType == 'Status')
    {
        ActionWorkFlow.selectFilter(filterValue);
    }
    if(filterType == 'Type')
    {
        ActionWorkFlow.selectFilter("", filterValue);
    }
    if(filterType == 'Group')
    {
        ActionWorkFlow.selectFilter("", "", filterValue);
    }
    if(filterType == 'Branch')
    {
        ActionWorkFlow.selectFilter("", "", "", filterValue);
    }
    if(filterType == 'State')
    {
        ActionWorkFlow.selectFilter("", "", "", "", filterValue);
    }
    if(filterType == 'Priority')
    {
        ActionWorkFlow.selectFilter("", "", "", "", "", filterValue);
    }
});

When("I click on newest action", ()=>{
    // Wait for table generated
    ActionWorkFlow.waitForSpinerGone();
    
    // Get first action row
    const actionHeader = ActionWorkFlow.ActionPage.getActionTableHeader();
    let indexId = actionHeader.indexOf('ID');
    const newestAction = ActionWorkFlow.getNewestAction();

    if(!scope.context.hasOwnProperty("action")){
        scope.context.action = [];
    }
    scope.context.action.push(newestAction);
    ActionWorkFlow.ActionPage.clickActionRowByID(newestAction[indexId]);
    ActionWorkFlow.ActionPage.waitForSpinerGone();
    
});


When("I change the primary assignee to {string}", (assignee)=>{
    ActionWorkFlow.ActionPage.clickPrimaryAssignee();
    ActionWorkFlow.ActionPage.findActionAssignee(assignee);
    ActionWorkFlow.ActionPage.selectActionAssignee(assignee);
})


When("I create new sub-task", (data)=>{
    scope.context.tempData.subTask = [];
    data.hashes().forEach(actionData => {
        let subId = ActionWorkFlow.createSubTask(actionData);
        actionData['ID'] = subId;

        // Store data in temp for verification in next step.
        scope.context.tempData.subTask.push(actionData);
        ActionWorkFlow.ActionPage.clickParentId();
        ActionWorkFlow.waitForSpinerGone();
    });
});

When("I click refresh filter button in action page", ()=>{
    ActionWorkFlow.ActionPage.clickRefresh();
    ActionWorkFlow.ActionPage.waitForSpinerGone();
});

When("I click apply filter button in action page", ()=>{
    ActionWorkFlow.ActionPage.clickApplyFilter();
    ActionWorkFlow.ActionPage.waitForSpinerGone();
});

When("I clear all filter in action page", ()=>{
    ActionWorkFlow.clearAllFilter();
});


When("I select one value of Case Manager filter", ()=>{
    const suggestedItems = ActionWorkFlow.ActionPage.caseManagerFilter.getSuggestedItems();
    ActionWorkFlow.ActionPage.caseManagerFilter.select(suggestedItems[0]);
    scope.context.tempData['selectedCaseManagerFilterItem'] = suggestedItems[0];
});

When("Create action for {string} is displayed in action page", (type)=>{
    ActionWorkFlow.ActionPage.clickCreateAction();
    if(type = 'Client'){
        ActionWorkFlow.ActionPage.clickClientCreation();
    }
})

When("I get current log entry in action details", ()=>{
    const numberOfLogs = ActionWorkFlow.ActionPage.getStatusHistory();
    scope.context.tempData['numberOfLogs'] = numberOfLogs;
    console.log(scope.context.tempData['numberOfLogs'])
});


When("I upload attach file {string} in action details", (fileName)=>{
    let attachment_file = uploadDir + '\\' + fileName;
    ActionWorkFlow.uploadAttachmentFile(attachment_file);
})

When("I click delete all attachment files in action details", ()=>{
    ActionWorkFlow.deleteAllAttachments();
});

When("I add the comment {string} and share with customer", (comment)=>{
    const strictMock = _browser.mock('**/sendOutboundMessage');
    strictMock.respond([], {
        statusCode: 200,
        fetchResponse: true // default
    })
    ActionWorkFlow.sendSMSToClient(comment);
    ActionWorkFlow.ActionPage.clickCloseEditAction();
});