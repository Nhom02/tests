const { After, AfterAll, BeforeAll, Before } = require('cucumber');
const scope = require('./scope');
const _browser = (typeof myBrowser !== 'undefined')? myBrowser:browser;
const WorkerWF = require('../../workflows/web/WorkerWorkFlow');
const UserWF = require('../../workflows/web/UserWorkFlow');
const ClientWF = require('../../workflows/web/ClientWorkFlow');
const EditCompanyDetailsWF = require('../../workflows/web/EditCompanyDetailsWorkFlow');
const LoginWF = require('../../workflows/web/LoginWorkFlow');



BeforeAll(function (){
    scope.context = {};
    scope.context.serviceData = {};
    scope.context.tempData = {};
    scope.context.worker = [];
    scope.context.user = [];
    scope.context.client = [];
    scope.context.serviceData.client = [];
    scope.context.serviceData.worker = [];
    console.log("Beforeall");
});

AfterAll(function(){
    // cleanup data if environment is sandbox or uat or prod
    if(global.testEnv != 'dev'){
        try {
            const WorkerWorkFlow = new WorkerWF(_browser);
            const ClientWorkFlow = new ClientWF(_browser);
            const UserWorkFlow = new UserWF(_browser);
            const EditCompanyDetailsWorkFlow = new EditCompanyDetailsWF(_browser);
            const LoginWorkFlow = new LoginWF(_browser);
            const workerCreated = scope.context.worker
            LoginWorkFlow.doLoginWithRole('Global Admin')
            WorkerWorkFlow.WorkerPage.goToPage();
            workerCreated.forEach(workerData => {
                WorkerWorkFlow.deleteWorker(workerData);    
            });
            const userCreated = scope.context.user
            UserWorkFlow.UserPage.goToPage();
            userCreated.forEach(userCreated => {
                UserWorkFlow.deleteUser(userCreated);    
            });
            UserWorkFlow.deleteAutomationUser();
            const clientCreated = scope.context.client
            console.log("Client created " + clientCreated);
            ClientWorkFlow.ClientPage.goToPage();
            clientCreated.forEach(clientData => {
                ClientWorkFlow.deleteClient(clientData)
            });
            ClientWorkFlow.deleteAutomationClient();
            const clientServiceData = scope.context.serviceData.client
            EditCompanyDetailsWorkFlow.EditCompanyDetails.goToPage();
            clientServiceData.forEach(serviceData => {
                EditCompanyDetailsWorkFlow.deleteClientServiceType(serviceData)
            });
            const workerServiceData = scope.context.serviceData.worker
            workerServiceData.forEach(serviceData => {
                EditCompanyDetailsWorkFlow.deleteWorkerServiceType(serviceData)
            });            
        } catch (error) {
            console.log("Error when clean up data ", error)
        }
    }
})