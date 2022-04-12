UIObject = require('../UIObject')
class Checkbox extends UIObject{
    constructor(selector){
        super(selector);
    }

    isChecked(){
        return this.getElement().isSelected();
    }

    check(){
        if(!this.isChecked())
        {
            this.click();
        }
    }

    unCheck(){
        if(this.isChecked())
        {
            this.click();
        }
    }
}
module.exports = Checkbox;