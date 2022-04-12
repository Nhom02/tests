const ActionPage = require('../../pom/web/Actions');
const SERVICE_SCHEDULE = ['Client Automation Schedule Change',
                           'Worker Automation Schedule Change',
                           'Client Automation Schedule & Note',
                           'Client Automation Schedule Cancel',
                           'Worker Automation Schedule Cancel',
                           'Client Automation Post To Feed'];
const { DAYS, MONTHS } = require('../../libraries/Common');
const robot = require("robotjs");

class ActionWorkFlow{
    constructor(driver){
        this.browser = driver? driver: browser;
        this.ActionPage = new ActionPage(driver);
    }

    createNewAction(actionData){
        let currentUser = this.ActionPage.getCurrentUserName();
        this.ActionPage.clickCreateAction();
        if(actionData['type'] == 'Client'){
            this.ActionPage.clickClientCreation();
            if(!actionData['clientName'] || actionData['clientName'] == ''){
                testConfig.userCreds.forEach(element => {
                    if(element['role'] == 'Client')
                    {
                        let defaultClient = element;
                        actionData['clientName'] = defaultClient.firstName + ' ' + defaultClient.lastName;
                    }                
                });                
            }
            this.ActionPage.searchClient(actionData['clientName']);
            this.ActionPage.clickClientRow(actionData['clientName']);
        }
        if(actionData['type'] == 'Worker'){
            this.ActionPage.clickWorkerCreation();
            this.ActionPage.searchClient(actionData['workerName']);
            this.ActionPage.clickClientRow(actionData['workerName']);
        }

        this.ActionPage.clickNextBtn();
        this.ActionPage.selectServiceType(actionData['serviceType']);
        this.selectSchedule(actionData);
        if(actionData.hasOwnProperty('dueDate')){
            this.ActionPage.waitForSpinerGone();
            this.selectDueDate(actionData['dueDate']);
        }

        if(actionData.hasOwnProperty('primaryAssignee')){
            this.ActionPage.clickPrimaryAssignee();
            if(actionData.primaryAssignee == 'currentUser'){    
                this.ActionPage.findActionAssignee(currentUser.trim());
                this.ActionPage.selectActionAssignee(currentUser.trim());
            }else{
                this.ActionPage.findActionAssignee(actionData.primaryAssignee);
                this.ActionPage.selectActionAssignee(actionData.primaryAssignee)
            }
        }

        if(actionData.hasOwnProperty('childAction')){
            if(actionData.childAction == 'currentUser'){
                this.ActionPage.clickLinkedActionText();
                this.ActionPage.setLinkedActionText(currentUser.trim());
                this.ActionPage.selectLinkedActionAssignee(currentUser.trim());
            }
            else{
                this.ActionPage.setLinkedActionText(actionData.childAction.trim());
                this.ActionPage.selectLinkedActionAssignee(actionData.childAction.trim());
            }
        }

        this.ActionPage.setComment(actionData['comment']);
        if(actionData.hasOwnProperty('cancel')){
            if(actionData.cancel){
                this.ActionPage.clickCancelBtn();
                return;
            }
        }
        this.ActionPage.clickSubmitBtn();
        this.ActionPage.clickCloseBtn();
        this.ActionPage.waitForSpinerGone();
    }

    getTable(){
        this.waitForActionTableGenerated();
        let table = this.ActionPage.getActionTable();
        return table;
    }

    checkActionPresented(who, type, status, due, assignee){
        this.waitForActionTableGenerated();
        expect(this.ActionPage.getActionRow(who, type, status, due, assignee)).toExist({wait: 3000})
    }

    checkActionNotPresented(who, type, status, due, assignee){
        this.waitForActionTableGenerated();
        expect(this.ActionPage.getActionRow(who, type, status, due, assignee)).not.toExist({wait: 3000})
    }

    editAction(actionData){
        this.waitForActionTableGenerated();
        this.ActionPage.getActionRow(actionData.clientName, actionData.serviceType, actionData.dueDate).click()
        this.ActionPage.selectStatus(actionData.status);
        this.ActionPage.clickCloseEditAction();
        this.ActionPage.waitForSpinerGone();
    }

