const EditCompanyDetailsWF = require('../../../workflows/web/EditCompanyDetailsWorkFlow');
const LoginWorkFlow = require('../../../workflows/web/LoginWorkFlow');
const _browser = (typeof myBrowser !== 'undefined')? myBrowser:browser;
var assert = require('assert');
const {Given, Then, When} = require('cucumber');
const scope = require('../../hooks/scope');
const CompanyWF = require('../../../workflows/web/CompanyWorkFlow');
const DataImportWF = require('../../../workflows/web/DataImportWorkFlow');
const ClientWF = require('../../../workflows/web/ClientWorkFlow');
const WorkerWF = require('../../../workflows/web/WorkerWorkFlow');
const ClientWorkFlow = new ClientWF(_browser);
const WorkerWorkFlow = new WorkerWF(_browser);
const DataImportWorkFlow = new DataImportWF(_browser);
const CompanyWorkFlow = new CompanyWF(_browser);
const EditCompanyDetailsWorkFlow = new EditCompanyDetailsWF(_browser);


Given("I'm in Edit Company Page", ()=>{
    EditCompanyDetailsWorkFlow.EditCompanyDetails.goToPage();
})

When("I create new Client Service Type", (data)=>{
    if(!scope.context.serviceData.hasOwnProperty("client")){
        scope.context.serviceData.client = [];
    }
    data.hashes().forEach(serviceData => {
        EditCompanyDetailsWorkFlow.addNewClientServiceType(serviceData);
        scope.context.serviceData.client.push(serviceData);
    });
})

When("I delete Client Service Type", ()=>{
    clientServiceData = scope.context.serviceData.client
    clientServiceData.forEach(serviceData => {
        EditCompanyDetailsWorkFlow.deleteClientServiceType(serviceData)
    });
})

When("I create new Worker Service Type", (data)=>{
    if(!scope.context.serviceData.hasOwnProperty("worker")){
        scope.context.serviceData.worker = [];
    }
    data.hashes().forEach(serviceData => {
        EditCompanyDetailsWorkFlow.addNewWorkerServiceType(serviceData);
        scope.context.serviceData.worker.push(serviceData);
    });
})

When("I delete Worker Service Type", ()=>{
    workerServiceData = scope.context.serviceData.worker
    workerServiceData.forEach(serviceData => {
        EditCompanyDetailsWorkFlow.deleteWorkerServiceType(serviceData)
    });
})

When("I click edit company {string}", (companyName)=>{
    CompanyWorkFlow.CompanyPage.clickEditCompany(companyName);
    scope.context.tempData['companyName'] = companyName;
})

When("I turn on {string} checkbox in edit company page", (value)=>{
    CompanyWorkFlow.EditCompanyPage.checkCompanyFeature(value);
})

When("I Click save on Add Company Tab", ()=>{
    CompanyWorkFlow.saveCompany();
})

Then("The status of subaction checkbox should be checked", ()=>{
    let companyName = scope.context.tempData['companyName'];
    CompanyWorkFlow.CompanyPage.clickEditCompany(companyName);
    expect(CompanyWorkFlow.EditCompanyPage.getCompanyFeatureElement('Subaction')).toHaveAttrContaining('class', 'check',{ message: 'Subaction is not checked'})
})

Given("{string} company subaction is turn off", (companyName)=>{ 
    new LoginWorkFlow(browser).doLoginWithRole('Hayylo Admin');

    CompanyWorkFlow.CompanyPage.goToPage();
    CompanyWorkFlow.CompanyPage.clickEditCompany(companyName);
    CompanyWorkFlow.EditCompanyPage.unCheckCompanyFeature('Subaction');
    CompanyWorkFlow.saveCompany();
});

Given("{string} company subaction is turn on", (companyName)=>{
    testConfig.userCreds.forEach(element => {
        if(element['role'] == 'Hayylo Admin')
        {
          loginCred = element;
        }
      });
      new LoginWorkFlow(browser).goToLoginPage()
                                    .doLogin(loginCred['userName'], loginCred['passWord']);    
    CompanyWorkFlow.CompanyPage.goToPage();
    CompanyWorkFlow.CompanyPage.clickEditCompany(companyName);
    CompanyWorkFlow.EditCompanyPage.checkCompanyFeature('Subaction');
    CompanyWorkFlow.saveCompany();
})

When("I click add new company", ()=>{
    CompanyWorkFlow.CompanyPage.clickNewCompanyBtn();
})

When("I create new company", (data)=>{
    data.hashes().forEach(companyData => {
        CompanyWorkFlow.createNewCompany(companyData);
        scope.context.tempData['companyName'] = companyData['companyName'];
    });
})

Given("I delete company {string}", (companyName)=>{
    CompanyWorkFlow.deleteCompany(companyName);
})

