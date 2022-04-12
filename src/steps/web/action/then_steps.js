const ActionWF = require('../../../../workflows/web/ActionWorkFlow');
var assert = require('assert');
const scope = require('../../../hooks/scope');
const {Then} = require('cucumber');
const { DAYS, MONTHS, convertActionListDueDate } = require('../../../../libraries/Common');
const Action = require('../../../../pom/web/Actions');
const logMessage = require('../../../../libraries/Common').logMessage;
const mysql = require('mysql');
const util = require('util');
const _browser = (typeof myBrowser !== 'undefined')? myBrowser:browser;
const Connection = require('../../../../libraries/Connection');
const ActionWorkFlow = new ActionWF(_browser);


Then("New action present in action page", (data)=>{
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.waitForActionTableGenerated();
    let countActionBefore = scope.context.tempData['countAction'];
    let countActionAfter = ActionWorkFlow.ActionPage.getActionCounter();
    assert.ok(countActionBefore <= (countActionAfter - data.hashes().length),
              "New action not present in client details action page. Before: " + countActionBefore + " - After: " + countActionAfter)
    data.hashes().forEach(actionData => {
        ActionWorkFlow.ActionPage.scrollToTop();
        if(actionData.hasOwnProperty('clientName')){
            ActionWorkFlow.checkActionPresented(actionData.clientName, actionData.serviceType, actionData.status, actionData.dueDate, actionData.primaryAssignee);    
        }else if(actionData.hasOwnProperty('workerName')){
            ActionWorkFlow.checkActionPresented(actionData.workerName, actionData.serviceType, actionData.status, actionData.dueDate, actionData.primaryAssignee);    
        }
    });
    
})

Then("Edited action should not present in action page", ()=>{
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.waitForActionTableGenerated();
    let actionArr = ActionWorkFlow.ActionPage.getActionTable();
    actionStored = scope.context.action.pop();
    actionArr.forEach(action => {
        assert.ok(action[0] != actionStored[0], "Edited action should present in action page");    
    });

})

Then("New action should not present in action page", ()=>{
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.waitForActionTableGenerated();
    let countActionBefore = scope.context.tempData['countAction'];
    let countActionAfter = ActionWorkFlow.ActionPage.getActionCounter();
    assert.ok(countActionBefore == countActionAfter, "New action present in action page. Before: " + countActionBefore + " - After: " + countActionAfter)
})

Then("The log should be updated as {string}", (expectedLog)=>{
    let actionStored = scope.context.action.pop();
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.ActionPage.scrollToTop();
    let log = ActionWorkFlow.getLatestActionLog(actionStored[0]);
    assert.ok(log.includes(expectedLog), "History log does not appear in action details")
})

Then("The action list should contains only {string} {string} action", (filterValue, filterType)=>{
    let header = ActionWorkFlow.ActionPage.getActionTableHeader();
    let currentUserName = ActionWorkFlow.ActionPage.getCurrentUserName();
    let index = header.indexOf(filterType);
    let actionTable = ActionWorkFlow.getTable();
    actionTable.forEach(rows => {
        if(filterType == 'Assignee(s)' || filterType == 'State'){
            index = 7;
            assert.ok(rows[index].includes(currentUserName.trim()), "Action list contains difference value " + rows[index]);
        }
        else if(filterType == 'Priority'){
            index = 5;
            if(filterValue == 'Yes') assert.ok(rows[index] != '', "Action list contains difference value " + rows[index]);
            else assert.ok(rows[index] == '', "Action list contains difference value " + rows[index]);
        }
        else{
            assert.ok(rows[index].includes(filterValue.trim()), "Action list contains difference value " + rows[index])
        }
        
    });
})

Then('The client selected should hightlight to {string}', (colorCode)=>{
    let colorHex = ActionWorkFlow.ActionPage.getClientSelectedColor();
    assert.ok(colorHex == colorCode, "Color code hightlight is not shown as expected - expected: " + colorCode + ' - Actual' + colorHex);
});

Then("The next button color is {string}", (colorCode)=>{
    let colorHex = ActionWorkFlow.ActionPage.getCreateActionNextBtnColor();
    assert.ok(colorHex == colorCode, "Color of next button is not shown as expected - expected: " + colorCode + ' - Actual' + colorHex);
    ActionWorkFlow.ActionPage.clickCancelNextBtn();
})

Then("The action should be displayed as same as value in action details", ()=>{
    ActionWorkFlow.ActionPage.sortAction('ID', 'decs');
    let actionArr = ActionWorkFlow.ActionPage.getActionTable(false, 10);
    actionStored = scope.context.action.pop();
    actionArr.forEach(action => {
        if(action[0] == actionStored[0]){
            for (let index = 0; index < action[0].length; index++) {
                assert.ok(action[index] == actionStored[index], "The action not displayed as same as value in action details");    
            }
            
        }
    });
})

