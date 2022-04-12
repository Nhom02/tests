const CompanyPage = require('../../pom/web/company/Company');
const EditCompanyPage = require('../../pom/web/company/EditCompany');
const AddCompanyPage = require('../../pom/web/company/AddCompany');
const Excel = require('exceljs');
const workbook = new Excel.Workbook();
const fs = require("fs");
const COMPANY_FEATURES = {
    'subaction': 'Subaction',
    'quickrequest': 'Quick Request'
}

class CompanyWorkFlow{
    constructor(driver){
        this.browser = driver? driver: browser;
        this.CompanyPage = new CompanyPage(driver);
        this.EditCompanyPage = new EditCompanyPage(driver);
        this.AddCompanyPage = new AddCompanyPage(driver);
    }

    deleteCompany(companyName){
        this.CompanyPage.companyTable.search(companyName);
        this.CompanyPage.clickDeleteCompany(companyName);
        this.CompanyPage.confirmModal.clickDelete();
        this.CompanyPage.successModal.clickClose();
    }

    saveCompany(){
        this.EditCompanyPage.clickSaveCompany();
        this.CompanyPage.successModal.clickClose();
        return this;
    }

    addCompanyContact(companyData){
        this.AddCompanyPage.setContactName(companyData['contactName'])
                           .setContactTelephone(companyData['contactTelephone'])
                           .setContactEmail(companyData['contactEmail'])
                           .selectContactTitle(companyData['contactTitle']); 
        return this;
    }

    addCompanyProfile(companyData){
        this.AddCompanyPage.setCompanyName(companyData['companyName'])
                           .setCompanyCode(companyData['companyCode'])
                           .setCompanyTrade(companyData['companyTrade'])
                           .setCompanyABNCode(companyData['companyABN'])
                           .setCompanyAddress(companyData['companyAddress'])
                           .setCompanyTrade(companyData['companyTrade'])
                           .setCompanyTelephone(companyData['companyTelephone'])
                           .setCompanyEmail(companyData['companyEmail'])
                           .setCompanyWebsite(companyData['companyWebsite'])
        return this;
    }

    addCompanySettings(companyData){
        companyData['features'].split(',').forEach(feature => {
            this.AddCompanyPage.checkCompanyFeature(COMPANY_FEATURES[feature]);
        });
        return this;
    }

    createNewCompany(companyData){
        this.CompanyPage.clickNewCompanyBtn();
        this.addCompanyProfile(companyData)
            .addCompanySettings(companyData)
            .addCompanyContact(companyData)
            .saveCompany();
    }

    downloadExternalRequestTemplate(){
        this.EditCompanyPage.clickExternalRequestTemplate();
        let path = downloadDir + '/external_request_template_import.xlsx'
        for (let index = 0; index < 5; index++) {
            if(fs.existsSync(path)) break;
            browser.pause(1000);
        }
    }

    updateExcelExternalImportData(importData){
        let fileName = new Date().getTime() + '.xlsx';
        browser.call(async ()=>{
            await workbook.xlsx.readFile(downloadDir + '/external_request_template_import.xlsx');
            let worksheet = await workbook.getWorksheet('External Data');
            let i=1;
            let defaultCols = worksheet.getRow(i).values;
            for (const key in importData) {
                if (importData.hasOwnProperty(key) && defaultCols.includes(key)) {
                    const col = this.getExcelExternalCol(key, defaultCols);
                    worksheet.getCell(col + '2').value = importData[key];
                }
            }          
            await workbook.xlsx.writeFile(downloadDir + '/' + fileName);
        });
        return fileName;
    }

    getExcelExternalCol(key, defaultData){
        let index = defaultData.indexOf(key);
        return String.fromCharCode(64 + index);
    }

    uploadExternalData(fileName){
        this.EditCompanyPage.importExternalExcelData(downloadDir + '/' + fileName);
    }
}

module.exports = CompanyWorkFlow;