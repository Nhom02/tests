const PageObject = require('../../../components/web/PageObject');
const DateTime = require('../../../components/web/datetime/DateTime');
const UIObject = require('../../../components/web/UIObject');
const ReportTable = require('../../../components/web/table/ReportTable');

const LEFT_NAV_ITEM = "Reports";
const SUB_NAV_ITEM = "Action Summary";
const FROM_DATE = "[name='from_date']";
const TO_DATE = "[name='to_date']";
const EXPORT_BTN = ".//button[text()='Export']";
const FILTER_BTN = ".//button[text()='Filter']";
const REPORT_TABLE = '#tbl_data';

class ActionSummary extends PageObject{
    constructor(){
        super(LEFT_NAV_ITEM, SUB_NAV_ITEM);
        this.fromDate = new DateTime(FROM_DATE);
        this.toDate = new DateTime(TO_DATE);
        this.exportBtn = new UIObject(EXPORT_BTN);
        this.reportTable = new ReportTable(REPORT_TABLE);
        this.filterBtn = new UIObject(FILTER_BTN)
    }

    clickExport(){
        this.exportBtn.click();
        return this;
    }

    getReportTable(){
        return this.reportTable.getTable();
    }

    getReportTableHeader(){
        return this.reportTable.getColHeaderName();
    }

    clickFilter(){
        this.filterBtn.click();
        return this;
    }

    selectFromDate(year, month, date){
        this.fromDate.selectYearMonthDate(year, month, date);
        return this;
    }

    selectToDate(year, month, date){
        this.toDate.selectYearMonthDate(year, month, date);
        return this;
    }
}
module.exports = ActionSummary;