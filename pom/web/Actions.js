const PageObject = require('../../components/web/PageObject');
const UIObject = require('../../components/web/UIObject');
const Table = require('../../components/web/table/Table');
const Combobox = require('../../components/web/form/Combobox');
const Modal = require('../../components/web/modal/Modal');
const Filter = require('../../components/web/Filter');
const DateTime = require('../../components/web/datetime/DateTime')

//---------------------Action page------------------
const LEFT_NAV_ITEM = "Actions";
const CREATE_BTN = "//span[text()='Create']/parent::*";
const REFRESH_BTN = "//span[text()='Refresh']";
const APPLY_FILTER_BTN = "//span[text()='Apply Filters']/parent::*";
const CLOSE_BTN = "//*[text()=' Close']";
const SUCCESS_MODAL = '.modal';
const STATUS_SELECT = ".//p[text()='STATUS']/parent::*/hayylo-single-select";
const STATUS_SELECTED = "(.//p[text()='STATUS']/parent::*/hayylo-single-select//*[contains(@class, 'dropdown-label')]//span)[last()]";
const DUE_DATE = ".//p[text()='DUE DATE']/parent::*//input[contains(@class, 'datepicker-date')]";
const ASSIGNEE_SELECT = ".//p[text()='PRIMARY ASSIGNEE']/parent::*//div[contains(@class, 'single-select-component')]";
const ASSIGNEE_SELECTED = "(.//p[text()='PRIMARY ASSIGNEE']/parent::*/hayylo-single-select//*[contains(@class, 'dropdown-label')]//span)[last()]";
const CLOST_EDIT_ACTION_BTN = ".//*[@class='action-detail-container']//*[@class='section-header']//i";
const ACTION_ICON = ".//h4[@class='section-title']/span[contains(@class, 'badge')]";
const SPINER = ".//div[contains(@class,'hayylo-spinner')]";
const PROCESS_BAR = '.progress-bar-percent';
//---------------------Filter----------------------
const STATUS_FILTER = ".//hayylo-multiple-select[@label='Status']";
const TYPE_FILTER = ".//hayylo-multiple-select[@label='Type']";
const GROUP_FILTER = ".//hayylo-multiple-select[@label='Group']";
const STATE_FILTER = ".//hayylo-multiple-select[@label='State']";
const PRIORITY_FILTER = ".//hayylo-multiple-select[@label='Priority']";
const BRANCH_FILTER = ".//hayylo-multiple-select[@label='State']/preceding-sibling::*[1]";
const CASE_MANAGER = ".//hayylo-multiple-select[@label='Case Manager']";

//----------------------Action Details -------------
const CKEDITOR_CONTENT = '.ck-editor__editable';
const HISTORY_LOG = ".//hayylo-comment/div[@class='comment']/div[@class='log-wrapper']";
const COMMENT_LOG = ".//hayylo-comment/div[@class='comment']//div[contains(@class,'view-component')]";
let updateCommentJs = "CKEDITOR.instances.editor%s1.setData('%s2')";
const EDIT_COMMENT = "(.//hayylo-comment//span[@class='actions']/i[contains(@class, 'fa-pencil-square-o')])[last()]";
const DELETE_LAST_COMMENT = "(.//hayylo-comment//span[@class='actions']/i[contains(@class, 'fa-trash')])[last()]";
const EDIT_COMMENT_CKEDITOR = "(.//*[@class='edit-block']//ckeditor/div/div)[1]";
let deleteComment = ".//p[text()='%s']/parent::*/preceding-sibling::*//span[@class='actions']/i[contains(@class, 'fa-trash')]";
const PRIORITY_ICON = ".//*[@class='action-detail-component']//span[contains(@class,'action-priority-icon')]";
const ACTION_SUB_TASK = ".//div[@class='action-sub-tasks']";
const LINKED_ACTION_TEXT = "//*[contains(@class,'single-select-component')]/input";
let linkedActionSelect = "//*[contains(@class,'sub-task-create')]//div[@class='group-container']//li[text()='%s']";
const DUE_DATE_TEXT = ".//p[text()='DUE DATE']";
const STATUS_TEXT = ".//p[text()='STATUS']";
const USER_NAME = ".//*[@class='username']";
const ACTION_NAME = ".action-name";
const USER_ADDRESS =  '.user-address';
const USER_PHONE = '.phone';
const subTaskIdLink = "//*[contains(@class, 'sub-task-container')]/span[contains(text(), '%s')]";
const ATTACHMENT_BTN = '.action-detail-attachment';
const MORE_ATTACHMENT_BTN = "//*[contains(@class,'attachment-component')]//div[@class='more-attachment']/a"
const ATTACHED_FILE = "//*[contains(@class,'attachment-component')]/div[@class='dropdown-menu']//li/a";
let deleteAttachment = "//*[contains(@class,'attachment-component')]/div[@class='dropdown-menu']//li/a[text()='%s']/following-sibling::i";
const DELETE_ALL_ATTACHMENT = "//*[contains(@class,'attachment-component')]/div[@class='dropdown-menu']//li/i"

