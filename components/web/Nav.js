const UIObject = require('./UIObject');
const Modal = require('../web/modal/Modal');
const USER_NAV_BAR = "//ul[contains(@class, 'user-info-menu') and not(contains(@id,'menu-left-contain-notification'))]"
const ERROR_MODAL = '.error';

class Nav{
    constructor(driver){
        this.browser = driver? driver:browser;
        this.leftNav = {
            'Schedules': "//span[text()='Schedules']/parent::*",
            'Actions': "//span[text()='Actions']/parent::*",
            'Alerts': "//span[text()='Alerts']/parent::*",
            'Users': "//span[text()='Users']/parent::*",
            'Social Feed': "//span[text()='Social Feed']/parent::*",
            'Requests': "//span[text()='Requests']/parent::*",
            'Workers': "//span[text()='Workers']/parent::*",
            'Campaigns': "//span[text()='Campaigns']/parent::*",
            'Places': "//span[text()='Places']/parent::*",
            'Clients': "//span[text()='Clients']/parent::*",
            'Groups': "//span[text()='Groups']/parent::*",
            'Routing Groups': "//span[text()='Routing Groups']/parent::*",
            'Services': "//span[text()='Services']/parent::*",
            'External Agencies': "//span[text()='External Agencies']/parent::*",
            'Penalty Rules': "//span[text()='Penalty Rules']/parent::*",
            'Reports': "//span[text()='Reports']/parent::*",
            'Company': "//span[text()='Company']/parent::*",
            'Data Import Events': "//span[text()='Data Import Events']/parent::*",
        }
        this.rightNav = {
            'New Request': "//i[contains(@class, 'fa-file-text-o')]/parent::*/parent::*/parent::*",
            'Social Feed': "//ul[contains(@class, 'right-links')]//i[contains(@class, 'fa-tachometer')]/parent::*/parent::*/parent::*",
            'Edit Company Details': "//i[contains(@class, 'fa-user')]/parent::*/parent::*/parent::*",
            'Notifications': "//ul[contains(@class, 'right-links')]//i[contains(@class, 'fa-bell-o')]/parent::*/parent::*/parent::*",
            'Help': "//ul[contains(@class, 'right-links')]//i[contains(@class, 'fa-question-circle')]/parent::*/parent::*/parent::*",
            'Change password': "//ul[contains(@class, 'right-links')]//i[contains(@class, 'fa-question-circle')]/parent::*/parent::*/parent::*",
            'Logout': "//ul[contains(@class, 'right-links')]//i[contains(@class, 'fa-lock')]/parent::*/parent::*/parent::*",
        }
        this.subNav = {
            'Reports': {
                'Transactions': "//span[text()='Transactions']/parent::*",
                'Client Activity': "//span[text()='Client Activity']/parent::*",
                'Worker Activity': "//span[text()='Worker Activity']/parent::*",
                'Action Summary': "//span[text()='Action Summary ']/parent::*",
                'Transactions': "//span[text()='Payments']/parent::*",
            },

        }
        this.userNavBarBtn = new UIObject(USER_NAV_BAR, this.browser);
        this.errorModal = new Modal(ERROR_MODAL, this.browser);
    }
    goToLeftNav(leftItem="", subItem=""){
        if(!new UIObject(this.leftNav[leftItem], this.browser).getElement().isClickable()){
            this.browser.refresh();
        }
        new UIObject(this.leftNav[leftItem], this.browser).click();
        
        // Incase left item contains child item.
        if(subItem){
            if(!new UIObject(this.subNav[leftItem][subItem], this.browser).isDisplayed()){
                console.log("Click second times");
                this.browser.pause(1000);
                new UIObject(this.leftNav[leftItem], this.browser).click();
            }
            new UIObject(this.subNav[leftItem][subItem], this.browser).click();
        }
    }
    goToRightNav(item){
        //Open User Nav Bar
        new UIObject(USER_NAV_BAR, this.browser).click();
        //Click on User Nav Nar Profile
        new UIObject(this.rightNav[item], this.browser).click();
    }

    isMenuActivated(leftItem="", subItem=""){
        if(subItem){
            subItemElement = new UIObject(this.subNav[leftItem][subItem], this.browser).getElement();
            if((subItemElement.getAttribute('class')).includes("active"))
                {
                    return true;
                }
        }else{
            leftItemElement = new UIObject(this.leftNav[leftItem], this.browser).getElement();
            if((leftItemElement.getAttribute('class')).includes("active"))
                {
                    return true;
                }
        }
        return false;
    }

}
module.exports = Nav;