Then("The commented should be displayed same as the {string}", (comment)=>{
    // browser.refresh();
    actionStored = scope.context.action.pop();
    let commentted = ActionWorkFlow.getLatestActionComment(actionStored[0]);
    assert.ok(comment == commentted, "Comment does not appear in action details. Actual " + comment + ". Expected " + commentted)
});

Then("The deleted comment {string} should not be displayed", (comment)=>{
    // browser.refresh();
    actionStored = scope.context.action.pop();
    let commentted = ActionWorkFlow.getLatestActionComment(actionStored[0]);
    assert.ok(comment != commentted, "Comment still display in action details")
});

Then("The value should be enable from current date to future date and user is able to select it", ()=>{
    let dateBeforeActive = ActionWorkFlow.ActionPage.dueDate.getDateAfterActiveDate();
    for (let index = 0; index < dateBeforeActive.length; index++) {
        const date = dateBeforeActive[index];
        expect(date).toBeClickable({ message: 'User is not able to select Due date after current date', });
    }
});

Then("The value date from back later due date should be disabled and user is not able to select it", ()=>{
    let dateBeforeActive = ActionWorkFlow.ActionPage.dueDate.getDateBeforeActiveDate();
    for (let index = 0; index < dateBeforeActive.length; index++) {
        const date = dateBeforeActive[index];
        expect(date).not.toBeClickable({ message: 'User is able to select Due date before current date', });
        
    }
    browser.refresh();
});

Then("This record should have an icon ! in red show", ()=>{
    actionStored = scope.context.action.pop();
    // Wait for table generated
    ActionWorkFlow.waitForActionTableGenerated();
    
    // Get first action row
    let actionArr = ActionWorkFlow.ActionPage.getActionTable(priorityElement=true);
    // Store action row data into context
    actionArr.forEach(actionData => {
        if(actionData[0] == actionStored[0]){
            // index 5 is priority colmn
            let priorityElement = actionData[5].$('span');
            assert.ok(priorityElement.getAttribute('class').includes('active'), "Priority icon not shown in red");
        }
    });
    
});

Then("This record should not have an icon ! in red show", ()=>{
    actionStored = scope.context.action.pop();
    // Wait for table generated
    ActionWorkFlow.waitForActionTableGenerated();
    
    // Get first action row
    let actionArr = ActionWorkFlow.ActionPage.getActionTable(priorityElement=true);
    // Store action row data into context
    actionArr.forEach(actionData => {
        if(actionData[0] == actionStored[0]){
            // index 5 is priority colmn
            assert.ok(actionData[5] != "", "Priority icon shown in red");
        }
    });
});

Then("The sub-task page is displayed to add the information", ()=>{
    // Check sub task element will be hidden in sub task page
    ActionWorkFlow.waitForSpinerGone();
    expect(ActionWorkFlow.ActionPage.actionSubTask.getElement()).not.toBeDisplayed({message: "Sub Task Page is not displayed"});
});

Then("The action status is {string}", (status)=>{
    // console.log(ActionWorkFlow.ActionPage.getStatusSelected());
    ActionWorkFlow.waitForSpinerGone();
    browser.pause(1000);
    assert.ok(ActionWorkFlow.ActionPage.getStatusSelected() == status, "The action status is " + ActionWorkFlow.ActionPage.getStatusSelected());
})


Then("Due Date is date time picker and user is able to select the date", ()=>{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    ActionWorkFlow.ActionPage.dueDate.selectCurrentDate();
    let selectedDate = ActionWorkFlow.getSelectedDueDate();
    assert.ok(parseInt(selectedDate[0]) == parseInt(dd)
                       && parseInt(selectedDate[1]) == parseInt(mm)
                       && parseInt(selectedDate[2]) == parseInt(yyyy),
                       "Date picker is not selectable");
});

Then("Primary assignee the value is same as the value in Groups and user is able to select", ()=>{
    let currentUser = ActionWorkFlow.ActionPage.getCurrentUserName();
    let selectedAssignee = ActionWorkFlow.ActionPage.getAssigneeSelected();
    assert.ok(selectedAssignee.trim() == currentUser.trim(), "Primary assignee the value is not same as the value selected");
});

Then("Auto-generated a comment when a subtask is created", ()=>{

    let comments = ActionWorkFlow.ActionPage.getCommentHistory();
    let currentUser = ActionWorkFlow.ActionPage.getCurrentUserName();
    // Verify first comment generated
    assert.ok(comments[0].includes("Action created for " + currentUser.trim() + ". See parent task for details"), "Comment is not generated when subtask is created");
});