//----------------------Action Details - Post to Feed----------------
const POST_TO_FEED_CANCEL = "//*[contains(@class,'follow-popup-wrapper') and contains(@class,'active')]//*[@class='follow-popup-action']/button[text()='Cancel']";
const POST_TO_FEED_SHARE = "//*[contains(@class,'follow-popup-wrapper') and contains(@class,'active')]//*[@class='follow-popup-action']/button[text()='Share']";
const POST_TO_FEED_CONTENT = "//*[contains(@class,'follow-popup-wrapper') and contains(@class,'active')]//*[@class='follow-popup-content']//textarea";
const POST_TO_FEED_TITLE = "//*[contains(@class,'follow-popup-wrapper') and contains(@class,'active')]//p[@class='follow-popup-title']";
const FOLLOW_UP_ADD_ACTION = "//*[contains(@class,'follow-popup-wrapper') and contains(@class,'active')]//*[@class='follow-popup-action']/button[text()='Add Action']";
const FOLLOW_UP_NUM_OF_DAY = '.date-count';
const FOLLOW_UP_CONTENT = "//*[contains(@class,'follow-popup-wrapper') and contains(@class,'active')]//*[@class='follow-popup-content']";

//----------------------Action Details - Subtask----------------------
const SUBTASK_ID = ".//*[@class='action-sub-tasks']//span[@class='id text-truncate']";
const SUBTASK_ASSIGNEE = ".//*[@class='action-sub-tasks']//span[@class='group text-truncate']";
const SUBTASK_STATUS = ".//*[@class='action-sub-tasks']//span[contains(@class,'action-status')]";
const PARENT_ID = ".parent-id";
//----------------------Action Table ---------------
const ACTION_TABLE_HEADER = './/tr/th';
const ACTION_TABLE_ROW = ".//*[@class='list-container']//tr";
const FIRST_ACTION_ROW_COL = './/tr[1]/td';

