let UIObject = require('../UIObject');
const Common = require('../../../libraries/Common')
const DATE_SWITCH = "//div[@class='datepicker-days']//th[@class='datepicker-switch']";
const MONTH_SWITCH = "//div[@class='datepicker-months']//th[@class='datepicker-switch']";
const YEAR_SWITCH = "//div[@class='datepicker-years']//th[@class='datepicker-switch']";
const NEXT_YEAR = "//div[@class='datepicker-years']//th[@class='next']";
const PREV_YEAR = "//div[@class='datepicker-years']//th[@class='prev']";
const MIN_YEAR = "//div[@class='datepicker-years']//tbody//td//span[1]";
const MAX_YEAR = "//div[@class='datepicker-years']//tbody//td//span[last()]";
const ACTIVE_YEAR = "//div[@class='datepicker-years']//tbody//span[contains(@class, 'active')]";
const ACTIVE_MONTH = "//div[@class='datepicker-months']//tbody//span[contains(@class, 'active')]";
const ACTIVE_DATE = "//div[@class='datepicker-days']//tbody//td[contains(@class,'active')]";
let selectDate = "//div[@class='datepicker-days']//tbody//td[text()='%s' and not(contains(@class,'new')) and not(contains(@class,'old'))]";
let selectMonth = "//div[@class='datepicker-months']//tbody//span[text()='%s']";
let selectYear = "//div[@class='datepicker-years']//tbody//span[text()='%s']";
let dateBeforeActive = "//div[@class='datepicker-days']//tbody//td[text()<%s and not(contains(@class, 'new'))]";
let dateAfterActive = "//div[@class='datepicker-days']//tbody//td[text()>%s and not(contains(@class, 'old'))]";
const MONTH = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
}

class DateTime extends UIObject{
    /*
    The class is present for date picker which is displayed after click on selecting date
    Preconditions: make sure that only one date picker is displaying.
    */
    constructor(selector){
        super(selector);
        this.dateSwitchBtn = new UIObject(DATE_SWITCH);
        this.monthSwitchBtn = new UIObject(MONTH_SWITCH);
        this.yearSwitchBtn = new UIObject(YEAR_SWITCH);
        this.nextYearBtn = new UIObject(NEXT_YEAR);
        this.preYearBtn = new UIObject(PREV_YEAR);
        this.currentDate = new UIObject(ACTIVE_DATE);
    }

    openDatePicker(){
        this.click();
        return this;
    }

    getDate(){
        let date = this.currentDate.getText();
        return date;
    }

    getMonth(){
        // Return month number such as 01, 02
        let month = new UIObject(ACTIVE_MONTH).getText();
        new UIObject(ACTIVE_MONTH).click();
        return Common.getKeyByValue(MONTH, month);
    }

    getYear(){
        let year = new UIObject(ACTIVE_YEAR).getText();
        new UIObject(ACTIVE_YEAR).click();
        return year;
    }

    getSelectedTime(){
        // get selected time in datapicker
        // return [date, month, year]
        this.openDatePicker();
        this.dateSwitchBtn.click();
        this.monthSwitchBtn.click();
        let year = this.getYear();
        let month = this.getMonth();
        let date = this.getDate();
        return [date, month, year];
    }

    getRangeOfYear(){
        // return current range year
        // return  Min Year, Max Year
        let maxYear;
        let minYear;
        minYear = new UIObject(MIN_YEAR).getText();
        maxYear = new UIObject(MAX_YEAR).getText();
        return [minYear, maxYear];

    }

    reachYearRecursive(year){
        let rangeYear = this.getRangeOfYear();
        let minYear = rangeYear[0];
        let maxYear = rangeYear[1];
        if(parseInt(minYear) > parseInt(year)){
            this.preYearBtn.click();
            this.reachYearRecursive(year);
        }
        else if(parseInt(year) > parseInt(maxYear)){
            this.nextYearBtn.click();
            this.reachYearRecursive(year);
        }
    }

    selectYear(year){
        this.reachYearRecursive(year);
        let selectYearSeletor = selectYear.replace('%s', year);
        new UIObject(selectYearSeletor).click();
    }

    selectMonth(month){
        // select month
        let selectMonthSeletor = selectMonth.replace('%s', month);
        new UIObject(selectMonthSeletor).click();
    }

    selectDate(date){
        // select date 
        let selectDateSeletor = selectDate.replace('%s', parseInt(date));
        new UIObject(selectDateSeletor).click(); 
    }

    selectYearMonthDate(year, month, date){
        /*
            year - Year to be selected, example: 2020
            month - Month to be selected, example: 01
            date - Date to be selected, example: 30
        */
        this.openDatePicker();
        this.dateSwitchBtn.click();
        this.monthSwitchBtn.click();
        this.selectYear(year);
        this.selectMonth(MONTH[month]);
        this.selectDate(date);
    }

    selectByJavascripts(date){
        // Select date by using javascripts
        var date = new Date();
        // date.setDate(date.getDate() + 5);
        browser.execute('arguments[0].datepicker("setDate", '+ date +');', $('[hayylodatepicker]'))
        // $('[hayylodatepicker]').datepicker("setDate", date);
    }

    getDateBeforeActiveDate(){
        // Return list of elements date before active date
        const activeDate = this.getDate();
        let dateBeforeActiveSeletor = dateBeforeActive.replace('%s', activeDate);
        return new UIObject(dateBeforeActiveSeletor).getElements();
    }

    getDateAfterActiveDate(){
        // Return list of element date after active date
        const activeDate = this.getDate();
        let dateAfterActiveSeletor = dateAfterActive.replace('%s', activeDate);
        return new UIObject(dateAfterActiveSeletor).getElements();

    }

    selectCurrentDate(){
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        this.selectYearMonthDate(yyyy, mm, dd);
    }

}

module.exports = DateTime;