Then("The ID main task / sub task should be displayed", ()=>{
    let actionStored = scope.context.action.slice(-1)[0];
    let title = ActionWorkFlow.ActionPage.getActionDetailsTitle();
    const regex = new RegExp('ID:\\s' + actionStored[0].trim() + '\\s\\/\\s(\\d+)$');
    // Verify title match regex: ID: 114672 / 115068
    assert.ok(title.match(regex), "Comment is not generated when subtask is created");
    let subId = title.match(regex)[1];
    scope.context.action.push([subId]);
    ActionWorkFlow.ActionPage.clickCloseEditAction();
});

Then("Sub-task is created with status {string}", (status)=>{
    let actionStored = scope.context.action.pop();
    browser.refresh();
    ActionWorkFlow.doFilter(status);
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.waitForActionTableGenerated();
    let header = ActionWorkFlow.ActionPage.getActionTableHeader();
    let index = header.indexOf('Status');
    ActionWorkFlow.ActionPage.sortAction('ID', 'decs');
    let actionArr = ActionWorkFlow.ActionPage.getActionTable(false, 10);
    let checkPoint = false;
    actionArr.forEach(actionData => {
        if(actionData[0] == actionStored[0]){
            checkPoint = true;
            assert.ok(actionData[index] == status, "Sub-task status is not shown as expected. Expected "+ status + " - Actual " + actionData[index]);
        }
    });
    assert.ok(checkPoint, "Sub-task is created as expected");
});

Then("Linked Task should be shown the subtaskId, subtaskDescription and subtaskStatus", ()=>{
    let actionStored = scope.context.action.pop();
    expect(ActionWorkFlow.ActionPage.subTaskId.getElement()).toBeDisplayed({ message: 'SubtaskId is not shown', });
    expect(ActionWorkFlow.ActionPage.subTaskStatus.getElement()).toBeDisplayed({ message: 'SubtaskStatus is not shown', });
    expect(ActionWorkFlow.ActionPage.subtaskAssignee.getElement()).toBeDisplayed({ message: 'SubtaskDescription is not shown', });
    browser.refresh();
});


Then("This subaction function should not be existed", ()=>{
    expect(ActionWorkFlow.ActionPage.linkedActionText.getElement()).not.toExist();
    
});

Then("I can not able to add any subaction", ()=>{
    expect(ActionWorkFlow.ActionPage.linkedActionText.getElement()).not.toBeClickable();
    browser.refresh();
});


Then("This subaction function should be existed", ()=>{
    expect(ActionWorkFlow.ActionPage.linkedActionText.getElement()).toExist();
    
});

Then("I'm able to add any subaction", ()=>{
    expect(ActionWorkFlow.ActionPage.linkedActionText.getElement()).toBeClickable();
    browser.refresh();
});

Then("The value of due date is displayed {string}, the color is {string}", (dueDate, colorCode, data)=>{
    let header = ActionWorkFlow.ActionPage.getActionTableHeader();
    let index = header.indexOf('Due');
    data.hashes().forEach(actionData => {
        let dueDateElement;
        ActionWorkFlow.ActionPage.scrollToTop();
        if(actionData.hasOwnProperty('clientName')){
            dueDateElement = ActionWorkFlow.ActionPage.getActionRow(actionData.clientName, actionData.serviceType, actionData.status, actionData.dueDate).$$('td')[index].$('span');
        }else if(actionData.hasOwnProperty('workerName')){
            dueDateElement = ActionWorkFlow.ActionPage.getActionRow(actionData.workerName, actionData.serviceType, actionData.status, actionData.dueDate).$$('td')[index].$('span');
        }
        
        dueDateColorHex = dueDateElement.getCSSProperty('color').parsed.hex
        assert.ok(dueDateColorHex == colorCode, "Color code " + dueDate + " is not shown as expected - expected: " + colorCode + ' - Actual' + dueDateColorHex);
        assert.ok(dueDate == dueDateElement.getText(), "Due date is not shown as expected - expected: " + dueDate + ' - Actual' + dueDateElement.getText());
    });
});

Then("The value of due date should be displayed as same as the selected", (data)=>{
    let header = ActionWorkFlow.ActionPage.getActionTableHeader();
    let index = header.indexOf('Due');
    data.hashes().forEach(actionData => {
        let dueDateElement;
        ActionWorkFlow.ActionPage.scrollToTop();
        if(actionData.hasOwnProperty('clientName')){
            dueDateElement = ActionWorkFlow.ActionPage.getActionRow(actionData.clientName, actionData.serviceType, actionData.status, actionData.dueDate).$$('td')[index].$('span');
        }else if(actionData.hasOwnProperty('workerName')){
            dueDateElement = ActionWorkFlow.ActionPage.getActionRow(actionData.workerName, actionData.serviceType, actionData.status, actionData.dueDate).$$('td')[index].$('span');
        }        
        
        const regex = new RegExp('(.*)\\s+(\\d+)\\.*')
        due = actionData.dueDate;
        if(due.match(regex)){
            let today = new Date();
            
            let days = due.match(regex)[2];
            if(due.match(regex)[1] == 'next'){
                today.setDate(today.getDate() + parseInt(days));
            }
            if(due.match(regex)[2] == 'previous'){
                today.setDate(today.getDate() - parseInt(days));
            }
            due = DAYS[today.getDay()] + " " + String(today.getDate()).padStart(2, '0') + " " + MONTHS[today.getMonth()];
        }
        assert.ok(due == dueDateElement.getText(), "Due date is not shown as expected - expected: " + actionData.dueDate + ' - Actual' + dueDateElement.getText());
    });
});