    doFilter(status="", type="", group="", branch="", state="", priority="")
    {
        // Select Status Filter
        if(status){
            this.ActionPage.statusFilter.clearSelectedItem();
            // browser.pause(5000)
            this.ActionPage.statusFilter.select(status);
        }

        // Select Type Filter
        if(type){
            this.ActionPage.typeFilter.clearSelectedItem()
            // browser.pause(5000)
            this.ActionPage.typeFilter.select(type)
            // browser.pause(5000)
        }

        // Select Group Filter
        if(group){
            this.ActionPage.groupFilter.clearSelectedItem()
            this.ActionPage.groupFilter.select(group)
        }

        // Select State Filter
        if(branch){
            this.ActionPage.branchFilter.clearSelectedItem()
            this.ActionPage.branchFilter.select(branch)
        }

        // Select State Filter
        if(state){
            this.ActionPage.stateFilter.clearSelectedItem()
            this.ActionPage.stateFilter.select(state)
        }

        // Select Priority Filter
        if(priority){
            this.ActionPage.priorityFilter.clearSelectedItem()
            this.ActionPage.priorityFilter.select(priority)
        }
        this.ActionPage.clickApplyFilter();
        this.waitForActionTableGenerated();
    }

    clearFilter(filterType){
        // Clear Status Filter
        if(filterType == 'Status'){
            this.ActionPage.statusFilter.clearSelectedItem();
        }

        // Clear Type Filter
        if(filterType == 'Type'){
            this.ActionPage.typeFilter.clearSelectedItem()
        }

        // Clear Group Filter
        if(filterType == 'Group'){
            this.ActionPage.groupFilter.clearSelectedItem()
        }

        // Clear State Filter
        if(filterType == 'State'){
            this.ActionPage.stateFilter.clearSelectedItem()
        }

        // Clear Priority Filter
        if(filterType == 'Priority'){
            this.ActionPage.priorityFilter.clearSelectedItem()
        }
        this.ActionPage.clickApplyFilter();
        this.ActionPage.waitForSpinerGone();
        this.waitForActionTableGenerated();
    }

    clearAllFilter(){

        this.ActionPage.waitForProcessBarCompleted();
        // Clear Status Filter
        this.ActionPage.statusFilter.clearSelectedItem();

        // Clear Type Filter
        this.ActionPage.typeFilter.clearSelectedItem()

        // Clear Group Filter
        this.ActionPage.groupFilter.clearSelectedItem()

        // Clear State Filter
        this.ActionPage.stateFilter.clearSelectedItem()

        // Clear Priority Filter
        this.ActionPage.priorityFilter.clearSelectedItem()
        this.ActionPage.clickApplyFilter();
        this.waitForActionTableGenerated();
    }

    getLatestActionLog(actionID){
        // Get Status log history of specific action
        // Then return newest Status updated
        this.waitForActionTableGenerated();
        if(!this.ActionPage.clickActionRowByID(actionID))
        {
            // Retry in seconds times if the first one not found row need to be clicked
            this.ActionPage.scrollToTop();
            this.ActionPage.clickActionRowByID(actionID);
        }
        this.ActionPage.waitForSpinerGone();
        let logs = this.ActionPage.getStatusHistory();
        this.ActionPage.clickCloseEditAction()
        return logs.slice(-1)[0];
    }

    getActionLog(actionID){
        // Get Status log history of specific action
        // Then return all Status updated
        this.waitForActionTableGenerated();
        if(!this.ActionPage.clickActionRowByID(actionID))
        {
            // Retry in seconds times if the first one not found row need to be clicked
            this.ActionPage.scrollToTop();
            this.ActionPage.clickActionRowByID(actionID);
        }
        this.ActionPage.waitForSpinerGone();
        let logs = this.ActionPage.getStatusHistory();
        this.ActionPage.clickCloseEditAction()
        return logs;
    }    

    waitForActionTableGenerated(times=20){
        // Wait until action table is displayed in UI
        let actionCounter = 0;
        let retries = 0;
        while (parseInt(actionCounter) == 0 && retries <= times) {
            actionCounter = this.ActionPage.getActionCounter();
            this.browser.pause(1000)
            retries += 1;
        }
    }

