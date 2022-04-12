const Table = require('./Table');
const LASTEST_PAGE = "(//li[@class='paginate_button'])[last()]";
const NEXT_PAGE = "//li[@class='paginate_button']//i[@class='fa-angle-right']";
const PREV_PAGE = "//li[@class='paginate_button']//i[@class='fa-angle-left']";
const TABLE_ROW = ".//tbody//tr";


class ReportTable extends Table{
    constructor(element){
        super(element);
        this.latestPage = new UIObject(LASTEST_PAGE);
        this.nextPage = new UIObject(NEXT_PAGE);
        this.prevPage = new UIObject(PREV_PAGE);
    }

    getTotalPage(){
        return this.latestPage.getAttribute('data-page-number');
    }

    goToNextPage(){
        this.nextPage.click();
        return this;
    }

    goToPrevPage(){
        this.prevPage.click();
        return this;
    }

    getTable(){
        const header = this.getColHeaderName();
        let table = [];
        const totalPage = this.getTotalPage();
        for (let index = 1; index <= totalPage; index++) {
            this.getElement().$('thead').waitForDisplayed();
            let rows = new UIObject(TABLE_ROW).getElements();
            for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                let row = [];
                const element = rows[rowIndex];
                let tds = element.$$('td');
                for (let tdIndex = 0; tdIndex < tds.length; tdIndex++) {
                    const td = tds[tdIndex];
                    row.push(td.getText());
                }
                table.push(row);
                
            }
            if(index != totalPage){
                this.goToNextPage();
            }
        }
        return table;
    }

}

module.exports = ReportTable;