Then("The default value is show priority in red icon", ()=>{
    assert.ok(scope.context.tempData.subTaskPriority.prioritySubAction.className.includes('active'), "Priority icon not shown in red");
});

Then("The default value is not show priority in red icon", ()=>{
    assert.ok(!scope.context.tempData.subTaskPriority.nonePrioritySubAction.className.includes('active'), "Priority icon shown in red");
});

Then("The Post to Feed new popup is displayed", ()=>{
    expect(ActionWorkFlow.ActionPage.postToFeedContent.getElement()).toBeDisplayed({ message: 'The Post to Feed new popup is not displayed', });
    ActionWorkFlow.ActionPage.clickCancelPostToFeed();
    ActionWorkFlow.ActionPage.clickCloseEditAction();
});

Then("There is no The Post to Feed popup is displayed", ()=>{
    expect(ActionWorkFlow.ActionPage.postToFeedContent.getElement()).not.toBeDisplayed({ message: 'The Post to Feed new popup is displayed when user unticks to "Post to Feed" Service Type', });
    ActionWorkFlow.ActionPage.clickCloseEditAction();
});

Then("The Follow Up new popup is displayed", ()=>{
    expect(ActionWorkFlow.ActionPage.followUpAddAction.getElement()).toBeDisplayed({ message: 'The Follow Up new popup is not displayed', });
    ActionWorkFlow.ActionPage.clickCancelPostToFeed();
    ActionWorkFlow.ActionPage.clickCloseEditAction();
});

Then("The number of days displayed on the “Follow Up” popup is {int}", (numberOfDays)=>{
    const actualNumberOfDays = ActionWorkFlow.ActionPage.getFollowUpNumberOfDay();
    assert.ok(actualNumberOfDays == numberOfDays, 'The number of days is displayed on the “Follow Up” not as expected. Expected: ' + numberOfDays + ' - Actual: ' + actualNumberOfDays);
    ActionWorkFlow.ActionPage.clickCloseEditAction();
});

Then("The client name {string} is shown correctly in Post To Feed popup", (clientName)=>{
    const regex = new RegExp(".+for\\s("+ clientName +")\\s's.+")
    browser.pause(1000);
    const postToFeedTitle = ActionWorkFlow.ActionPage.getPostToFeedTitle();
    assert.ok(postToFeedTitle.match(regex), 'The client name is shown correctly in Post To Feed popup. Expected: ' + clientName + ' - Actual: ' + postToFeedTitle);
});

Then("The textbox allows user to input the text and must show in the Post to Feed popup", ()=>{
    browser.pause(1000);
    ActionWorkFlow.ActionPage.setPostToFeedContent("Test Post To Feed content");
    const postToFeedContent = ActionWorkFlow.ActionPage.getPostToFeedContent();
    assert.ok(postToFeedContent.trim() == 'Test Post To Feed content', 'The textbox doesnot allows user to input the text and not show in the Post to Feed popup');
})


Then("The Follow Up popup is not displayed", ()=>{
    expect(ActionWorkFlow.ActionPage.followUpAddAction.getElement()).not.toBeDisplayed({ message: 'The Follow Up new popup is displayed when user unticks to "Follow Up" Service Type', });
    ActionWorkFlow.ActionPage.clickCloseEditAction();
});

Then("New action present in client details at action tab", (data)=>{
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.waitForActionTableGenerated();
    let countActionBefore = scope.context.tempData['countAction'];
    let countActionAfter = ActionWorkFlow.ActionPage.getActionCounter();
    assert.ok(countActionBefore <= (countActionAfter - data.hashes().length),
              "New action not present in client details action page. Before: " + countActionBefore + " - After: " + countActionAfter)
    data.hashes().forEach(actionData => {
        ActionWorkFlow.ActionPage.scrollToTop();
        ActionWorkFlow.checkActionPresented(actionData.clientName, actionData.serviceType, actionData.status, actionData.dueDate);    
    });
})