//----------------------Action Create---------------
const CLOSE_ACTION_BTN = "//*[contains(@class, 'section-footer')]/button[text()='Close']";
let serviceType = ".//*[contains(@class, 'menu-list')]//*[text()='%s']";
let commentJs = "CKEDITOR.instances.editor1.setData('%s')";
const CLIENT_BTN = "//button[text()='Client']";
const WORKER_BTN = "//button[text()='Worker']";
const SEARCH_CLIENT = "//*[contains(@class,'search-action-for')]//input";
let clientRow = "//td[text()='%s']";
const CLIENT_SELECTED = "//tr[contains(@class, 'selected')]/td[1]";
const NEXT_BTN = "//*[contains(@class, 'section-footer')]/button[contains(text(),'Next')]";
const SUBMIT_BTN = "//*[contains(@class, 'section-footer')]/button[contains(text(),'Submit')]";
const CANCEL_BTN = "//*[contains(@class, 'section-footer')]/button[contains(text(),'Submit')]/preceding-sibling::*";
const CANCEL_NEXT_BTN = "//*[contains(@class, 'section-footer')]/button[contains(text(),'Next')]/preceding-sibling::*";
const SERVICE_TYPE_ARR = ".//*[contains(@class, 'menu-list')]//button";
const SERVICE_NOT_SHOWN = ".//span[contains(text(),'Service Not Shown')]";
const SAVE_COMMENT = ".//*[@class='edit-block']//*[@class='action-container']/button[contains(text(), 'Save')]";
const CANCEL_COMMENT = ".//*[@class='edit-block']//*[@class='action-container']/button[contains(text(), 'Cancel')]";
const ADD_COMMENT = ".//*[@class='comment']//div[@class='edit-block']//span[contains(text(), 'Add a comment')]";
const ACTION_DETAILS_TITLE = ".//div[contains(@class, 'action-detail-component')]//*[@class='section-header']//*[@class='title']"
const ACTION_SCHEDULE_FORM = ".//hayylo-action-schedule/*[@class='action-create-dynamic-component']";
const CREATE_ACTION_FOR_HEADER = '.action-for-component';
const SEARCH_FOR_CLIENT_HEADER = ".//*[@class='section-header']/h4[text()='Search for a Client']";
const SEARCH_FOR_WORKER_HEADER = ".//*[@class='section-header']/h4[text()='Search for a Worker']";
const SHARE_WITH_CUSTOMER = ".//*[@class='edit-block']//*[@class='action-container']/button[contains(text(), 'Share with customer')]";
const SHARE_WITH_CUSTOMER_TEXT = '.sms-text-content';
const SEND_BTN = "//*[@class='section-footer']/button[text()='Send']";

let assigneeActionSelect = "//*[contains(@class,'primary-assignee')]//div[@class='group-container']//li[text()='%s']";
const FIND_ASSIGNEE = ".single-select-search-box";
const { DAYS, MONTHS } = require('../../libraries/Common');


