const SocialFeedWorkFlow = require('../../../../workflows/web/SocialFeedWorkFlow');
const _browser = (typeof myBrowser !== 'undefined')? myBrowser:browser;

var assert = require('assert');
const scope = require('../../../hooks/scope');
const {When} = require('cucumber');

When(/^I post a topic on social feed\.*/, (data)=>{
    // Wait for table generated
    data.hashes().forEach(socialFeedData => {
        new SocialFeedWorkFlow(_browser).postNewFeed(socialFeedData);
    });
})