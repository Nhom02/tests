const path = require('path');
const fs = require('fs');
const {
    ReportAggregator,
    HtmlReporter
} = require('@rpii/wdio-html-reporter');
const log4j = require('log4js');
const Common = require('../libraries/Common');
const TEST_CONFIG = require('../data/default').TEST_CONFIG;
global.downloadDir = path.join(__dirname, 'tempDownload');
global.uploadDir = path.join(__dirname, 'upload');
global.testEnv = (process.env.TEST_ENV)? process.env.TEST_ENV:"sandbox";
global.testConfig = TEST_CONFIG[testEnv]

exports.config = {
    // ==================================
    // Where should your test be launched
    // ==================================
    //    
    runner: 'local',

    // =====================
    // Server Configurations
    // =====================    
    // hostname: 'localhost',

    // port: 9515,
    // path: '/',

    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory    

    specs: [
        './src/web/features/*/*.feature',
    ],

    // define specific suites
    // using wdio wdio.conf.js --suite login --suite user
    suites: {
        action: [
            './src/features/web/action/action.feature'
        ],
        social_feed: [
            './src/features/web/social_feed/social_feed.feature'
        ],
        user: [
            './src/features/web/user/user.feature'
        ],
        data_import: [
            './src/features/web/data_import/data_import.feature'
        ]
    },

    // Patterns to exclude.
    exclude: [
        'src/features/mobile/**',

    ],

    // Max instance for each browser
    maxInstances: 1,

    capabilities: [
    {
        browserName: 'chrome',
        'goog:chromeOptions': {
            prefs: {
                'directory_upgrade': true,
                'prompt_for_download': false,                
                'download.default_directory': downloadDir,
            },
            args: ['--ignore-certificate-errors'],
          }                         
    },
    // {
    //     browserName: 'firefox',                
    // },
    // {
    //     browserName: 'MicrosoftEdge',
    //     'ms:edgeOptions':{
    //         prefs: {
    //             'directory_upgrade': true,
    //             'prompt_for_download': false,                
    //             'download.default_directory': downloadDir,
    //         }
    //     }
    // }
    ],

    // Set directory to store all logs into
    outputDir: __dirname,

    // bail (default is 0 - don't bail, run all tests).
    bail: 0,

    baseUrl: testConfig.url,

    // Default timeout for all waitForXXX commands.
    waitforTimeout: 20000,

    framework: 'cucumber',

    reporters: [
        // 'spec',
        ['json',{
            outputDir: './Results'
        }],
        [ 'cucumberjs-json', {
                jsonFolder: 'report-json',
                language: 'en',
            },
        ],
        ['junit', {
            outputDir: './report',
            outputFileFormat: function(opts) {
                return `results-${opts.cid}.${opts.capabilities.browserName}.xml`
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
        }
        ]
    ],

    cucumberOpts: {
        timeout: 1000*60*30,
        require: ['./src/steps/*/*.js', './src/steps/*/*/*.js', './src/hooks/*.js'],
        failFast: false,
        tagExpression: 'not @company and not @action_caseManager and not @skip',
        compilers: ['js:babel-register']
    },


    services: [
        // 'chromedriver',
        // ['selenium-standalone', 
        // {
        //     skipSeleniumInstall: false,
        //     args: {
        //         version : "3.141.59",
        //         drivers : {
        //             chrome : {
        //                 version : "84.0.4147.30"
        //             },
        //             // firefox: {
        //             //     version: '0.27.0'
        //             // },
        //             // edge:
        //             // { version: '86.0.586.0' }
        //         }
        //     },
        //     installArgs: {
        //         drivers: {
        //             chrome: { version: '84.0.4147.30' },
        //             // firefox: { version: '0.27.0' },
        //         }
        //     },            
        // }
        // ]
    ],


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
            reportTitle: 'Master Report',
            browserName: capabilities[0].browserName
        });
        reportAggregator.clean();

        global.reportAggregator = reportAggregator;
        console.log("Report Aggregator has been initialized");
    },

    onComplete: async function (exitCode, config, capabilities, results) {   
        await global.reportAggregator.createReport({
            config: config,
            capabilities: capabilities,
            results: results
        });
        await Common.rmFileInDir(downloadDir);
    },

    before: () => {
        require('@babel/register');
        global.sprintf = require('sprintf-js').sprintf;
    },

    beforeScenario: function (uri, feature, scenario, sourceLocation) {
        console.log('Start scenario ' + scenario['name']);
    },

    afterStep: function ({ uri, feature, step }, context, { error, result, duration, passed }) {

        // Capture image when test got failed.
        if(!passed){
            Common.takeScreenshot(browser)
        }
    },

}