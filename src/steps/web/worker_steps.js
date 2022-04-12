const WorkerWF = require('../../../workflows/web/WorkerWorkFlow');
const ActionWF = require('../../../workflows/web/ActionWorkFlow');
var assert = require('assert');
const {Given, Then, When} = require('cucumber');
const scope = require('../../hooks/scope');
const UserWorkFlow = require('../../../workflows/web/UserWorkFlow');
const _browser = (typeof myBrowser !== 'undefined')? myBrowser:browser;
const WorkerWorkFlow = new WorkerWF(_browser);
const ActionWorkFlow = new ActionWF(_browser);

// Given("I'm in Worker Page", ()=>{
//     WorkerWorkFlow.WorkerPage.goToPage();
// })

When("I create new Worker", (data)=>{
    if(!scope.context.hasOwnProperty("worker")){
        scope.context.worker = [];
    }
    data.hashes().forEach(workerData => {
        WorkerWorkFlow.createNewWorker(workerData);
        scope.context.worker.push(workerData);
    });
})
When("I create new Worker if not exist", (data)=>{
    if(!scope.context.hasOwnProperty("worker")){
        scope.context.worker = [];
    }
    data.hashes().forEach(workerData => {
        WorkerWorkFlow.createNewWorker(workerData, true);
        scope.context.worker.push(workerData);
    });
})

When("I delete worker", ()=>{
    // Get the worker data stored when creating worker
    const workerCreated = scope.context.worker
    workerCreated.forEach(workerData => {
        WorkerWorkFlow.deleteWorker(workerData);    
    });
})

When("Create new action is opened in worker {string} details", (worker)=>{
    WorkerWorkFlow.WorkerPage.workerTable.waitForProcessingMessageGone();
    WorkerWorkFlow.WorkerPage.clickEditWorker(worker)
                             .waitForSpinerGone()
                             .clickActionTab();
    ActionWorkFlow.ActionPage.clickCreateAction();
});

Then("The Search for a worker screen is not shown", ()=>{
    expect(ActionWorkFlow.ActionPage.searchForWorkerHeader.getElement()).not.toBeDisplayed({ message: 'The Search for a worker screen is shown', });
    ActionWorkFlow.ActionPage.clickCloseAction();
});

When("I go to worker {string} details page", (worker)=>{
    WorkerWorkFlow.WorkerPage.workerTable.waitForProcessingMessageGone();
    WorkerWorkFlow.WorkerPage.clickEditWorker(worker)
                             .waitForSpinerGone()
                             .clickActionTab();
});

Then("There will be a Action tab in worker container", ()=>{
    expect(WorkerWorkFlow.WorkerPage.actionTab.getElement()).toBeDisplayed({ message: 'Action tab in worker container is not shown', });
});

Then("I can allows viewing all of the action of selected worker", ()=>{
    expect(WorkerWorkFlow.WorkerPage.actionComponent.getElement()).toBeDisplayed({ message: 'Action content in worker container is not shown', });
});

Then("The userId of worker {string} in editing and deleting should be matched together", (worker)=>{
    let editUrl = browser.getUrl();
    let editUserId = editUrl.split("/").slice(-1);
    WorkerWorkFlow.WorkerPage.goToPage();
    let deleteUrl = WorkerWorkFlow.WorkerPage.getDeleteBtn(worker).getAttribute('href');
    let deleteUserId = deleteUrl.split("/").slice(-1);
    assert.ok(parseFloat(editUserId) == parseFloat(deleteUserId),
              "The userId in editing and deleting are not matched together. Edit: " + editUserId + " - Delete: " + deleteUserId);
});

Then('The information of this worker should be displayed as same the input data', ()=>{
    let workerData = scope.context.worker.slice(-1)[0];
    assert.ok(WorkerWorkFlow.isWorkerExisted(workerData),
    'Client ' + workerData.firstName + ' is not displayed');

    WorkerWorkFlow.WorkerPage.clickEditWorker(workerData.firstName + ' ' + workerData.lastName);
    WorkerWorkFlow.checkWorkerInformation(workerData);
    WorkerWorkFlow.WorkerPage.clickCancel();    
});

When('I delete single worker', ()=>{
    let workerData = scope.context.worker.slice(-1)[0];
    WorkerWorkFlow.deleteWorker(workerData);
});

Then('The deleted worker should not be displayed in Worker Page', ()=>{
    let workerData = scope.context.worker.pop();
    assert.ok(!WorkerWorkFlow.isWorkerExisted(workerData), 'The deleted worker still display in Worker Page');
});