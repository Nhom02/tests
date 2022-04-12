const PageObject = require('../../components/web/PageObject');
const Select2 = require('../../components/web/form/Select2');
const UIObject = require('../../components/web/UIObject');
const UploadFile = require('../../components/web/form/UploadFile')
const POST_TEXT_CONTENT = '[name="post_text"]';
const POST_TEXT_BTN = '.btn-post-text';
const SELECT_POST_AS = 'sl-post-as';
const SELECT_CHOOSE_CLIENT = 'sl-choose-client';
const LEFT_NAV_ITEM = "Social Feed";
const SELECT_POST_TO_TYPE_COMMON = "//*[@id='sl-post-to-type-by-common']";
const SELECT_POST_TO_TYPE_COMMON_DROPDOWN_MENU = "//*[@id='sl-post-to-type-by-common']//ul";
const SELECT_POST_TO_TYPE_CLIENT = "//*[@id='sl-post-to-type-by-client']";
const UPLOAD_IMAGE = '[name="ipt-image"]';
const UPLOAD_VIDEO = '[name="ipt-video"]';
const PROGRESS_BAR = '.progress-bar';
//--------------------------Article----------------------
const ARTICLE_USER_DETAILS = "//article//div[@class='user-details']";
const NEWEST_ARTICLE_USER_DETAILS = "//article[1]//div[@class='user-details']";
const ARTICLE_CONTENT_TEXT = '.class-social-feed-text';
const NEWEST_ARTICLE_CONTENT_TEXT = "//article[1]//div[@class='story-content']/p[@class='class-social-feed-text']";
let imageContent = "//article//div[@class='user-details']//a[contains(text(), '%s')]/parent::*/parent::*/following-sibling::*//*[contains(@class, 'story-album')]//img";
const NEWEST_ARTICLE_IMG = "//article[1]//div[@class='user-details']//a/parent::*/parent::*/following-sibling::*//*[contains(@class, 'story-album')]//img";
let videoContent = "//article//div[@class='user-details']//a[contains(text(), '%s')]/parent::*/parent::*/following-sibling::*//*[contains(@class, 'story-album')]//*[contains(@id, 'video') and @aria-label='Video Player']";
const NEWEST_ARTICLE_VIDEO = "//article[1]//div[@class='user-details']//a/parent::*/parent::*/following-sibling::*//*[contains(@class, 'story-album')]//*[contains(@id, 'video') and @aria-label='Video Player']"
const articleUserDetails = "//article[@id='social-feed-%s']//div[@class='user-details']";
const articleUserContent = "//article[@id='social-feed-%s']//div[@class='story-content']/p[@class='class-social-feed-text']";;
const CLOSE_iMAGE_POPUP = '.fancybox-close';
const IMAGE_POPUP = '.fancybox-image';

class SocialFeed extends PageObject{
    constructor(driver){
        super(LEFT_NAV_ITEM);
        this.browser = driver? driver: browser;
        this.postTextare = new UIObject(POST_TEXT_CONTENT, this.browser);
        this.postTextBtn = new UIObject(POST_TEXT_BTN, this.browser);
        this.postAsSelect = new Select2(SELECT_POST_AS, this.browser);
        this.clientSelect = new Select2(SELECT_CHOOSE_CLIENT, this.browser);
        this.postToTypeCommonSelect = new UIObject(SELECT_POST_TO_TYPE_COMMON, this.browser);
        this.postToTypeCommonMenu = new UIObject(SELECT_POST_TO_TYPE_COMMON_DROPDOWN_MENU, this.browser);
        this.postToTypeClientSelect = new UIObject(SELECT_POST_TO_TYPE_CLIENT, this.browser);
        this.uploadImageBtn = new UploadFile(UPLOAD_IMAGE, this.browser);
        this.uploadVideoBtn = new UploadFile(UPLOAD_VIDEO, this.browser);
        this.progressBar = new UIObject(PROGRESS_BAR, this.browser);
        this.newestPostHeader = new UIObject(NEWEST_ARTICLE_USER_DETAILS, this.browser);
        this.newestPostContent = new UIObject(NEWEST_ARTICLE_CONTENT_TEXT, this.browser);
        this.newestPostImage = new UIObject(NEWEST_ARTICLE_IMG, this.browser);
        this.newestPostVideo = new UIObject(NEWEST_ARTICLE_VIDEO, this.browser);
        this.closeImagePopupBtn = new UIObject(CLOSE_iMAGE_POPUP, this.browser);
        this.imagePopup = new UIObject(IMAGE_POPUP, this.browser);
    }

    clickPost(){
        this.postTextBtn.click();
    }

    setPostTextare(value){
        this.postTextare.setText(value);
    }

    selectPostAs(value){
        this.postAsSelect.select(value);
    }

    getPostTextare(){
        return this.postTextare.getValue();
    }

    selectClient(client){
        console.log("Search");
        this.clientSelect.search(client);
        browser.pause(3000);
        console.log("Select");
        this.clientSelect.select(client);
    }

    selectPostToTypeClient(value){
        this.postToTypeClientSelect.click();
        let optionSelector = this.postToTypeClientSelect.selector + "//li//*[contains(text(),'" + value + "')]";
        new UIObject(optionSelector, this.browser).click();
    }

    selectPostToTypeCommon(value){
        this.postToTypeCommonSelect.click();
        if(!this.postToTypeCommonMenu.isDisplayed(2)){
            this.postToTypeCommonSelect.click();
        }
        let optionSelector = this.postToTypeCommonSelect.selector + "//li//*[contains(text(),'" + value + "')]";
        new UIObject(optionSelector, this.browser).click();
    }

    uploadImage(path){
        this.uploadImageBtn.uploadFile(path);
        this.progressBar.isDisplayed(2);
        this.progressBar.getElement().waitForDisplayed({timeout: 20000, reverse: true });
    }

    uploadVideo(path){
        this.uploadVideoBtn.uploadFile(path);
        this.progressBar.isDisplayed(2);
        this.progressBar.getElement().waitForDisplayed({timeout: 20000, reverse: true });
    }

    getNewestPostHeader(){
        return this.newestPostHeader.getText();
    }

    getNewestPostContent(){
        return this.newestPostContent.getText();
    }

    getNewestPostImage(){
        return this.newestPostImage.getElement();
    }
    
    getNewestPostVideo(){
        return this.newestPostVideo.getElement();
    }

    getPostHeaderByID(postID){
        let articleUserDetailsSelector = articleUserDetails.replace('%s', postID);
        return new UIObject(articleUserDetailsSelector, this.browser).getText();  
    }

    getPostContentByID(postID){
        let articleUserContentSelector = articleUserContent.replace('%s', postID);
        return new UIObject(articleUserContentSelector, this.browser).getText();  
    }

    closeImagePopup(){
        this.closeImagePopupBtn.click();
    }

    getImagePopup(){
        return this.imagePopup.getElement();
    }
}


module.exports = SocialFeed;