class Action extends PageObject{
    constructor(driver){
        super(LEFT_NAV_ITEM, '', driver);
        this.browser = driver? driver: browser;
        this.createActionBtn = new UIObject(CREATE_BTN);
        this.refreshBtn = new UIObject(REFRESH_BTN);
        this.applyFilterBtn = new UIObject(APPLY_FILTER_BTN, this.browser);
        this.clientBtn = new UIObject(CLIENT_BTN);
        this.workerBtn = new UIObject(WORKER_BTN);
        this.searchInput = new UIObject(SEARCH_CLIENT);
        this.nextBtn = new UIObject(NEXT_BTN);
        this.submitBtn = new UIObject(SUBMIT_BTN);
        this.cancelBtn = new UIObject(CANCEL_BTN);
        this.successModal = new Modal(SUCCESS_MODAL);
        this.clostBtn = new UIObject(CLOSE_BTN);
        this.statusSelect = new Combobox(STATUS_SELECT);
        this.dueDate = new DateTime(DUE_DATE);
        this.closeEditAction = new UIObject(CLOST_EDIT_ACTION_BTN, this.browser);
        this.statusFilter = new Filter(STATUS_FILTER, this.browser);
        this.typeFilter = new Filter(TYPE_FILTER, this.browser);
        this.groupFilter = new Filter(GROUP_FILTER, this.browser);
        this.branchFilter = new Filter(BRANCH_FILTER, this.browser);
        this.stateFilter = new Filter(STATE_FILTER, this.browser);
        this.caseManagerFilter = new Filter(CASE_MANAGER, this.browser);
        this.priorityFilter = new Filter(PRIORITY_FILTER, this.browser);
        this.statusHistory = new UIObject(HISTORY_LOG);
        this.commentHistory = new UIObject(COMMENT_LOG);
        this.actionIcon = new UIObject(ACTION_ICON, this.browser);
        this.actionTableHeader = new UIObject(ACTION_TABLE_HEADER, this.browser)
        this.actionTableRow = new UIObject(ACTION_TABLE_ROW);
        this.serviceTypeArr = new UIObject(SERVICE_TYPE_ARR);
        this.closeActionBtn = new UIObject(CLOSE_ACTION_BTN);
        this.serviceNotShown = new UIObject(SERVICE_NOT_SHOWN);
        this.clientSelectedRow = new UIObject(CLIENT_SELECTED);
        this.cancelNextBtn = new UIObject(CANCEL_NEXT_BTN);
        this.saveCommentBtn = new UIObject(SAVE_COMMENT);
        this.cancelCommentBtn = new UIObject(CANCEL_COMMENT);
        this.addCommentSpan = new UIObject(ADD_COMMENT, this.browser);
        this.editLatestcommentBtn = new UIObject(EDIT_COMMENT);
        this.deleteLatestCommentBtn = new UIObject(DELETE_LAST_COMMENT);
        this.priorityIcon = new UIObject(PRIORITY_ICON);
        this.spiner = new UIObject(SPINER, this.browser);
        this.linkedActionText = new UIObject(LINKED_ACTION_TEXT);
        this.actionSubTask = new UIObject(ACTION_SUB_TASK);
        this.statusSelected = new UIObject(STATUS_SELECTED);
        this.statusTitle = new UIObject(STATUS_TEXT);
        this.assigneeSelected = new UIObject(ASSIGNEE_SELECTED);
        this.actionDetailsTitle = new UIObject(ACTION_DETAILS_TITLE);
        this.subTaskId = new UIObject(SUBTASK_ID);
        this.subTaskStatus = new UIObject(SUBTASK_STATUS);
        this.subtaskAssignee = new UIObject(SUBTASK_ASSIGNEE);
        this.userName = new UIObject(USER_NAME);
        this.actionScheduleForm = new UIObject(ACTION_SCHEDULE_FORM);
        this.createActionForHeader = new UIObject(CREATE_ACTION_FOR_HEADER);
        this.searchForClientHeader = new UIObject(SEARCH_FOR_CLIENT_HEADER);
        this.searchForWorkerHeader = new UIObject(SEARCH_FOR_WORKER_HEADER);
        this.parentId = new UIObject(PARENT_ID);
        this.postToFeedCancel = new UIObject(POST_TO_FEED_CANCEL);
        this.postToFeedShare = new UIObject(POST_TO_FEED_SHARE);
        this.postToFeedContent = new UIObject(POST_TO_FEED_CONTENT);
        this.followUpAddAction = new UIObject(FOLLOW_UP_ADD_ACTION);
        this.followUpNumOfDay = new UIObject(FOLLOW_UP_NUM_OF_DAY);
        this.postToFeedTitle =  new UIObject(POST_TO_FEED_TITLE);
        this.followUpContent = new UIObject(FOLLOW_UP_CONTENT);
        this.actionName = new UIObject(ACTION_NAME);
        this.userAddress = new UIObject(USER_ADDRESS);
        this.userPhone = new UIObject(USER_PHONE);
        this.findAssigneeBtn = new UIObject(FIND_ASSIGNEE);
        this.assigneeSelect = new UIObject(ASSIGNEE_SELECT);
        this.commentContent = new UIObject(CKEDITOR_CONTENT);
        this.attachmentBtn = new UIObject(ATTACHMENT_BTN);
        this.attachedFiles = new UIObject(ATTACHED_FILE);
        this.moreAttachmentBtn = new UIObject(MORE_ATTACHMENT_BTN);
        this.deleteAllAttachment = new UIObject(DELETE_ALL_ATTACHMENT);
        this.processBar = new UIObject(PROCESS_BAR, this.browser);
        this.shareWithCustomerBtn = new UIObject(SHARE_WITH_CUSTOMER, this.browser);
        this.shareWithCustomerText = new UIObject(SHARE_WITH_CUSTOMER_TEXT, this.browser);
        this.sendBtn = new UIObject(SEND_BTN, this.browser);
    }

    clickCreateAction(){
        this.createActionBtn.click();
        return this;
    }

    clickRefresh(){
        this.refreshBtn.click();
        return this;
    }

    clickApplyFilter(){
        this.applyFilterBtn.click();
        return this;
    }

    clickClientCreation(){
        // Click on Client button after clicking create action
        try {
            this.clientBtn.click();
        } catch (error) {
            this.clickCreateAction();
            this.clientBtn.click();
        }
        
        return this;
    }

