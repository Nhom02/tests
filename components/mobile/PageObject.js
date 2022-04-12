const NavAndroid = require('../../components/mobile/NavAndroid');
const NavIOS = require('../../components/mobile/NavIOS');
const UIObject = require('../../components/mobile/UIObject');
const WAIT_MESSAGE = 'new UiSelector().text("Please wait...").className("android.widget.TextView")';

class PageObject{
    constructor(_driver, leftItem=""){
        this.driver = _driver? _driver: browser;
        this.leftItem = leftItem;
        this.NavPage = this.driver.isAndroid ? new NavAndroid(this.driver): new NavIOS(this.driver);
        
    }

    goToPage()
    {
        //Used to go to child page.
        this.NavPage.goToLeftNav(this.leftItem);
        return this;
    }

    logOut(){
        this.NavPage.goToLeftNav('Sign out');
        return this;
    }

    back(){
        this.NavPage.back();
    }

    acceptAlert(times=10){
        let index = 0;
        while (index <= times) {
            try {
                this.driver.acceptAlert();
                break;
            } catch (error) {
            }
            index++;
            this.driver.pause(1000);
        }
    }


}

module.exports = PageObject;