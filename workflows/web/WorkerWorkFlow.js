const WorkerPage = require('../../pom/web/Worker');
const assert = require('assert');

class WorkerWorkFlow{
    constructor(driver){
        this.browser = driver? driver: browser;
        this.WorkerPage = new WorkerPage(driver);
    }

    createNewWorker(WorkerData, checkExist=false){
        if(checkExist && this.isWorkerExisted(WorkerData)){
            return;
        }
        this.WorkerPage.clickNewWorkerBtn();
        this.inputForm(WorkerData);
        this.WorkerPage.clickSave();
        this.WorkerPage.successModal.clickClose();
    }

    inputForm(workerData){
        this.WorkerPage.setEmployeeNumber(workerData['employeeNumber'])
                       .setEmailLogin(workerData['emailLogin'])
                       .setFirstName(workerData['firstName'])
                       .setLastName(workerData['lastName'])
                       .setMobilePhone(workerData['mobilePhone'])
                       .selectGroup(workerData['group'])
        workerData['services'].split(',').forEach(service => {
            this.WorkerPage.checkService(service);
        });
    }

    deleteWorker(workerData){
        if(!this.isWorkerExisted(workerData)){
            return;
        }
        this.WorkerPage.workerTable.search(workerData.firstName + ' ' + workerData.lastName);
        this.WorkerPage.clickDeleteWorker(workerData.firstName + ' ' + workerData.lastName);
        this.WorkerPage.confirmModal.clickDelete();
        this.WorkerPage.successModal.clickClose();
    }

    isWorkerExisted(workerData){
        this.WorkerPage.workerTable.search(workerData.firstName + ' ' + workerData.lastName);
        return this.WorkerPage.isWorkerExisted(workerData.firstName + ' ' + workerData.lastName);
    }

    checkWorkerInformation(workerData){
        const dataPresented = this.getClientForm();
        Object.keys(workerData).forEach(function(key) {
            assert.ok(workerData[key] == dataPresented[key],
                "Worker information is not expected. Expected: " + workerData[key] + ' - Actual: '+ dataPresented[key]);
        });
    }

    getClientForm(){
        let workerData = {};
        workerData['firstName'] = this.WorkerPage.getFirstName();
        workerData['employeeNumber'] = this.WorkerPage.getEmployeeNumber();
        workerData['emailLogin'] = this.WorkerPage.getEmailLogin();
        workerData['lastName'] = this.WorkerPage.getLastName();
        workerData['mobilePhone'] = this.WorkerPage.getMobilePhone();
        workerData['group'] = this.WorkerPage.getGroup();
        workerData['services'] = this.WorkerPage.getServices();
        return workerData;
    }

    getWorkerUserId(workerName){
        /*
            Return user_id of specific worker
        */
        console.log("Worker name " + workerName);
        this.WorkerPage.goToPage();
        this.WorkerPage.workerTable.search(workerName);
        this.WorkerPage.clickEditWorker(workerName);
        return this.WorkerPage.getWorkerUserId();

    }

    isSchedulePresented(scheduleData){
        let scheduleTime = scheduleData['Schedule_time']; // 5:20:10 PM
        scheduleTime = scheduleTime.split(':').splice(0,2); // [5, 20]

        let schedulePresented = this.SchedulePage.getScheduleByWhen(scheduleTime[0] + ":" + scheduleTime[1]);
        assert.ok(schedulePresented['workerName'] == scheduleData['Worker_name'],
        'Schedule is not imported successfully. Expected worker ' + scheduleData['Worker_name'] + ' - Actual ' + schedulePresented['workerName']);
    }

    deleteAutomationWorker(){
        this.WorkerPage.goToPage();
        this.WorkerPage.workerTable.search('Automation');
        const usernames = this.WorkerPage.workerTable.getListName();
        for (let index = 0; index < usernames.length; index++) {
            const name = usernames[index];
            this.WorkerPage.workerTable.search(name);
            this.WorkerPage.clickDeleteWorker(name);
            this.WorkerPage.confirmModal.clickDelete();
            this.WorkerPage.successModal.clickClose();
        }
    }

}

module.exports = WorkerWorkFlow;