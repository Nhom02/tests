const {Given, Then, When} = require('cucumber');
const RequestSTWF = require('../../../workflows/mobile/RequestSTWorkFlow');
const _browser = (typeof myDevice !== 'undefined')? myDevice:browser;
const RequestSTWorkFlow = new RequestSTWF(_browser);
const NotificationWorkFlow = require('../../../workflows/mobile/NotificationWorkFlow');
const NotificationWF = new NotificationWorkFlow(_browser);
const scope = require('../../hooks/scope')

When('I make a request something in mobile application', (data)=>{
    let scheduleData = [];
    // scheduleData["Schedule_date"] = '27/10/2020';
    // workarround as found issue can not navigate to notification page if user already in this page
    NotificationWF.NotificationPage.goToPage();
    RequestSTWorkFlow.RequestPage.goToPage();
    let defaultWorker;
    data.hashes().forEach(requestData => {
        if(requestData['workerName'] == '' || !requestData['workerName']){
            testConfig.userCreds.forEach(element => {
                if(element['role'] == 'Worker')
                {
                    defaultWorker = element;
                    requestData['workerName'] = defaultWorker.firstName
                }                
            });
            console.log(defaultWorker);
        }
        // Get month from imported schedule
        if(requestData['serviceType'] == 'Schedule Change'){
            scheduleData = scope.context.importData.slice(-1)[0];
            console.log(scheduleData['Schedule_date']);
            requestData['serviceDate'] = scheduleData['Schedule_date'].split('/').splice(1,1); // MM/DD/YYYY -> DD
            console.log(requestData);
        }
        RequestSTWorkFlow.createNewRequest(requestData);
    });
});