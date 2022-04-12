
const Common = require('../libraries/Common');
const path = require('path');
const fs = require('fs');
// const TEST_CONFIG = require('../data/features/web_mobile/default').TEST_CONFIG;
const TEST_CONFIG = require('../data/default').TEST_CONFIG;
global.downloadDir = path.join(__dirname, 'tempDownload');
global.uploadDir = path.join(__dirname, 'upload');
global.testEnv = (process.env.TEST_ENV)? process.env.TEST_ENV:"sandbox";
global.testConfig = TEST_CONFIG[testEnv];
userName = (process.env.BROWSERSTACK_USERNAME)? process.env.BROWSERSTACK_USERNAME: 'dungnguyen44';
accessKey = (process.env.BROWSERSTACK_ACCESS_KEY)? process.env.BROWSERSTACK_ACCESS_KEY:'NyNCN3YhM9LdhpvhVDzL';
// app = (process.env.BROWSERSTACK_APP_ID)? process.env.BROWSERSTACK_APP_ID: 'bs://bcf98b0ed8f5338554d0707ee1e2af6d610a0aef'; //iOS
app = (process.env.BROWSERSTACK_APP_ID)? process.env.BROWSERSTACK_APP_ID: 'bs://3dfc94ab99c796918f46272a397219008afe7490'; //Android
build = (process.env.BUILD)? process.env.BUILD: '1.5.3';
console.log(testConfig.url);

const {
    ReportAggregator,
    HtmlReporter
} = require('@rpii/wdio-html-reporter');
const log4j = require('log4js');

exports.config = {
    // ...
    suites: {
        social_feed: [
            './src/features/mobile/social_feed/social_feed.feature'
        ],
        request_something: [
            './src/features/mobile/request_something/request_something.feature'
        ],
        invite_people: [
            './src/features/mobile/invite_people/invite_people.feature'
        ],        
    },
    services: [
        ['selenium-standalone', {
            skipSeleniumInstall: false,
            args: {
                version : "3.141.59",
                drivers : {
                    chrome : {
                        version : "86.0.4240.22"
                    }
                }
            },
            installArgs: {
                drivers: {
                    chrome: { version: '86.0.4240.22' },
                }
            },        
        }]
    ],
    // ...

    // runner: 'local',

    maxInstances: 1,

    framework: 'cucumber',
    cucumberOpts: {
        timeout:600000,
        require: ['./src/steps/*/*.js', './src/steps/*/*/*.js', './src/hooks/*.js'],
        failFast: false,
        tagExpression: 'not @skip',
        compilers: ['js:babel-register']
    },
    outputDir: __dirname,
    sync: true,

    deprecationWarnings: true,
    bail: 0,
    waitforTimeout: 30000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    reporters: 
    [
    'spec',
    [ 'cucumberjs-json', {
            jsonFolder: 'report-json',
            language: 'en',
        },
    ],
    ['junit', {
        outputDir: './report',
        outputFileFormat: function(opts) {
            return `results-${opts.cid}.xml`
        },
        errorOptions: {
            error: 'message',
            failure: 'message',
            stacktrace: 'stack'
        }
    }],
    [HtmlReporter, {
        debug: true,
        outputDir: './reports/html-reports/',
        filename: 'report.html',
        reportTitle: 'Test Report Title',
        //to show the report in a browser when done
        showInBrowser: false,
        //to initialize the logger
        LOG: log4j.getLogger("default")
    }]
    ],
    
    
    capabilities: {
        myBrowser: {
            baseUrl: testConfig.url,
            capabilities: {
                browserName: 'chrome',
                'goog:chromeOptions': {
                    prefs: {
                        'directory_upgrade': true,
                        'prompt_for_download': false,                
                        'download.default_directory': downloadDir,
                    },
                    args: ['--ignore-certificate-errors'],
                  }  
            }
        }
    },

    onPrepare: async function (config, capabilities) {

        // make sure download directory exists
        if (!fs.existsSync(downloadDir)){
            fs.mkdirSync(downloadDir);
        }        
        // remove old result before running
        await Common.rmFileInDir('./report-json');
        await Common.rmFileInDir('./report');
        // await Common.rmFileInDir('./reports');
        await Common.rmFileInDir('./Results');
        let reportAggregator = new ReportAggregator({
            outputDir: './reports/html-reports',
            filename: 'master-report.html',
            reportTitle: 'Master Report'
        });
        reportAggregator.clean();

        global.reportAggregator = reportAggregator;
        console.log("Report Aggregator has been initialized");
    },

    beforeScenario: function (uri, feature, scenario, sourceLocation) {
        console.log('Start scenario ' + scenario['name']);
    },

    onComplete: async function (exitCode, config, capabilities, results) {   
        await global.reportAggregator.createReport({
            config: config,
            capabilities: capabilities,
            results: results
        });
        await Common.rmFileInDir(downloadDir);
    },

    afterStep: function ({ uri, feature, step }, context, { error, result, duration, passed }) {

        // Capture image when test got failed.
        if(!passed){
            // take screen shot for browser
            if(typeof myBrowser !== 'undefined'){
                Common.takeScreenshot(myBrowser)
            }
            
            // take screen shot for device
            if(typeof myDevice !== 'undefined'){
                Common.takeScreenshot(myDevice)
            }
            
        }
    },


};