Then("New action present in worker details at action tab", (data)=>{
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.waitForActionTableGenerated();
    let countActionBefore = scope.context.tempData['countAction'];
    let countActionAfter = ActionWorkFlow.ActionPage.getActionCounter();
    assert.ok(countActionBefore <= (countActionAfter - data.hashes().length),
              "New action not present in worker details action page. Before: " + countActionBefore + " - After: " + countActionAfter)
    data.hashes().forEach(actionData => {
        ActionWorkFlow.ActionPage.scrollToTop();
        ActionWorkFlow.checkActionPresented(actionData.workerName, actionData.serviceType, actionData.status, actionData.dueDate);    
    });
})

Then("This action is not present in other client details", (data)=>{
    ActionWorkFlow.waitForSpinerGone();
    data.hashes().forEach(actionData => {
        ActionWorkFlow.ActionPage.scrollToTop();
        ActionWorkFlow.checkActionNotPresented(actionData.clientName, actionData.serviceType, actionData.status, actionData.dueDate);    
    });
});

Then("This action is not present in other worker details", (data)=>{
    ActionWorkFlow.waitForSpinerGone();
    data.hashes().forEach(actionData => {
        ActionWorkFlow.ActionPage.scrollToTop();
        ActionWorkFlow.checkActionNotPresented(actionData.workerName, actionData.serviceType, actionData.status, actionData.dueDate);    
    });
});

Then("The worker name {string} is shown correctly in Follow Up popup", (workerName)=>{
    const regex = new RegExp(".+with\\s(Test Automation)\\s.+")
    const followUpContent = ActionWorkFlow.ActionPage.getFollowUpContent();
    assert.ok(followUpContent.match(regex), 'The woker name is shown correctly in Follow Up popup. Expected: ' + workerName + ' - Actual: ' + followUpContent);
});

Then("The actionId should be shown in the top and the value should be same as the value in Action list", ()=>{
    const header = ActionWorkFlow.ActionPage.getActionTableHeader();
    const actionStored = scope.context.action.slice(-1)[0];
    let index = header.indexOf('ID');
    const title = ActionWorkFlow.ActionPage.getActionDetailsTitle();
    assert.ok(title.includes(actionStored[index].trim()), "The actionId in action details and the value in Action list are not the same. Expected: " + actionStored[index] + " - Actual: " + title);
});

Then("The header information should be shown", ()=>{
    const header = ActionWorkFlow.ActionPage.getActionTableHeader();
    let indexWho = header.indexOf('Who');
    let indexType = header.indexOf('Type');
    const actionStored = scope.context.action.pop();
    // Action Name should be displayed
    expect(ActionWorkFlow.ActionPage.actionName.getElement()).toBeDisplayed();

    // User Name should be displayed
    expect(ActionWorkFlow.ActionPage.userName.getElement()).toBeDisplayed();

    // User Address should be displayed
    expect(ActionWorkFlow.ActionPage.userAddress.getElement()).toBeDisplayed();

    // Check Action User Name should be the same as Who presented in action list
    assert.ok(ActionWorkFlow.ActionPage.getActionUserName().includes(actionStored[indexWho]), "Action User Name should be the same as Who presented in action list. Expected: " + actionStored[indexWho] + " - Actual: " + ActionWorkFlow.ActionPage.getActionUserName());

    // Check Action Name should be the same as Type presented in action list
    assert.ok(actionStored[indexType] == ActionWorkFlow.ActionPage.getActionName(), "TAction Name should be the same as Type presented in action list. Expected: " + actionStored[indexType] + " - Actual: " + ActionWorkFlow.ActionPage.getActionName());
    ActionWorkFlow.ActionPage.clickCloseEditAction();
});

Then("The content is displayed as same as the data that user inputs", ()=>{
    // browser.refresh();
    actionStored = scope.context.action.pop();
    let commentted = ActionWorkFlow.getLatestActionComment(actionStored[0]);
    commentStored = scope.context.tempData['comment'];
    assert.ok(commentted == commentStored,
              "Comment does not appear in action details. Actual: " + commentted + " - Expected: " + commentStored);
});

