const { config } = require('./multiremote.config');
userName = (process.env.BROWSERSTACK_USERNAME)? process.env.BROWSERSTACK_USERNAME: 'dungnguyen44';
accessKey = (process.env.BROWSERSTACK_ACCESS_KEY)? process.env.BROWSERSTACK_ACCESS_KEY:'NyNCN3YhM9LdhpvhVDzL';
// app = (process.env.BROWSERSTACK_APP_ID)? process.env.BROWSERSTACK_APP_ID: 'bs://e754c99eb911651022441a8d9610a726e2c4f487'; //iOS sandbox
app = (process.env.BROWSERSTACK_APP_ID)? process.env.BROWSERSTACK_APP_ID: 'bs://0b6c2aaf3e7f0bba97ed5b7327114ebb81f55a6e'; //prod
build = (process.env.BUILD)? process.env.BUILD: '1.5.3';
ios_version = (process.env.OS_VERSION)? process.env.OS_VERSION: '13';
ios_name = (process.env.DEVICE_NAME)? process.env.DEVICE_NAME: 'iPhone XS';

config.capabilities.myDevice = 
{
    user: userName,
    key: accessKey,
    hostname: 'hub-cloud.browserstack.com',
    services: ['selenium-standalone'],
    capabilities: {
        'device' : ios_name,
        'os_version' : ios_version,
        'app' : app,
        // Set other BrowserStack capabilities
        'project' : 'Hayylo Mobile Automation',
        'name': 'ios_automation',
        "autoAcceptAlerts": true,
        'build' : build,
        "browserstack.acceptInsecureCerts" : "true",
        'browserstack.geoLocation': 'AU',
        'browserstack.appium_version': '1.9.1',
        "browserstack.idleTimeout": 600
        // 'browserstack.resignApp': 'false' // https://www.browserstack.com/docs/app-automate/appium/advanced-features/disable-resigning-of-apps#nodejs               
    }
}
exports.config = config;