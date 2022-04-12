const SocialFeedWorkFlow = require('../../../../workflows/web/SocialFeedWorkFlow');
const LoginWorkFlow = require('../../../../workflows/web/LoginWorkFlow');
const EditCompanyDetailsWF = require('../../../../workflows/web/EditCompanyDetailsWorkFlow');
const scope = require('../../../hooks/scope');
const {Then} = require('cucumber');
var assert = require('assert');
const _browser = (typeof myBrowser !== 'undefined')? myBrowser:browser;
const EditCompanyDetailsWorkFlow = new EditCompanyDetailsWF(_browser);

Then("New posted topic should be shown as {string}", (type)=>{
    let verifyPostAsUser;
    if(type == 'company'){
        verifyPostAsUser = EditCompanyDetailsWorkFlow.getCompanyName();
        new SocialFeedWorkFlow().SocialFeedPage.goToPage();
    }

    if(type == 'user'){
        verifyPostAsUser = EditCompanyDetailsWorkFlow.EditCompanyDetails.getCurrentUserName();
        new SocialFeedWorkFlow().SocialFeedPage.goToPage();
    }

    postData = new SocialFeedWorkFlow().getNewestPost();
    assert.ok(verifyPostAsUser == postData.postAs,
    "New posted topic should be shown as expected - expected: " + verifyPostAsUser + ' - Actual' + postData.postAs);
})

Then('The post has to be displayed on the feed of {string}',(string, data)=>{
    let loginCred;
    testConfig.userCreds.forEach(element => {
      if(element['role'] == string)
      {
        loginCred = element;
      }
    });
    new LoginWorkFlow(_browser).goToLoginPage()
                                  .doLogin(loginCred['userName'], loginCred['passWord']);
    postData = new SocialFeedWorkFlow(_browser).getNewestPost();
    data.hashes().forEach(socialFeedData => {
        assert.ok(postData.postContent == socialFeedData.title,
            "The post has not displayed on the feed");
    });
});

Then('The image uploaded has to be displayed on the feed', ()=>{
    postData = new SocialFeedWorkFlow().getNewestPost();
    postData.image.click();
    expect(new SocialFeedWorkFlow().SocialFeedPage.getImagePopup()).toBeDisplayed({ message: 'The image uploaded has not displayed on the feed', });
    new SocialFeedWorkFlow().SocialFeedPage.closeImagePopup();
})

Then('The video uploaded has to be displayed on the feed', ()=>{
    postData = new SocialFeedWorkFlow().getNewestPost();
    expect(postData.video).toBeDisplayed({ message: 'The video uploaded has not displayed on the feed', });
});

Then('The post has to be displayed on the feed',(data)=>{
    new SocialFeedWorkFlow().waitForPageReload();
    postData = new SocialFeedWorkFlow().getNewestPost();
    data.hashes().forEach(socialFeedData => {
        assert.ok(postData.postContent == socialFeedData.title,
            "The post has not displayed on the feed");
    });
});
