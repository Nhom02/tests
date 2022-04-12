const _TM4JAPI = require('./TM4JAPI');
const {titleCase, convertSpaceToUnderLine, upperCaseFirstLetter, convertDotToUnderLine, lowerCaseFirstLetter} = require('./Common');
const JENKINS_URL = (process.env.JENKINS_URL)? process.env.JENKINS_URL:"";
let platform = (process.env.PLATFORM)? process.env.PLATFORM:"";
const PROJECT_KEY = (process.env.PROJECT_KEY)? process.env.PROJECT_KEY:"CPT";
const CYCLE_KEY = (process.env.CYCLE_KEY)? process.env.CYCLE_KEY:"CPT-R53";
const JIRA_ACCESS_KEY = (process.env.JIRA_ACCESS_KEY)? process.env.JIRA_ACCESS_KEY:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMzM2NjE0Ny1kMWRjLTNjMzAtYTljZi1lZDBmNWI4ZDdmNTQiLCJjb250ZXh0Ijp7ImJhc2VVcmwiOiJodHRwczpcL1wvaGF5eWxvLmF0bGFzc2lhbi5uZXQiLCJ1c2VyIjp7ImFjY291bnRJZCI6IjVlOTYzNzc1MTMwMmY0MGMwZWRlMmVlOCJ9fSwiaXNzIjoiY29tLmthbm9haC50ZXN0LW1hbmFnZXIiLCJleHAiOjE2MjQwNzQ3NTAsImlhdCI6MTU5MjUzODc1MH0.__FBCyxhDbvsxOKq5zHZjYOp55hNhMDCeedHbi7sePw";
const JIRA_EXECUTED_ID = (process.env.JIRA_EXECUTED_ID)? process.env.JIRA_EXECUTED_ID:"5e9637751302f40c0ede2ee8";
const JIRA_ASSIGNED_ID = (process.env.JIRA_ASSIGNED_ID)? process.env.JIRA_ASSIGNED_ID:"";
const fs = require('fs');
const path = require('path');
async function pushResult() {
    // Push result to Jira tickets
    // If Cycle key is not set, then stop
    if(!CYCLE_KEY){
      console.log("Stop push result as CYCLE_KEY was not set");
      return;
    }
    const settings = {
        'url': 'https://api.adaptavist.io/'
    };
    const projectKey = PROJECT_KEY;
    const authorization = JIRA_ACCESS_KEY
    const TM4JAPI = new _TM4JAPI(settings, projectKey, authorization);
    let list = fs.readdirSync('../report-json');
    for (let i = 0; i < list.length; i++) {
        let filename = path.join('../report-json', list[i]);
        fs.readFile(filename, 'utf8', function (err, data) {
          if (err) throw err;
          const automationResults = JSON.parse(data);
          // Loop for each result
          automationResults.forEach(result => {
            // loop for each test case for each result
            let featureName = titleCase(result.name);
            let jenkinsUrlPartII = JENKINS_URL + 'testReport/CucumberJUnitReport-';
            if(platform != 'Android' && platform != 'Ios'){
              platform = result.metadata.browser.name
              let browserVersion = convertDotToUnderLine(result.metadata.browser.version)
              let platformVersion = result.metadata.platform.name
              jenkinsUrlPartII += lowerCaseFirstLetter(platform) + '.' + browserVersion + '.' + platformVersion;     
            }
            jenkinsUrlPartII +=  '/' +  featureName + '/' + featureName + '_';
            result.elements.forEach(element => {
              let fullJenkinsUrl = jenkinsUrlPartII + upperCaseFirstLetter(convertSpaceToUnderLine(element.name)) + '/'
              // Check if tags contain Key of MT4J tool
              let testCaseKey;
              let testKeyResult = 'Pass';
              let comment = 'Link to result';
              let duration = 0;
              
              const regex = new RegExp('@TestCaseKey=(.+)');
              // Verify title match regex: @TestCaseKey=CPT-T1

              
              element.steps.forEach(step => {
                duration += step.result.duration
                // console.log(step.result);
                if(step.result.status == 'failed'){
                  testKeyResult = 'Fail';
                  comment = step.result.error_message;
                }
              });

              element.tags.forEach(tag => {
                if(tag.name.match(regex)){
                  // if tags contain TM4J testCaseKey, then send results to Cycle
                  testCaseKey = tag.name.match(regex)[1];
                }
              });
              if(testCaseKey){
                let form = {
                  "projectKey": projectKey,
                  "testCaseKey": testCaseKey,
                  "testCycleKey": CYCLE_KEY,
                  "statusName": testKeyResult,
                  "testScriptResults": [
                    {
                      "statusName": testKeyResult
                    }
                  ],
                  "environmentName": platform,
                  "executedById": JIRA_EXECUTED_ID,
                  "assignedToId": JIRA_ASSIGNED_ID,
                  "executionTime": duration/1000000,
                  "comment": "<a href=\"" + fullJenkinsUrl + "\">" + comment + "</a>"
                }
                TM4JAPI.createTestExecution(form);
              }
            });
          });
        });
    }
}

pushResult();