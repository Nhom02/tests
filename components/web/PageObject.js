const Nav = require('../../components/web/Nav');
const UIObject = require('../../components/web/UIObject')
const USER_NAME = ".//ul[contains(@class, 'user-info-menu')]/li[contains(@class, 'user-profile')]/a/span";
const SPINER = ".//div[contains(@class,'hayylo-spinner')]";

class PageObject{
    constructor(leftItem="", subItem="", driver){
        this.browser = driver? driver: browser;
        this.leftItem = leftItem;
        this.subItem = subItem;
        this.userName = new UIObject(USER_NAME, this.browser);
        this.spiner = new UIObject(SPINER, this.browser);
    }

    goToPage()
    {
        //Used to go to child page.
        new Nav(this.browser).goToLeftNav(this.leftItem, this.subItem);
        return this;
    }

    isMenuActivated(){
        // Check if left menu is actived or not
        return new Nav(this.browser).isMenuActivated(this.leftItem, this.subItem);
    }

    getCurrentUserName(){
        return new UIObject(USER_NAME, this.browser).getText().trim();
    }

    acceptAlert(times=10){
        let index = 0;
        while (index <= times) {
            try {
                this.browser.acceptAlert();
                break;
            } catch (error) {
            }
            index++;
            this.browser.pause(1000);
        }
    }

    dismissAlert(times=10){
        let index = 0;
        while (index <= times) {
            try {
                this.browser.dismissAlert();
                break;
            } catch (error) {
            }
            index++;
            this.browser.pause(1000);
        }
    }

    getAlertText(times=10){
        let alertText = '';
        let index = 0;
        while (index <= times) {
            try {
                alertText = this.browser.getAlertText();
                return alertText;
            } catch (error) {
            }
            index++;
            this.browser.pause(1000);
        }
        return alertText;
    }

    waitForSpinerGone(times=20){
        // Wait until spiner disappear
        let retries = 0;
        while (retries <= times) {
            if(this.spiner.isDisplayed(5)){
                if(this.spiner.getElement().getAttribute('class').includes('loaded')){
                    break;
                }
            }
            else{
                break;
            }
            this.browser.pause(1000);
            retries += 1;
        }
        return this;
    }

    scrollToTop(){
        this.browser.execute("window.scrollTo(0,0);");
        this.browser.pause(2000);
    }

    waitForNewTabOpened(numOfHandle){
        /*
            numOfHandle: expected number of handle will be presented after clicked open new tab
        */
        let times = 0
        while(times < 10){
            browser.pause(1000);
            const handle = this.browser.getWindowHandles();
            if(handle.length >= numOfHandle){
                break;
            }
            times += 1
        }
    }

}

module.exports = PageObject;