Then("The selected filters should be kept", (data)=>{
    filterData = data.hashes()[0];
    const groupSelected = ActionWorkFlow.ActionPage.groupFilter.getSelectedValue();
    const statusSelected = ActionWorkFlow.ActionPage.statusFilter.getSelectedValue();
    const stateSelected = ActionWorkFlow.ActionPage.stateFilter.getSelectedValue();
    const typeSelected = ActionWorkFlow.ActionPage.typeFilter.getSelectedValue();
    const branchSelected = ActionWorkFlow.ActionPage.branchFilter.getSelectedValue();
    const prioritySelected = ActionWorkFlow.ActionPage.priorityFilter.getSelectedValue();
    assert.ok(filterData['Status'] == statusSelected,
        "The selected Status filters should be kept. Actual: " + statusSelected + " - Expected: " + filterData['Status']);
    assert.ok(filterData['Group'] == groupSelected,
        "The selected Group filters should be kept. Actual: " + groupSelected + " - Expected: " + filterData['Group']);
    assert.ok(filterData['State'] == stateSelected,
        "The selected State filters should be kept. Actual: " + stateSelected + " - Expected: " + filterData['State']);
    assert.ok(filterData['Type'] == typeSelected,
        "The selected Type filters should be kept. Actual: " + typeSelected + " - Expected: " + filterData['Type']);
    assert.ok(filterData['Branch'] == branchSelected,
        "The selected Branch filters should be kept. Actual: " + branchSelected + " - Expected: " + filterData['Branch']);
        assert.ok(filterData['Priority'] == prioritySelected,
        "The selected Priority filters should be kept. Actual: " + prioritySelected + " - Expected: " + filterData['Priority']);
});



Then("The assignee value should be displayed as {string}", (assignee)=>{
    const actionHeader = ActionWorkFlow.ActionPage.getActionTableHeader();
    let indexId = actionHeader.indexOf('ID');
    const newestAction = ActionWorkFlow.getNewestAction();
    ActionWorkFlow.ActionPage.clickActionRowByID(newestAction[indexId]);
    ActionWorkFlow.ActionPage.waitForSpinerGone();
    // browser.pause(5000)
    let selectedAssignee = ActionWorkFlow.ActionPage.getAssigneeSelected();
    if(assignee == 'currentUser'){
        assignee = ActionWorkFlow.ActionPage.getCurrentUserName();
    }
    assert.ok(selectedAssignee.trim() == assignee.trim(),
    "The assignee value is not displayed as same as the value that the user selected. Actual: " + selectedAssignee + ". Extected " + assignee);
});

Then("The value of due date is displayed as {string}", (dueDate)=>{

    let today = new Date();
    const regex = new RegExp('(.*)\\s+(\\d+)\\.*')
    if(dueDate.match(regex)){
        
        
        let days = dueDate.match(regex)[2];
        if(dueDate.match(regex)[1] == 'next'){
            today.setDate(today.getDate() + parseInt(days));
        }
        if(dueDate.match(regex)[2] == 'previous'){
            today.setDate(today.getDate() - parseInt(days));
        }
    }
    dueDate = DAYS[today.getDay()] + " " + String(today.getDate()).padStart(2, '0') + " " + MONTHS[today.getMonth()];
    assert.ok(dueDate == ActionWorkFlow.ActionPage.dueDate.getValue(),
    "Due date is not shown as expected - expected: " + dueDate + ' - Actual' + ActionWorkFlow.ActionPage.dueDate.getValue());
});

Then("{string} column should be displayed as {string} in action list", (column, value)=>{
    const actionHeader = ActionWorkFlow.ActionPage.getActionTableHeader();
    let indexId = actionHeader.indexOf('ID');
    let indexValidate = actionHeader.indexOf(column);
    actionStored = scope.context.action.pop();
    let updateAction = ActionWorkFlow.ActionPage.getActionRowByID(actionStored[indexId]);
    if(column == 'Due'){
        value = convertActionListDueDate(value);
    }
    assert.ok(updateAction[indexValidate] == value, 
        column + " is not shown as expected - expected: " + value + ' - Actual' + updateAction[indexValidate]);
});

Then("These sub-task should be displayed in action list correctly", ()=>{
    let header = ActionWorkFlow.ActionPage.getActionTableHeader();
    scope.context.tempData.subTask.forEach(actionData => {
        let actionStored = ActionWorkFlow.ActionPage.getActionRowByID(actionData['ID']);
        let indexStatus = header.indexOf('Status');
        let indexDuedate = header.indexOf('Due');
        let indexAssignee = header.indexOf('Assignee(s)');
        assert.ok(actionStored[indexStatus] == actionData['status'],
            "Status is not shown as expected - expected: " + actionData['status'] + ' - Actual' + actionStored[indexStatus]);
        assert.ok(actionStored[indexAssignee] == actionData['primaryAssignee'],
            "Assignee is not shown as expected - expected: " + actionData['primaryAssignee'] + ' - Actual' + actionStored[indexAssignee]);
        assert.ok(actionStored[indexDuedate] == actionData['dueDate'],
            "DueDate is not shown as expected - expected: " + actionData['dueDate'] + ' - Actual' + actionStored[indexDuedate]);
    });
});

Then("These sub-task should be displayed in action list", ()=>{
    console.log(scope.context.tempData.subTask)
});


