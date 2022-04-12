const InviteAndroid = require('../../pom/mobile/InviteAndroid');
const InviteIOS = require('../../pom/mobile/InviteIOS');

class InvitePeopleWorkFlow{
    constructor(_driver){
        this.driver = _driver? _driver: driver;
        this.InvitePage = this.driver.isAndroid ? new InviteAndroid(this.driver): new InviteIOS(this.driver);
    }

    inviteNewPeople(inviteData){
        this.InvitePage.goToPage();
        this.InvitePage.clickAddSomeOne();
        this.InvitePage.setName(inviteData.firstName + ' ' + inviteData.lastName);
        this.InvitePage.setMobileNumber(inviteData['mobilePhone']);
        this.InvitePage.clickInvite();        
    }
}

module.exports = InvitePeopleWorkFlow;