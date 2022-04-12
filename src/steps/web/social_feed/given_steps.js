const {Given} = require('cucumber');
const SocialFeedPage = require('../../../../pom/web/SocialFeed')


Given('Testing pom element', ()=>{
    let socialFeedPage = new SocialFeedPage();
    // socialFeedPage.setPostTextare('Testing element');
    // socialFeedPage.selectClient('Test Automation');
    // browser.pause(5000);
    // socialFeedPage.selectPostToTypeClient('Health Team');
    // socialFeedPage.selectPostAs('Post as company');
    // browser.pause(50000);
    const filePathI = uploadDir + '/attachment_1.png';
    const filePathV = 'C:/TESTING/SampleVideo.mp4';
    socialFeedPage.uploadImage(filePathI);
    socialFeedPage.uploadVideo(filePathV);
    // browser.execute(
    //     // assign style to elem in the browser
    //     (el) => el.style.display = 'block',
    //     // pass in element so we don't need to query it again in the browser
    //     fileUpload
    // );
    // fileUpload.waitForDisplayed();
    

    // const remoteFilePath = browser.uploadFile(filePath);
    // fileUpload.setValue(filePath);
    browser.pause(5000);

});