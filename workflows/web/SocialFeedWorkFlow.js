const SocialFeedPage = require('../../pom/web/SocialFeed');


class SocialFeedWorkFlow{
    constructor(driver){
        this.browser = driver? driver: browser
        this.SocialFeedPage = new SocialFeedPage(this.browser);
    }

    postNewFeed(data){
        this.SocialFeedPage.setPostTextare(data['title']);
        if(data['image']){
            this.SocialFeedPage.uploadImage(uploadDir + '/' + data['image']);
        }
        if(data['video']){
            // Upload local video store at c:/testing/SampleVideo.mp4
            this.SocialFeedPage.uploadVideo('c:/testing/' + data['video']);
        }
        if(data['postTo'])
        {
            this.SocialFeedPage.selectClient(data['postTo']);
        }
        this.SocialFeedPage.selectPostToTypeCommon(data['postToGroup']);
        if(data['postAs'] == 'company'){
            this.SocialFeedPage.selectPostAs('Post as company');
        }
        if(data['postAs'] == 'user'){
            let currentUser = this.SocialFeedPage.getCurrentUserName();
            this.SocialFeedPage.selectPostAs('Post as ' + currentUser);
        }
        this.SocialFeedPage.clickPost();
    }

    getNewestPost(){
        let postData = [];
        let newestPostHeader = this.SocialFeedPage.getNewestPostHeader();
        const regex = new RegExp('(.+)\\sposted to\\s(.+)');
        postData.postTo = newestPostHeader.match(regex)[2];
        postData.postAs = newestPostHeader.match(regex)[1];
        postData.postContent = this.SocialFeedPage.getNewestPostContent();
        postData.image = this.SocialFeedPage.getNewestPostImage();
        postData.video = this.SocialFeedPage.getNewestPostVideo();
        return postData;
    }

    getPostByID(postID){
        let postData = [];
        let newestPostHeader = this.SocialFeedPage.getPostHeaderByID(postID);
        const regex = new RegExp('(.+)\\sposted to\\s(.+)');
        postData.postTo = newestPostHeader.match(regex)[2];
        postData.postAs = newestPostHeader.match(regex)[1];
        postData.postContent = this.SocialFeedPage.getPostContentByID(postID);
        return postData;        
    }

    waitForPageReload(times=10){
        let retries = 0;
        while(retries < times){
            let postTextare = this.SocialFeedPage.getPostTextare();
            if(!postTextare){
                break;
            }
            this.browser.pause(500);
            retries += 1;
        }
    }
}
module.exports = SocialFeedWorkFlow;