    getServiceType(actionData){
        // Get all service type when creating action
        // Return list of service type
        let serviceType = this.ActionPage.getServiceType();
        this.ActionPage.clickCloseAction();
        return serviceType;
    }

    createNewActionAndStop(actionData){
        this.ActionPage.clickCreateAction();
        if(actionData['type'] = 'Client'){
            this.ActionPage.clickClientCreation();
            this.ActionPage.searchClient(actionData['clientName']);
            this.ActionPage.clickClientRow(actionData['clientName']);
            this.ActionPage.clickNextBtn();
        }
    }

    selectSchedule(actionData){
        // Select Service Not Shown for serviceType in SERVICE_SCHEDULE Array
        if(SERVICE_SCHEDULE.includes(actionData['serviceType'])){
            this.ActionPage.actionScheduleForm.getElement().waitForDisplayed();
            this.ActionPage.waitForSpinerGone();
            this.ActionPage.clickServiceNotShow();
        }
    }

    getLatestActionComment(actionID){
        // Get comment log history of specific action
        // Then return newest comment
        this.waitForActionTableGenerated();
        this.ActionPage.scrollToTop();
        this.ActionPage.sortAction('ID', 'desc');
        console.log("Click on action id" + actionID);
        if(!this.ActionPage.clickActionRowByID(actionID)){
            // retry one more time
            this.ActionPage.clickActionRowByID(actionID)
        }
        this.ActionPage.waitForSpinerGone();
        let comments = this.ActionPage.getCommentHistory();
        this.ActionPage.clickCloseEditAction()
        return comments.slice(-1)[0];
    }

    deleteComment(comment){
        this.ActionPage.clickDeleteComment(comment);
        this.ActionPage.successModal.clickYes();
    }

    deleteLatestComment(){
        this.ActionPage.clickDeleteLatestComment();
        this.ActionPage.successModal.clickYes();
    }

    searchClientInActionCreation(actionData){
        this.ActionPage.searchClient(actionData['clientName']);
        this.ActionPage.clickClientRow(actionData['clientName']);
        this.ActionPage.clickNextBtn();
    }

    waitForSpinerGone(times=20){
        // Wait until spiner disappear after clicking on action details
        let retries = 0;
        while (retries <= times) {
            if(this.ActionPage.spiner.getElement().getAttribute('class').includes('loaded')){
                break;
            }
            this.browser.pause(1000);
            retries += 1;
        }
    }

    getSelectedDueDate(){
        let selectedDate = this.ActionPage.dueDate.getSelectedTime();
        this.ActionPage.statusTitle.click();
        return selectedDate;
    }

    selectDueDate(dueDate){
        /*
        Select dueDate when editing or creating new action
        Input params:
            ToDay for current date
            next 2 days: select next 2 date
            previous 2 days: select previous 2 date 
        */
        const regex = new RegExp('(.*)\\s+(\\d+)\\.*')
        if(dueDate == 'Today'){
            this.ActionPage.dueDate.selectCurrentDate();
        }
        else if(dueDate.match(regex)){
            let today = new Date();
            
            let days = dueDate.match(regex)[2];
            if(dueDate.match(regex)[1] == 'next'){
                today.setDate(today.getDate() + parseInt(days));
            }
            if(dueDate.match(regex)[2] == 'previous'){
                today.setDate(today.getDate() - parseInt(days));
            }
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            this.ActionPage.dueDate.selectYearMonthDate(yyyy, mm, dd);
        }
    }

