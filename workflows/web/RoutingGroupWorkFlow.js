const RoutingGroupPage = require('../../pom/web/RoutingGroup')

class RoutingGroupWorkFlow{
    constructor(){
        this.RoutingGroupPage = new RoutingGroupPage();
    }

    createNewRoutingGroup(groupData, checkExisted=false){
        if(checkExisted && this.isGroupExisted(groupData)){
            return;
        }        
        this.RoutingGroupPage.clickAddNew()
                             .setGroupName(groupData.groupName)
                             .selectStatus(groupData.status)
                             .clickSaveBtn()
                             .successModal.clickClose();
    }

    deleteGroup(groupData, checkNotExisted=false){
        if(checkNotExisted && !this.isGroupExisted(groupData)){
            return;
        }   
        this.RoutingGroupPage.routingGroupTable.search(groupData.groupName);
        this.RoutingGroupPage.clickDeleteGroup(groupData.groupName);
        this.RoutingGroupPage.deleteModal.clickDelete();
        this.RoutingGroupPage.successModal.clickClose();
    }

    isGroupExisted(groupData){
        this.RoutingGroupPage.routingGroupTable.search(groupData.groupName);
        return this.RoutingGroupPage.isGroupExisted(groupData.groupName);
    }

}

module.exports = new RoutingGroupWorkFlow();