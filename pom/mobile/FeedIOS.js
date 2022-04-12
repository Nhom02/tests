const UIObject = require('../../components/mobile/UIObject');
const PageObject = require('../../components/mobile/PageObject');
const LEFT_MENU = 'Feed';
const SHARE_UPDATE_BTN = '//XCUIElementTypeButton[@name="Want to share an update?"]';
const UPDATE_CONTENT = 'value == "Want to share an update?"';
const EDIT_CONTENT = "//XCUIElementTypeApplication[@name='hayylo']//XCUIElementTypeTable//XCUIElementTypeTextView";
const TEAM_BTN = "//XCUIElementTypeApplication[@name='hayylo']//XCUIElementTypeStaticText[@name='Team']/preceding-sibling::*[1]"; //'//XCUIElementTypeStaticText[@name="Team"]';
const teamSelect = '//XCUIElementTypeStaticText[@name="%s"]';
const POST_BTN = '//XCUIElementTypeStaticText[@name="Post it"]';
const POSTS = '//*[@class="android.widget.RelativeLayout"]';
const FEED_HEADERS = '//XCUIElementTypeApplication//XCUIElementTypeTable//XCUIElementTypeCell/XCUIElementTypeStaticText[2]';
const ACTIVE_TAB = '//XCUIElementTypeButton[@name="ACTIVITY"]';
const TASKS_TAB =   '//XCUIElementTypeButton[@name="TASKS"]';
const BACK = '//XCUIElementTypeButton[@name="CloseDarkblue"]';
const DONE_BTN = '//XCUIElementTypeStaticText[@name="DONE"]';
const NEWEST_FEED_CONTENT = '//XCUIElementTypeApplication[@name="hayylo"]//XCUIElementTypeTable//XCUIElementTypeCell[2]/XCUIElementTypeStaticText[3]';

class FeedAndroid extends PageObject {
    constructor(_driver){
        super(_driver, LEFT_MENU);
        this.driver = (_driver)? _driver: browser;
        this.posts = new UIObject(POSTS, this.driver);
        this.feedHeaders = new UIObject(FEED_HEADERS, this.driver);
        this.activeTab = new UIObject(ACTIVE_TAB, this.driver);
        this.taskTab = new UIObject(TASKS_TAB, this.driver);
        this.shareUpdateBtn = new UIObject(SHARE_UPDATE_BTN, this.driver);
        this.teamBtn = new UIObject(TEAM_BTN, this.driver);
        this.feedContent = new UIObject(`-ios predicate string:${UPDATE_CONTENT}`, this.driver);
        this.editFeedContent = new UIObject(EDIT_CONTENT, this.driver);
        this.postBtn = new UIObject(POST_BTN, this.driver);
        this.backBtn = new UIObject(BACK, this.driver);
        this.doneBtn = new UIObject(DONE_BTN, this.driver);
        this.newestFeed = new UIObject(NEWEST_FEED_CONTENT, this.driver);
    }

    getListPosts(){
        this.feedHeaders.isDisplayed(5);
        let elements = this.feedHeaders.getElements();
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            console.log(element.getText());
            
        }
    }

    clickTaskTab(){
        this.taskTab.click();
        return this;
    }

    clickActiveTab(){
        this.activeTab.click();
        return this;
    }

    clickShareUpdate(){
        this.shareUpdateBtn.click();
        return this;
    }

    selectTeam(team){
        console.log("Click on team button");
        this.teamBtn.click();
        let teamSelectSelector = teamSelect.replace('%s', team);
        console.log("Wait for team selection displayed");
        // new UIObject(teamSelectSelector, this.driver).getElement().waitForDisplayed();
        new UIObject(teamSelectSelector, this.driver).click();
    }

    clickPost(){
        this.postBtn.click();
        return this;
    }

    setFeedContent(content){
        this.feedContent.click();
        this.editFeedContent.setText(content);
        return this;
    }

    getNewestFeedContent(){
        return this.newestFeed.getText();
    }

    back(){
        this.backBtn.click();
    }

    clickDone(){
        this.doneBtn.click();
    }

    getNewestFeedHeader(){
        return this.feedHeaders.getText();
    }

}

module.exports = FeedAndroid;