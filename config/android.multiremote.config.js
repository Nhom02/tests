const { config } = require('./multiremote.config');
userName = (process.env.BROWSERSTACK_USERNAME)? process.env.BROWSERSTACK_USERNAME: 'dungnguyen44';
accessKey = (process.env.BROWSERSTACK_ACCESS_KEY)? process.env.BROWSERSTACK_ACCESS_KEY:'NyNCN3YhM9LdhpvhVDzL';
// app = (process.env.BROWSERSTACK_APP_ID)? process.env.BROWSERSTACK_APP_ID: 'bs://3dfc94ab99c796918f46272a397219008afe7490'; //Android - sandbox
app = (process.env.BROWSERSTACK_APP_ID)? process.env.BROWSERSTACK_APP_ID: 'bs://9d51974ec181f5c6175e0968c7b57e3876879d06'; //Android - prod
build = (process.env.BUILD)? process.env.BUILD: '1.5.3';
android_version = (process.env.OS_VERSION)? process.env.OS_VERSION: '10.0';
android_name = (process.env.DEVICE_NAME)? process.env.DEVICE_NAME: 'Samsung Galaxy Note 20';
config.capabilities.myDevice = 
{
    user: userName,
    key: accessKey,
    hostname: 'hub-cloud.browserstack.com',
    services: ['selenium-standalone'],
    capabilities: {
        'device' : android_name,
        'os_version' : android_version,
        'app' : app,
        'project' : 'Hayylo Mobile Automation',
        'build' : build,
        'name': 'android_automation',
        "autoAcceptAlerts": true,
        'automationName': 'UIAutomator2',
        "browserstack.acceptInsecureCerts" : "true",
        'browserstack.geoLocation': 'AU',
        'browserstack.resignApp': 'false',
        'browserstack.appium_version': '1.9.1',
        "browserstack.idleTimeout": 600
    }
}
exports.config = config;