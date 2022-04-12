const UIObject = require('../UIObject');

class UploadFile extends UIObject{
    constructor(selector, driver){
        super(selector, driver)
    }

    uploadFile(path){
        /*
            Flow to upload
            1. Change element to be visble
            2. Set value of element
        */
        // 1. Change element to be visable
        this.browser.execute(
            (el) => el.style.display = 'block',
            this.getElement()
        );
        this.setText(path);
        this.browser.execute(
            (el) => el.style.display = 'none',
            this.getElement()
        );
    }
}

module.exports = UploadFile;