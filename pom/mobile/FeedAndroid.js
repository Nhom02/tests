const UIObject = require('../../components/mobile/UIObject');
const PageObject = require('../../components/mobile/PageObject');
const LEFT_MENU = 'Feed';
const SHARE_UPDATE_BTN = "//*[@resource-id='com.hayylo.android.hayyloapp:id/txtShare']";
const UPDATE_CONTENT = "//*[@resource-id='com.hayylo.android.hayyloapp:id/rvArticle']";
const EDIT_CONTENT = "//*[@resource-id='com.hayylo.android.hayyloapp:id/edtShare']"
const TEAM_BTN = '//*[@resource-id="com.hayylo.android.hayyloapp:id/TeamTitle"]';
const teamSelect = "//*[@resource-id='com.hayylo.android.hayyloapp:id/txt_team_name' and @text='%s']";
const POST_BTN = '//*[@resource-id="com.hayylo.android.hayyloapp:id/btnPostIt"]';
const POSTS = '//*[@class="android.widget.RelativeLayout"]';
const FEED_HEADERS = '//*[@resource-id="com.hayylo.android.hayyloapp:id/textview_newfeed_header_title"]';
const ACTIVE_TAB = '//*[@class="android.widget.TextView" and @text="ACTIVITY"]';
const TASKS_TAB =   '//*[@class="android.widget.TextView" and @text="TASKS"]';
const FEED_CONTENT = '//*[@resource-id="com.hayylo.android.hayyloapp:id/textview_newfeed_timeline_message"]';
const DONE_BTN = '//*[@resource-id="com.hayylo.android.hayyloapp:id/btnDone"]';

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
        this.feedContent = new UIObject(UPDATE_CONTENT, this.driver);
        this.editFeedContent = new UIObject(EDIT_CONTENT, this.driver);
        this.postBtn = new UIObject(POST_BTN, this.driver);
        this.feedContent = new UIObject(FEED_CONTENT, this.driver);
        this.doneBtn = new UIObject(DONE_BTN, this.driver);
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
        this.teamBtn.click();
        let teamSelectSelector = teamSelect.replace('%s', team);
        new UIObject(teamSelectSelector, this.driver).getElement().waitForDisplayed();
        new UIObject(teamSelectSelector, this.driver).click();
    }

    clickPost(){
        this.postBtn.click();
        return this;
    }

    setFeedContent(content){
        // this.feedContent.click();
        this.editFeedContent.setText(content);
        return this;
    }

    getNewestFeedHeader(){
        return this.feedHeaders.getText();
    }

    getNewestFeedContent(){
        return this.feedContent.getText();
    }

    clickDone(){
        this.doneBtn.click();
    }

}

module.exports = FeedAndroid;