const DataImportEvent = require('../../pom/web/DataImportEvent');
var assert = require('assert');

class DataImportWorkFlow{
    constructor(driver){
        this.browser = driver? driver: browser;
        this.DataImportEventPage = new DataImportEvent(driver);
    }

    isImportSuccess(importedFileName)
    {

        const regex = new RegExp('Reason.*Success');
        // Verify title match regex: ID: 114672 / 115068
        this.DataImportEventPage.clickEventDetails(importedFileName);
        let alertText = this.DataImportEventPage.getAlertText();
        this.DataImportEventPage.acceptAlert();
        assert.ok(alertText.match(regex), "External data is not imported - " + alertText);
    }
}

module.exports = DataImportWorkFlow;