    clickWorkerCreation(){
        // Click on Worker button after clicking create action
        try {
            this.workerBtn.click();
        } catch (error) {
            this.clickCreateAction();
            this.workerBtn.click();
        }
        return this;
    }

    searchClient(clientName){
        // Search client name after clicking create client action
        this.searchInput.setText(clientName);
    }

    clickClientRow(clientName){
        // Click on client row after clicking create client action
        browser.pause(1000)
        let clientRowSelector = clientRow.replace('%s', clientName);
        new UIObject(clientRowSelector).getElement().waitForDisplayed();
        new UIObject(clientRowSelector).click();
    }

    selectServiceType(serviceName){
        // Click to select service type after clicking on clickClientRow()
        let serviceTypeSelector = serviceType.replace('%s', serviceName);
        new UIObject(serviceTypeSelector).click();        
    }

    getServiceType(){
        // Get Service Type present when creating action
        let serviceTypeArr = [];
        let serviceTypeElements = this.serviceTypeArr.getElements();
        serviceTypeElements.forEach(serviceType => {
            serviceTypeArr.push(serviceType.getText());
        });
        return serviceTypeArr;
    }

    clickNextBtn(){
        this.nextBtn.click();
        return this;
    }

    clickSubmitBtn(){
        this.submitBtn.click();
        return this;
    }

    clickCancelBtn(){
        // Clicking on cancel button when creating new action at submit step
        this.cancelBtn.click();
        return this;
    }

    clickCancelNextBtn(){
        // Clicking on cancel button when creating new action at next step
        this.cancelNextBtn.click();
        return this;
    }

    clickCloseAction(){
        //Click on close button when creating Action
        this.closeActionBtn.click();
        return this;        
    }

    setComment(comment){
        // Set comment to comment box when creating action
        // Using click to comment box -> insert text to set value for ckeditor 5
        
        this.userName.getElement().waitForDisplayed();
        this.commentContent.click();

        //Workaround to fix isse missing first character when setting text into ckeditor 5
        this.commentContent.setText(comment);
        // this.commentContent.setText(comment[0] + comment);

    }

    updateComment(comment){
        // Set comment to edit comment box when editing comment
        // Using click to comment box -> insert text to set value for ckeditor 5

        this.commentContent.click();

        // Execute ctrl + A to remove old value before insert new one
        browser.keys(['Control', 'a']);
        // browser.keys('\uE003');

        //Workaround to fix isse missing first character when setting text into ckeditor 5
        this.commentContent.setText(comment);
    }

    clickCloseBtn(){
        //Click on close button in Success Modal after created Action
        if(this.clostBtn.getElement().isDisplayed()){
            this.clostBtn.click();
        }
        return this;
    }

    getActionRow(who, type="", status="", due="", assignee=""){
        let actionRow = ".//td/*[text()='"+ who + "']/parent::td/";
        if(type){
            actionRow += "/following-sibling::td[text()='"+ type +"']";
        }
        if(status){
            actionRow += "/following-sibling::td/span[text()='"+ status +"']/parent::*";
        }
        if(due){
            const regex = new RegExp('(.*)\\s+(\\d+)\\.*')
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
            actionRow += "/following-sibling::td/span[text()='"+ due +"']/parent::*";
        }
        if(assignee){
            if(assignee == 'currentUser'){
                assignee = this.getCurrentUserName();
                actionRow += "/following-sibling::td[contains(text(), '"+ assignee +"')]";
            }
            else{
                actionRow += "/following-sibling::td[contains(text(), '"+ assignee +"')]";
            }
        }
        actionRow += "/parent::*";
        this.scrollToTop();

        // if action page doesnot contain any action, then return.
        if(!$('//tbody[2]/tr').isDisplayed()){
            return new UIObject(actionRow).getElement();
        }

        let scrollHeight = browser.execute("return document.body.scrollHeight");
        let index = 500;
        let element = new UIObject(actionRow);
        if(element.isDisplayed(2)){
            return new UIObject(actionRow).getElement();
        }        
        //scroll until found element
        do {
            browser.execute("window.scrollTo(0, "+ index +")");
            index += 200;
            // If found the element then return element
            if(new UIObject(actionRow).isDisplayed()){
                return new UIObject(actionRow).getElement()
            }
        }
        while (index <= scrollHeight); 
        // In case not found the element
        console.log("Not found element in action list");
        return new UIObject(actionRow).getElement();
    }