    createSubTask(actionData){
        this.ActionPage.clickLinkedActionText();
        if(actionData.hasOwnProperty('primaryAssignee'))
        {
            this.ActionPage.setLinkedActionText(actionData.primaryAssignee);
            this.ActionPage.selectLinkedActionAssignee(actionData.primaryAssignee);            
        }
        else{
            let currentUser = this.ActionPage.getCurrentUserName();
            this.ActionPage.setLinkedActionText(currentUser.trim());
            this.ActionPage.selectLinkedActionAssignee(currentUser.trim());
        }
        if(actionData.hasOwnProperty('priority')){
            this.ActionPage.checkPriorityIcon(actionData.priority);
        }
        if(actionData.hasOwnProperty('status'))
        {
            this.ActionPage.selectStatus(actionData.status);
        }
        if(actionData.hasOwnProperty('dueDate')){
            this.ActionPage.waitForSpinerGone();
            this.selectDueDate(actionData['dueDate']);
        }
        const regex = new RegExp('ID:.*\\/\\s(\\d+)$');
        let title = this.ActionPage.getActionDetailsTitle();
        // return ID of new sub-task created
        return title.match(regex)[1];        
    }

    waitForFilterPresent(times=20){
        // Wait for Apply Filter button be ready
        let retries = 0;
        while (retries <= times) {
            console.log("Retry time " + retries)
            if(this.ActionPage.applyFilterBtn.getAttribute('class').includes('dirty')){
                break;
            }
            this.browser.pause(1000);
            retries += 1;
        }
        return this;
    }

    selectFilter(status="", type="", group="", branch="", state="", priority="")
    {
        // Select Status Filter
        if(status){
            this.ActionPage.statusFilter.clearSelectedItem();
            // browser.pause(5000)
            this.ActionPage.statusFilter.select(status);
        }

        // Select Type Filter
        if(type){
            this.ActionPage.typeFilter.clearSelectedItem()
            // browser.pause(5000)
            this.ActionPage.typeFilter.select(type)
            // browser.pause(5000)
        }

        // Select Group Filter
        if(group){
            this.ActionPage.groupFilter.clearSelectedItem()
            this.ActionPage.groupFilter.select(group)
        }

        // Select State Filter
        if(branch){
            this.ActionPage.branchFilter.clearSelectedItem()
            this.ActionPage.branchFilter.select(branch)
        }

        // Select State Filter
        if(state){
            this.ActionPage.stateFilter.clearSelectedItem()
            this.ActionPage.stateFilter.select(state)
        }

        // Select Priority Filter
        if(priority){
            this.ActionPage.priorityFilter.clearSelectedItem()
            this.ActionPage.priorityFilter.select(priority)
        }
        this.waitForActionTableGenerated();
    }

    getNewestAction(){
        this.ActionPage.waitForSpinerGone();
        this.ActionPage.sortAction('ID', 'desc');
        this.ActionPage.waitForSpinerGone();
        const actionStored = this.ActionPage.getActionTable(false, 1);
        return actionStored[0];
    }

    convertDueDate(dueDate){
        /*
        Convert format of inputted dueDate to format of date presented in action list
        dueDate:
          - Today for current date
          - next 2 days: return next 2 date
          - previous 2 days: return previous 2 date
        return example: Thu 14 May
        */
        let today = new Date();
        const regex = new RegExp('(.*)\\s+(\\d+)\\.*')
        if(dueDate == 'Today'){
            return dueDate;
        }
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
        return dueDate;
    }

    uploadAttachmentFile(filePath){
        if(!$('.attachment-component').getAttribute('class').includes('open')){
            this.ActionPage.clickAttachment();
        }
        if(this.ActionPage.moreAttachmentBtn.isDisplayed(2)){
            this.ActionPage.moreAttachmentBtn.click();
        }
        // Using robot library to simulate keypress as user
        robot.typeString(filePath);
        robot.keyTap("enter");
        this.browser.pause(1000);     
    }

    deleteAllAttachments(){
        const deleteAttachmentElements = this.ActionPage.deleteAllAttachment.getElements();
        for (let index = 0; index < deleteAttachmentElements.length; index++) {
            this.browser.pause(1000);
            const element = deleteAttachmentElements[index];
            if(element.isDisplayed()) element.click();
        }
    }

    sendSMSToClient(message){
        this.ActionPage.waitForSpinerGone();
        this.ActionPage.clickAddComment()
        this.ActionPage.clickShareWithCustomer();
        this.ActionPage.setShareWithCustomerText(message);
        this.ActionPage.clickSend();
        this.ActionPage.waitForSpinerGone();
    }

}

module.exports = ActionWorkFlow;