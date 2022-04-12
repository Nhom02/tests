const ScheduleWorkFlow = require('../../../workflows/web/ScheduleWorkFlow');
const _browser = (typeof myBrowser !== 'undefined')? myBrowser:browser;
const LoginWorkFlow = require('../../../workflows/web/LoginWorkFlow');
const ClientWorkFlow = require('../../../workflows/web/ClientWorkFlow');
const WorkerWorkFlow = require('../../../workflows/web/WorkerWorkFlow');
const {Given, Then, When} = require('cucumber');
const scope = require('../../hooks/scope');

Then('New imported schedule is displayed in Schedule Page', ()=>{
    new LoginWorkFlow(_browser).doLoginWithRole('Global Admin');
    ScheduleWorkFlow.SchedulePage.goToPage();
    let scheduleData = scope.context.importData.slice(-1)[0];
    ScheduleWorkFlow.isSchedulePresented(scheduleData);
});

Then('New imported schedule is displayed in {string} {string}', (pageType, name)=>{
    let scheduleData = scope.context.importData.slice(-1)[0];
    new LoginWorkFlow(_browser).doLoginWithRole('Global Admin');
    if(pageType == 'Client'){
        new ClientWorkFlow(_browser).ClientPage.goToPage();
        new ClientWorkFlow(_browser).ClientPage.clickEditClient(name);
        new ClientWorkFlow(_browser).EditClientPage.clickTab('Schedules');
        new ClientWorkFlow(_browser).isSchedulePresented(scheduleData);
        
    }
    if(pageType == 'Worker'){
        new WorkerWorkFlow(_browser).WorkerPage.goToPage();
        new WorkerWorkFlow(_browser).WorkerPage.clickEditWorker(name);
        new WorkerWorkFlow(_browser).WorkerPage.clickTab('Schedules');
        new ClientWorkFlow(_browser).isSchedulePresented(scheduleData);
    }
    
})

