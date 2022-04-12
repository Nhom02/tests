const SchedulePage = require('../../pom/web/Schedule');
const assert = require('assert');

class ScheduleWorkFlow{
    constructor(){
        this.SchedulePage = new SchedulePage();
    }

    isSchedulePresented(scheduleData){
        // this.SchedulePage.clickViewToday();
        let scheduleTime = scheduleData['Schedule_time']; // 5:20:10 PM
        scheduleTime = scheduleTime.split(':').splice(0,2); // [5, 20]

        let schedulePresented = this.SchedulePage.getScheduleByWhen(scheduleTime[0] + ":" + scheduleTime[1]);
        assert.ok(schedulePresented['clientName'] == scheduleData['Client_name'],
        'Schedule is not imported successfully. Expected client ' + scheduleData['Client_name'] + ' - Actual ' + schedulePresented['clientName']);
        assert.ok(schedulePresented['workerName'] == scheduleData['Worker_name'],
        'Schedule is not imported successfully. Expected worker ' + scheduleData['Worker_name'] + ' - Actual ' + schedulePresented['workerName']);
    }
}

module.exports = new ScheduleWorkFlow();