    clickActionRow(who, type, due){
        let actionRow = ".//td/a[text()='"+ who + "']/parent::td/following-sibling::td[text()='"+ type +"']/following-sibling::td/span[text()='"+ due +"']/parent::*/parent::*";
        let scrollHeight = browser.execute("return document.body.scrollHeight");
        let index = 500;
        let element = new UIObject(actionRow);
        if(element.getElement().isExisting()){
            element.click();
                return;
        }          
        //scroll until found element
        do {
            browser.execute("window.scrollTo(0, "+ index +")");
            index += 200;
            // If found the element click and return
            let element = new UIObject(actionRow);
            if(element.getElement().isExisting()){
                element.click();
                return;
            }
        }
        while (index <= scrollHeight);
    }
    selectStatus(status){
        this.statusSelect.selectByClicking(status);
    }

    clickCloseEditAction(){
        this.closeEditAction.click();
    }

    getStatusHistory(){
        // Get all the history STATUS log of specific action details
        // precondition: action details was pop-up
        // Return List of STATUS log
        let logs = [];
        this.statusHistory.getElements();
        for (let index = 0; index < this.statusHistory.elements.length; index++) {
            const element = this.statusHistory.elements[index];
            logs.push(element.getText());
        }
        return logs;
    }

    getActionCounter(){
        return this.actionIcon.getText();
    }

    getActionTableHeader(){
        let col = [];
        let headerElements = this.actionTableHeader.getElements();
        for (let index = 0; index < headerElements.length; index++) {
            const element = headerElements[index];
            let value = element.getText();
            // running in multiremote, it will return as Array. Normally return as string.
            if(Array.isArray(value))
            {
                col.push(value[0]);
            }
            else{
                col.push(value);
            }            
        }
        return col;        
    }

    getActionTable(priorityElement=false, limit="", dueDateElement=false){
        /*
            priorityElement: true for return priority element, false for return priority html inner
            limit: number of action record will be return, if limit is not defined, it will go through all records
         */
        this.scrollToTop();
        let scrollHeight = this.browser.execute("return document.body.scrollHeight");
        let index = 500;
        let table = [];
        let latestID = 0;
        do {
            let rows = new UIObject(ACTION_TABLE_ROW, this.browser).getElements();
            // console.log(rows.length)
            for (let index = 0; index < rows.length; index++) {
                let row = [];
                const element = rows[index];
                let tds = element.$$('td');
                // Ignore first row as it is header row
                if(tds.length == 0){
                    continue;
                }
                // Continue loop if row ID was stored
                if(latestID != 0 && tds[0].getText() == latestID){
                    latestID = 0;
                    continue;
                }
                else if(tds[0].getText() == latestID){
                    latestID = 0;
                    continue;
                }
                else if(latestID != 0){
                    continue;
                }
                for (let tdIndex = 0; tdIndex < tds.length; tdIndex++) {

                    const td = tds[tdIndex];
                    // Get InnerHTML for column Priority
                    if(tdIndex == 5){
                        if(priorityElement){
                            row.push(td);
                        }
                        else{
                            row.push(this.browser.execute('return arguments[0].innerHTML;', td));
                        }
                    }
                    
                    else{
                        // Get element for column dueDate
                        if(tdIndex == 6 && dueDateElement){
                            row.push(td);
                        }
                        else{
                            row.push(td.getText());
                        }
                        
                    }           
                }
                // Store latest row ID got
                if(index == (rows.length - 1)){
                    latestID = tds[0].getText();
                }
                table.push(row);
                if(limit && parseInt(limit) == table.length){
                    return table;
                }
            }
            this.browser.execute("window.scrollTo(0, "+ index +")");
            index += 200;
        }
        while (index <= scrollHeight);
        return table;
    }

    clickServiceNotShow(){
        this.serviceNotShown.click();
        return this;
    }

    getClientSelectedColor(){
        let selectedRowCss = this.clientSelectedRow.getElement().getCSSProperty('background-color');
        return selectedRowCss.parsed.hex;
    }

