const FeedAndroid = require('../../pom/mobile/FeedAndroid');
const FeedIOS = require('../../pom/mobile/FeedIOS');

class FeedWorkFlow{
    constructor(_driver){
        this.driver = _driver? _driver: driver;
        this.FeedPage = this.driver.isAndroid ? new FeedAndroid(this.driver): new FeedIOS(this.driver);
    }

    getNewestFeed(){
        let feedData = [];
        let newestFeedHeader = this.FeedPage.getNewestFeedHeader();
        const regex = new RegExp('(.+)\\sposted to\\s(.+)');
        feedData.postTo = newestFeedHeader.match(regex)[2];
        feedData.postAs = newestFeedHeader.match(regex)[1];
        feedData.postContent = this.FeedPage.getNewestFeedContent();
        return feedData;
    }

    postNewFeed(data){
        this.FeedPage.clickShareUpdate();
        this.FeedPage.selectTeam(data['team']);
        this.FeedPage.setFeedContent(data['title']);
        this.FeedPage.clickPost();
        // Click Post It in confirm screen
        this.FeedPage.clickPost();
        this.FeedPage.clickDone();
        this.driver.pause(10000);
    }

}

module.exports = FeedWorkFlow;