Then("The action details page should be displayed", ()=>{

    ActionWorkFlow.ActionPage.waitForSpinerGone();
    // Action Name should be displayed
    expect(ActionWorkFlow.ActionPage.actionName.getElement()).toBeDisplayed();

    // User Name should be displayed
    expect(ActionWorkFlow.ActionPage.userName.getElement()).toBeDisplayed();

    // User Address should be displayed
    expect(ActionWorkFlow.ActionPage.userAddress.getElement()).toBeDisplayed();

    ActionWorkFlow.ActionPage.clickCloseEditAction();
});

Then("Action list should be load successfully", (data)=>{
    filterData = data.hashes()[0];

    const header = ActionWorkFlow.ActionPage.getActionTableHeader();
    // console.log(header);
    const actionTable = ActionWorkFlow.ActionPage.getActionTable();
    for (let index = 0; index < actionTable.length; index++) {
        const row = actionTable[index];
        for (const key in filterData) {
            let indexOfCol = header.indexOf(key);
            assert.ok(row[indexOfCol] == filterData[key],
                key + " is not shown as expected - expected: " + filterData[key] + ' - Actual' + row[indexOfCol]);
        }
    }
});

Then("Action list should be loaded within a min", ()=>{
    const timeBefore = Date().toLocaleString();
    logMessage("Time before loading action list" + timeBefore)
    expect($('//tbody[2]/tr[1]')).toBeDisplayed({wait: 60000, message:"Action list should loaded over a min"});
});

Then("Case Manager filter is displayed", ()=>{
    ActionWorkFlow.ActionPage.waitForSpinerGone();
    ActionWorkFlow.waitForActionTableGenerated();
    expect(ActionWorkFlow.ActionPage.caseManagerFilter.getElement()).toBeDisplayed({wait: 5000, message:"Case Manager filter is not displayed"});
});

Then("Case Manager filter is not displayed", ()=>{
    ActionWorkFlow.ActionPage.waitForSpinerGone();
    ActionWorkFlow.waitForActionTableGenerated();
    expect(ActionWorkFlow.ActionPage.caseManagerFilter.getElement()).not.toBeDisplayed({wait: 5000, message:"Case Manager filter is displayed"});
});

Then("The initially filter of Case Manager is All", ()=>{
    expect(ActionWorkFlow.ActionPage.caseManagerFilter.getElement()).toHaveTextContaining('All');
});

Then("The selected value should be displayed in Case Manager filter", ()=>{
    const caseManagerStored = scope.context.tempData['selectedCaseManagerFilterItem'];
    expect(ActionWorkFlow.ActionPage.caseManagerFilter.getElement()).toHaveTextContaining(caseManagerStored);
});

Then("The clear selected display item that selected in Case Manager filter", ()=>{
    const caseManagerStored = scope.context.tempData['selectedCaseManagerFilterItem'];
    const selectedItems = ActionWorkFlow.ActionPage.caseManagerFilter.getSelectedValue();
    assert.ok(selectedItems.includes(caseManagerStored), "The clear selected does not display item that selected in Case Manager filter")
});

Then("The suggested item display item that not selected in Case Manager filter", ()=>{
    const caseManagerStored = scope.context.tempData['selectedCaseManagerFilterItem'];
    const suggestedItems = ActionWorkFlow.ActionPage.caseManagerFilter.getSuggestedItems();
    assert.ok(!suggestedItems.includes(caseManagerStored), "The suggested item display item that selected in Case Manager filter")
});

Then("Get suggestion items", ()=>{
    const suggestedItems = ActionWorkFlow.ActionPage.caseManagerFilter.getSuggestedItems();
    console.log(suggestedItems);
});

Then("The value in Case Manager filter should be displayed to consistency with the query SQL", ()=>{

    const suggestedItems = ActionWorkFlow.ActionPage.caseManagerFilter.getSuggestedItems();
    let sql = 'select company_ext_tools.user_tool_login_id\
        from company_ext_tools , company_3rd_party_tools\
        where company_ext_tools.company_3rd_party_tool_id=company_3rd_party_tools.company_3rd_party_tool_id\
        and company_3rd_party_tools.company_id=?\
        ';


    const companyId = testConfig.userCreds[0].companyId;
    let queryResult;

    browser.call(async ()=>{      
        const query = util.promisify(Connection.conn.query).bind(Connection.conn);
        queryResult = await query(sql, [companyId]);
    });
    assert.ok(suggestedItems.length == queryResult.length,
        "The value in Case Manager filter should be displayed to consistency with the query SQL. UI " + suggestedItems + " - SQL" + queryResult)

    for (let index = 0; index < queryResult.length; index++) {
        const row = queryResult[index];
        assert.ok(suggestedItems.includes(row.user_tool_login_id),
            "The value in Case Manager filter should be displayed to consistency with the query SQL. UI " + suggestedItems + " - SQL" + row.user_tool_login_id)
    }
});