    getCreateActionNextBtnColor(){
        let nextBtnCss = this.nextBtn.getElement().getCSSProperty('background');
        return nextBtnCss.parsed.hex;
    }

    clickActionRowByID(id){

        this.waitForSpinerGone();
        // Scroll up to top before going through table
        this.scrollToTop();
        let actionRow = ".//td[text()='"+ id + "']/parent::*";
        let scrollHeight = this.browser.execute("return document.body.scrollHeight");
        let index = 500;
        let element = new UIObject(actionRow, this.browser);
        if(element.getElement().isExisting()){
            element.click();
            return true;
        }
        //scroll until found element
        do {
            this.browser.execute("window.scrollTo(0, "+ index +")");
            index += 500;
            // If found the element click and return
            let element = new UIObject(actionRow, this.browser);
            if(element.getElement().isExisting()){
                element.click();
                this.waitForSpinerGone();
                return true;
            }
        }
        while (index <= scrollHeight);
        console.log("Can not click on action " + id);
        return false;
    }

    clickSaveComment(){
        this.saveCommentBtn.click();
        return this;
    }

    clickCancelComment(){
        this.cancelCommentBtn.click();
        return this;
    }

    clickAddComment(){
        this.addCommentSpan.click();
        return this;
    }

    getCommentHistory(){
        // Get all the history comment of specific action details
        // precondition: action details was pop-up
        // Return List of comment
        let logs = [];
        // browser.pause(5000);
        const commentElements = this.commentHistory.getElements();
        for (let index = 0; index < commentElements.length; index++) {
            const element = commentElements[index];
            logs.push(element.getText());
        }
        return logs;
    }

    
    clickEditLatestComment(){
        this.editLatestcommentBtn.click();
        return this;
    }

    clickDeleteLatestComment(){
        this.deleteLatestCommentBtn.click();
        return this;
    }

    clickDeleteComment(comment){
        let deleteCommentSelector = deleteComment.replace('%s', comment);
        new UIObject(deleteCommentSelector).click();        
        return this;
    }

    checkPriorityIcon(check=true){
        let priorityElement = new UIObject(PRIORITY_ICON).getElement();
        if((check && !priorityElement.getAttribute('class').includes('active')) ||
           (!check && priorityElement.getAttribute('class').includes('active')))
        {
            this.priorityIcon.click();
            this.waitForSpinerGone();
        }
    }

    selectLinkedActionAssignee(assignee){
        let linkedActionSelector = linkedActionSelect.replace('%s', assignee);;
        new UIObject(linkedActionSelector).click();
        this.waitForSpinerGone();     
        return this;
    }

    clickLinkedActionText(){
        this.linkedActionText.click();
        return this;
    }

    setLinkedActionText(text){
        this.linkedActionText.setText(text);
        return this;
    }

    getStatusSelected(){
        // Get status selected in action details
        return this.statusSelected.getText();
    }

    getAssigneeSelected(){
        return this.assigneeSelected.getText();
    }

    getActionDetailsTitle(){
        return this.actionDetailsTitle.getText();
    }

    clickParentId(){
        // Click parent ID in subtask details
        this.parentId.click();
        this.waitForSpinerGone();
    }

    clickSubTaskById(subTaskId){
        let subTaskIdLinkSelector = subTaskIdLink.replace('%s', subTaskId);;
        new UIObject(subTaskIdLinkSelector).click();
        this.waitForSpinerGone();  
    }

    clickCancelPostToFeed(){
        this.postToFeedCancel.click();
        return this;
    }

    setPostToFeedContent(content){
        this.postToFeedContent.setText(content);
        return this;
    }

    getPostToFeedContent(){
        return this.postToFeedContent.getValue();
    }

    clickSharePostToFeed(){
        this.postToFeedShare.click();
        return this;
    }

    clickAddFollowUpAction(){
        this.followUpAddAction.click();
        return this;
    }    

    getFollowUpNumberOfDay(){
        let numberOfDays = this.followUpNumOfDay.getText();
        // numberOfDays example: 10 days
        return numberOfDays.split(" ")[0];
    }

