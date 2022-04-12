const {Given, Then, When} = require('cucumber');
const FeedWorkFlow = require('../../../workflows/mobile/FeedWorkFlow');
const _driver = (typeof myDevice !== 'undefined')? myDevice:browser;
const FeedWF = new FeedWorkFlow(_driver);
var assert = require('assert');

Then('The post has to be displayed on the mobile Feed page', (data)=>{
    FeedWF.FeedPage.goToPage();
    const newestFeed = FeedWF.getNewestFeed();
    console.log(newestFeed);
    data.hashes().forEach(socialFeedData => {
        assert.ok(newestFeed.postContent == socialFeedData.title && newestFeed.postTo.includes(socialFeedData.postTo),
            "The post has not displayed on the feed. Expected: " + socialFeedData.title +  " - Actual " + newestFeed.postContent);
    });
});

When(/^I post a topic on mobile feed\.*/, (data)=>{

    FeedWF.FeedPage.goToPage();
    data.hashes().forEach(socialFeedData => {
        FeedWF.postNewFeed(socialFeedData);
    });
})

Then('Notification is targed to feed', (data)=>{
    if(!_driver.isAndroid){
        console.log("Push notification test just work for Android platform only. IOS is not supported for this type for verification");
        return;
    }    
    const newestFeed = FeedWF.getNewestFeed();
    console.log(newestFeed);
    data.hashes().forEach(socialFeedData => {
        assert.ok(newestFeed.postContent == socialFeedData.title && newestFeed.postTo.includes(socialFeedData.postTo),
            "The post has not displayed on the feed. Expected: " + socialFeedData.title +  " - Actual " + newestFeed.postContent);
    });
});
