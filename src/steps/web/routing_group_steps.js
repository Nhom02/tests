const RoutingGroupWorkFlow = require('../../../workflows/web/RoutingGroupWorkFlow');
const scope = require('../../hooks/scope');
const {Given, Then, When} = require('cucumber');

When("I create routing group if not exist", (data)=>{
    if(!scope.context.hasOwnProperty("routingGroup")){
        scope.context.routingGroup = [];
    }
    data.hashes().forEach(groupData => {
        RoutingGroupWorkFlow.createNewRoutingGroup(groupData, true);
        if(groupData.groupName != 'Smart Action'){
            scope.context.routingGroup.push(groupData);
        }
    });
})

When("I delete routing group", ()=>{
    const userCreated = scope.context.routingGroup
    RoutingGroupWorkFlow.RoutingGroupPage.goToPage();
    userCreated.forEach(groupData => {
        RoutingGroupWorkFlow.deleteGroup(groupData)
    });
})

When("I delete routing group if exist", ()=>{
    const userCreated = scope.context.routingGroup
    RoutingGroupWorkFlow.RoutingGroupPage.goToPage();
    userCreated.forEach(groupData => {
        RoutingGroupWorkFlow.deleteGroup(groupData, true)
    });
})