    getPostToFeedTitle(){
        const postToFeedTitle = this.postToFeedTitle.getText();
        return postToFeedTitle;
    }

    getFollowUpContent(){
        const followUpContent = this.followUpContent.getText();
        return followUpContent;
    }
    
    getActionUserName(){
        // Return User Name in action details
        return this.userName.getText();
    }

    getActionName(){
        // Return Action Name in action details
        return this.actionName.getText();
    }

    sortAction(col, type='desc'){
        /*
            col: column name - ex: ID
            type: desc or asc
        */
        this.browser.pause(1000);
        let headerTable = ".//th[text()='" + col + "']";
        let headerClass = new UIObject(headerTable, this.browser).getClassName();
        // Check if colm already sorted
        if(!headerClass){
            new UIObject(headerTable, this.browser).click();
            headerClass = new UIObject(headerTable, this.browser).getClassName();
        }
        // If current sorting is expected, then ignore, if not, click to sort
        if(!headerClass.includes(type)){
            new UIObject(headerTable, this.browser).click();
        }
    }

    findActionAssignee(assignee){
        this.findAssigneeBtn.setText(assignee);
        return this;
    }

    selectActionAssignee(assignee){
        let assigneeActionSelector = assigneeActionSelect.replace('%s', assignee);;
        new UIObject(assigneeActionSelector).click();
        this.waitForSpinerGone();     
        return this;        
    }

    clickPrimaryAssignee(){
        this.assigneeSelect.click();
        return this;
    }

    clickAttachment(){
        this.attachmentBtn.click();
    }

    clickDeleteAttachedFile(fileName){
        let deleteFileBtnSelector = deleteAttachment.replace('%s', fileName);;
        new UIObject(deleteFileBtnSelector).click();
    }

    getAttachmentFiles(){
        let attachments = [];
        const attachmentElements = this.attachedFiles.getElements();
        for (let index = 0; index < attachmentElements.length; index++) {
            const element = attachmentElements[index];
            attachments.push(element.getText());
        }
        return attachments;
    }

    getActionRowByID(id){
        // Scroll up to top before going through table
        this.scrollToTop();
        let cols = [];
        let actionRow = ".//td[text()='"+ id + "']/parent::*";
        let scrollHeight = browser.execute("return document.body.scrollHeight");
        let index = 500;
        let element = new UIObject(actionRow);
        if(element.getElement().isExisting()){
            let colElements = element.getElement().$$('td');
            for (let index = 0; index < colElements.length; index++) {
                const col = colElements[index];
                cols.push(col.getText());
            }
            return cols;
        }
        //scroll until found element
        do {
            browser.execute("window.scrollTo(0, "+ index +")");
            index += 500;
            // If found the element click and return
            let element = new UIObject(actionRow);
            if(element.getElement().isExisting()){
                let colElements = element.getElement().$$('td');
                for (let index = 0; index < colElements.length; index++) {
                    const col = colElements[index];
                    cols.push(col.getText());
                }
                return cols;
            }
        }
        while (index <= scrollHeight);
    }

    waitForProcessBarCompleted(times=20){
    
        // Wait for process bar display 
        this.processBar.isDisplayed(6);

        // Wait until process bar completed and disappear.
        this.processBar.getElement().waitForDisplayed({ timeout:30000, reverse:true})
        return this;
    }

    getLatestActionRow(){
        let row = [];
        let tds = new UIObject(FIRST_ACTION_ROW_COL, this.browser).getElements();
        for (let index = 0; index < tds.length; index++) {
            const element = tds[index];
            let value = element.getText();
            // running in multiremote, it will return as Array. Normally return as string.
            if(Array.isArray(value))
            {
                row.push(value[0]);
            }
            else{
                row.push(value);
            }
        }
        return row;
    }

    clickShareWithCustomer(){
        this.shareWithCustomerBtn.click();
    }

    setShareWithCustomerText(text){
        this.shareWithCustomerText.setText(text);
    }

    clickSend(){
        // Click send message in share with customer popup
        this.sendBtn.click();
    }

}
module.exports = Action;