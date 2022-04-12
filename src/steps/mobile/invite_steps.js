const {Given, Then, When} = require('cucumber');
const InvitePeopleWorkFlow = require('../../../workflows/mobile/InvitePeopleWorkFlow');
const _browser = (typeof myDevice !== 'undefined')? myDevice:browser;
const InvitePeopleWF = new InvitePeopleWorkFlow(_browser);


Then('I invite new people on mobile', (data)=>{
    data.hashes().forEach(inviteData => {
        InvitePeopleWF.inviteNewPeople(inviteData);
    });

    // MNotificationWF.NotificationPage.logOut();
});