const fetch = require('node-fetch');
const fs = require("fs");
const FormData = require('form-data'); 
const Common = require('./Common');
const form = new FormData();
const process = require('process');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

class TM4JAPI {
    constructor(jiraSettings, projectKey, authorization) {
        this._jiraSettings = jiraSettings;
        this._projectKey = projectKey;
        this._authorization = authorization;
    }
 
    async pushResultAndCreateCycle() {
        console.log("-------------STARTING PUSH RESULT TO JIRA---------------");
        form.append('file', fs.createReadStream('./Results/result.zip'));
        const request = this._buildRequest(form);
        const url = encodeURI(this._jiraSettings.url + 'tm4j/v2/automations/executions/cucumber?projectKey=' + this._projectKey);
        const response = await fetch(url, request);
        const passStatus = [200, 201]
        if(!passStatus.includes(response.status)){
            console.log("-------------ERROR WHEN PUSHING RESULT TO JIRA---------------");
            console.log(response)
            throw 'Error creating test cycle.';
        }
        else{
            console.log("-------------COMPLETED PUSH RESULT TO JIRA---------------");
        }
        const jsonResponse = await response.json();
        // console.log('Test cycle created:' + String(jsonResponse));
    }
 
    async createTestExecution(form){
        console.log("-------------STARTING PUSH RESULT TO JIRA---------------");
        // API document 
        // https://support.smartbear.com/tm4j-cloud/api-docs/#operation/listTestExecutions

        const request = this._buildRequest(form);
        const url = encodeURI(this._jiraSettings.url + 'tm4j/v2/testexecutions');
        const response = await fetch(url, request);
        const passStatus = [200, 201]
        if(!passStatus.includes(response.status)){
            console.log("-------------ERROR WHEN PUSHING RESULT TO JIRA---------------");
            console.log(response)
            throw 'Error creating test cycle.';
        }
        else{
            console.log("-------------COMPLETED PUSH RESULT TO JIRA---------------");
        }
        const jsonResponse = await response.json();        

    }

    _buildRequest(body) {
        return {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this._authorization
            }
        };
    }
}

module.exports = TM4JAPI;