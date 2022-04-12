const PageObject = require('../../components/web/PageObject');
const UIObject = require('../../components/web/UIObject');
const DateTime = require('../../components/web/datetime/DateTime')
const LEFT_NAV_ITEM = "Schedules";
const VIEW_TODAY_BTN = "//span[text()='View Today']";
const SEARCH_INPUT = "//*[@id='schedule-list_filter']//input";
// const clientCol = "//*[text()[normalize-space(.)='Today']/following-sibling::node()[1][self::br]/following-sibling::node()[1][self::text()[contains(normalize-space(.),'%time')]]]/following-sibling::*[1]";
const clientCol = "//*[text()[self::text()[contains(normalize-space(.),'%time')]]]/following-sibling::*[1]";
// const workerCol = "//*[text()[normalize-space(.)='Today']/following-sibling::node()[1][self::br]/following-sibling::node()[1][self::text()[contains(normalize-space(.),'%time')]]]/following-sibling::*[2]";
const workerCol = "//*[text()[self::text()[contains(normalize-space(.),'%time')]]]/following-sibling::*[2]";

class Schedule extends PageObject{
    constructor(){
        super(LEFT_NAV_ITEM);
        this.viewTodayBtn = new UIObject(VIEW_TODAY_BTN);
        this.searchInput = new DateTime(SEARCH_INPUT);
    }

    clickViewToday(){
        this.viewTodayBtn.click();
    }

    search(date){
        if(date == 'today'){
            this.searchInput.selectCurrentDate();
            return;
        }
        this.searchInput.selectYearMonthDate(date);
    }

    getScheduleByWhen(time){
        let scheduleData = [];
        
        let clientColSeletor = clientCol.replace('%time', time);
        scheduleData['clientName'] = new UIObject(clientColSeletor).getText();

        let workerColSeletor = workerCol.replace('%time', time);
        scheduleData['workerName'] = new UIObject(workerColSeletor).getText();

        return scheduleData;
    }
}

module.exports = Schedule;