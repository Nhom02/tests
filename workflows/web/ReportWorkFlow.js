const ActionSummary = require('../../pom/web/reports/ActionSummary');

class ReportWorkFlow{
    constructor(){
        this.ActionSummary = new ActionSummary();
    }

    getActionTable(){
        return this.ActionSummary.getReportTable();
    }
}

module.exports = new ReportWorkFlow();