Then("{string} filter be shown after Status and before the Priority", (filter)=>{

    ActionWorkFlow.ActionPage.goToPage();
    ActionWorkFlow.waitForActionTableGenerated();

    // filter should be shown after Status filter
    const filterAfterSelector = ".//hayylo-multiple-select[@label='Priority']/preceding-sibling::hayylo-multiple-select//span[contains(text(), '"+ filter +"')]";
    expect($(filterAfterSelector)).toBeDisplayed({ message: filter + ' filter not shown after Status', }); 

    // filter should be shown before Priority filter
    const filterBeforeSelector = ".//hayylo-multiple-select[@label='Status']/following-sibling::hayylo-multiple-select//span[contains(text(), '"+ filter +"')]";
    expect($(filterBeforeSelector)).toBeDisplayed({ message: filter + ' filter not shown before Priority', }); 

    expect(ActionWorkFlow.ActionPage.branchFilter.getElement()).toHaveTextContaining(filter);
});


Then("{string} column must be shown between Phone and Address column", (column)=>{

    // column need to be verified should be shown before Address column
    const colBeforeSelector = "//th[text()='"+ column +"']//following-sibling::th[text()='Address']";
    expect($(colBeforeSelector)).toBeDisplayed({message: column + " not shown before Address column"})

    // column need to be verified should be shown after Phone column
    const colAfterSelector = "//th[text()='"+ column +"']//preceding-sibling::th[text()='Phone']";
    expect($(colAfterSelector)).toBeDisplayed({message: column + " not shown before Phone column"})

    // Close create action popup after verified
    ActionWorkFlow.ActionPage.clickCancelNextBtn();
})

Then("There is no log entry inserted in action details", ()=>{
    let countLogsBefore = scope.context.tempData['numberOfLogs'];
    let actionStored = scope.context.action.pop();
    ActionWorkFlow.waitForSpinerGone();
    ActionWorkFlow.ActionPage.scrollToTop();
    let log = ActionWorkFlow.getActionLog(actionStored[0]);
    assert.ok(log.length == countLogsBefore.length,
        "There is log entry inserted in action details. Before " + countLogsBefore.length + " - After " + log.length);
});

Then("The attachments file must be displayed correctly", (data)=>{
    let attachmentFiles = ActionWorkFlow.ActionPage.getAttachmentFiles();
    data.hashes().forEach(file => {
        assert.ok(attachmentFiles.includes(file.fileName),
        "The attachments file not displayed correctly. Expected: " + file.fileName + " - Actual: " + attachmentFiles)
    });
});

Then("The Attachment files are deleted successfully", ()=>{
    browser.pause(1000);
    let attachmentFiles = ActionWorkFlow.ActionPage.getAttachmentFiles();
    assert.ok(attachmentFiles.length == 0, "The Attachment files are not deleted successfully " + attachmentFiles);
    ActionWorkFlow.ActionPage.clickCloseEditAction();
});

Then("The colour of this due date in action list is {string}", (color)=>{

    // Wait for table generated
    const colorCodeConvert = {
        'yellow': '#ff8e00',
        'red': '#bf0003',
        'green': '#00b151'
    }
    ActionWorkFlow.waitForSpinerGone();

    let header = ActionWorkFlow.ActionPage.getActionTableHeader();
    let index = header.indexOf('Due');

    ActionWorkFlow.ActionPage.sortAction('ID', 'desc');
    newestAction = ActionWorkFlow.ActionPage.getActionTable(false, 1, true);
    const dueDateColor = newestAction[0][index].$('span').getCSSProperty('color');

    assert.ok(dueDateColor.parsed.hex == colorCodeConvert[color],
        "The colour of this due date is not yellow. Expected: " + colorCodeConvert[color] + " - Actual: " + dueDateColor.parsed.hex);
});


Then("New action requested from client is presented in action page", (data)=>{

    console.log("Check filter");
    ActionWorkFlow.clearFilter('Group');
    ActionWorkFlow.ActionPage.waitForSpinerGone();
    ActionWorkFlow.ActionPage.sortAction('ID', 'desc');
    let actionHeader = ActionWorkFlow.ActionPage.getActionTableHeader();
    let newestAction = ActionWorkFlow.ActionPage.getLatestActionRow();
    let indexType = actionHeader.indexOf('Type');
    let indexStatus = actionHeader.indexOf('Status');
    console.log(newestAction);
    data.hashes().forEach(actionData => {
        assert.ok(newestAction[indexType].includes(actionData.serviceType),
            "Service Type of new action is not match with request from mobile app. Expected: " + actionData.serviceType + " - Actual: " + newestAction[indexType]);
        assert.ok(actionData.status == newestAction[indexStatus],
            "Status of new action is not match with request from mobile app. Expected: " + actionData.status + " - Actual: " + newestAction[indexStatus]);
    })
});