When("I update Client Service Type", (data)=>{
    EditCompanyDetailsWorkFlow.EditCompanyDetails.goToPage();
    data.hashes().forEach(serviceData => {
        EditCompanyDetailsWorkFlow.editClientServiceType(serviceData);
    });
})

When("I set {string} as custom filter for {string} company", (customFilterValue, companyName)=>{
    if (companyName == 'Automation Company'){
        companyName = testConfig.company.companyName     
    }
    CompanyWorkFlow.CompanyPage.clickEditCompany(companyName);
    CompanyWorkFlow.EditCompanyPage.checkCompanyFeature('CUSTOM01 Actions Filter');
    CompanyWorkFlow.EditCompanyPage.setCustomFilter(customFilterValue)
    CompanyWorkFlow.saveCompany();
});


When("I upload external request in company page", (data)=>{

    if(!scope.context.hasOwnProperty("importData")){
        scope.context.importData = [];
    }
    

    let today = new Date();
    today.setDate(today.getDate() + 7);
    importData = [];

    // Login by Global Admin then get Worker and Client ID
    new LoginWorkFlow(_browser).doLoginWithRole('Global Admin');
    let defaultClient;
    if(data.hashes()[0]['clientName'] == '' || !data.hashes()[0]['clientName']){
        testConfig.userCreds.forEach(element => {
            if(element['role'] == 'Client')
            {
                defaultClient = element;
                importData['Client_user_id'] = ClientWorkFlow.getClientUserId(defaultClient.firstName + ' ' + defaultClient.lastName);
            }                
        });
        console.log(defaultClient);
    }else{
        importData['Client_user_id'] = ClientWorkFlow.getClientUserId(data.hashes()[0]['clientName']);
        importData['Client_name'] = data.hashes()[0]['clientName'];
    }

    let defaultWorker;
    if(data.hashes()[0]['workerName'] == '' || !data.hashes()[0]['workerName']){
        testConfig.userCreds.forEach(element => {
            if(element['role'] == 'Worker')
            {
                defaultWorker = element;
                importData['Worker_user_id'] = WorkerWorkFlow.getWorkerUserId(defaultWorker.firstName + ' ' + defaultWorker.lastName);
            }                
        });
        console.log(defaultWorker);
    }
    else{
        importData['Worker_user_id'] = WorkerWorkFlow.getWorkerUserId(data.hashes()[0]['workerName']);
        importData['Worker_name'] = data.hashes()[0]['workerName'];
    }
    
    importData['Ext_schedule_no'] = 'Automation_import_request_' + today.getTime();
    
    
    importData['Service_name'] = data.hashes()[0]['serviceName'];
    importData['Service_friendly_name'] = data.hashes()[0]['serviceName'];
    importData['Schedule_date'] = (today.getMonth() + 1) + '/' + today.getDate() + '/'+today.getFullYear();// MM/DD/YYYY format
    importData['Schedule_time'] = new Date().toLocaleTimeString();
    importData['Schedule_duration'] = 30; // 30 mins
    importData['Import_status'] = data.hashes()[0]['importStatus'];
    importData['Mandatory_parameter'] = 'N';
    importData['Skill_id'] = data.hashes()[0]['skillId'];
    
    

    // Login as Hayylo Admin to execute upload data
    new LoginWorkFlow(_browser).doLoginWithRole('Hayylo Admin');

    // Go to edit company
    // Get company from data/features/web/default.js
    CompanyWorkFlow.CompanyPage.goToPage();
    CompanyWorkFlow.CompanyPage.clickEditCompany(testConfig.company.companyName);

    // Move to import Data tab
    CompanyWorkFlow.EditCompanyPage.clickTab('Import Data');

    // config download location if running by devtools not webdriver
    try {
        browser.call(async () => {
            const puppeteerBrowser = await _browser.getPuppeteer()
            const page = (await puppeteerBrowser.pages())[0];
            await page._client.send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: downloadDir
          });
        })        
    }catch(err) {
        logMessage("Cannot config download location for browser using puppeteer");
    }

    // Download template
    CompanyWorkFlow.downloadExternalRequestTemplate();

    // Update data for import external data
    let importFileName = CompanyWorkFlow.updateExcelExternalImportData(importData);

    // Upload external import data excel file to hayylo admin
    CompanyWorkFlow.uploadExternalData(importFileName);
    scope.context.tempData['importFileName'] = importFileName;

    // Accept alert
    CompanyWorkFlow.EditCompanyPage.acceptAlert();
    scope.context.importData.push(importData);

});

Then("External data is imported successfully", ()=>{
    const fileNameImported = scope.context.tempData['importFileName'];
    DataImportWorkFlow.DataImportEventPage.goToPage();
    DataImportWorkFlow.isImportSuccess(fileNameImported);
});

When("I create new App Client Service Type", (data)=>{
    data.hashes().forEach(serviceData => {
        EditCompanyDetailsWorkFlow.addNewAppServiceType(serviceData);
    });
})
