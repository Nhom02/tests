const {Given, Then, When} = require('cucumber');
const ReportWorkFlow = require('../../../workflows/web/ReportWorkFlow');
const fs = require("fs");
const xlsx = require('node-xlsx');
const assert = require('assert');
const { logMessage } = require('../../../libraries/Common');


When("I select from date {string}", (fromDate)=>{
    const regex = new RegExp('(.*)\\s+(\\d+)\\.*');
    let today = new Date();
    if(fromDate.match(regex)){
        
        let days = fromDate.match(regex)[2];
        if(fromDate.match(regex)[1] == 'next'){
            today.setDate(today.getDate() + parseInt(days));
        }
        if(fromDate.match(regex)[1] == 'previous'){
            today.setDate(today.getDate() - parseInt(days));
        }
    }
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    ReportWorkFlow.ActionSummary.selectFromDate(yyyy, mm, dd);
});


When("I select to date {string}", (toDate)=>{
    const regex = new RegExp('(.*)\\s+(\\d+)\\.*');
    let today = new Date();
    if(toDate.match(regex)){
        let days = toDate.match(regex)[2];
        if(toDate.match(regex)[1] == 'next'){
            today.setDate(today.getDate() + parseInt(days));
        }
        if(toDate.match(regex)[1] == 'previous'){
            today.setDate(today.getDate() - parseInt(days));
        }
    }
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    ReportWorkFlow.ActionSummary.selectToDate(yyyy, mm, dd);
});

When("I click filter in Action Summary page", ()=>{
    ReportWorkFlow.ActionSummary.clickFilter();
});

Then("The Excel file be displayed consistency with data in the UI", ()=>{
    let reportData = ReportWorkFlow.getActionTable();
    ReportWorkFlow.ActionSummary.clickExport();

    // config download location if running by devtools not webdriver
    try {
        browser.call(async () => {
            const puppeteerBrowser = await browser.getPuppeteer()
            const page = (await puppeteerBrowser.pages())[0];
            await page._client.send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: downloadDir
          });
        })        
    }catch(err) {
        logMessage("Cannot config download location for browser using puppeteer");
    }



    let path = downloadDir + '/Actions Summary Report.xlsx'
    for (let index = 0; index < 5; index++) {
        if(fs.existsSync(path)) break;
        browser.pause(1000);
    }
    var obj = xlsx.parse(path);
    let excelData = obj[0]['data'];

    // Remove 4 first row in excel file as they are title
    excelData.splice(0, 4);
    const verifyCol = [
        'Region', 'Last Event By', 'Level 2', 'Created by',
        'Client Name', 'Admitting Branch', 'Routing Group',
        'Status'
    ];
    assert.ok(parseInt(reportData.length) == parseInt(excelData.length),
        "The Excel leght file is not displayed consistency with data in the UI. UI " + reportData.length + " - Excel " + excelData.length);
    let header = ReportWorkFlow.ActionSummary.getReportTableHeader();
    for (let row = 0; row < excelData.length; row++) {
        for (let col = 0; col < header.length; col++) {
            const colName = header[col];
            if(verifyCol.includes(colName)){
                assert.ok(excelData[row][col] == reportData[row][col],
                    "The Excel file is not displayed consistency with data in the UI. UI " + reportData[row][col] + " - Excel " + excelData[row][col]);
            }
        }
    }
})