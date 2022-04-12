const {Given, Then, When} = require('cucumber');
const scope = require('../../hooks/scope');
const assert = require('assert');
const _browser = (typeof myBrowser !== 'undefined')? myBrowser:browser;
const ServiceWF = require('../../../workflows/web/ServiceWorkFlow');
const ServiceWorkFlow = new ServiceWF(_browser);

When("I create service if not exist", (data)=>{
    if(!scope.context.hasOwnProperty("service")){
        scope.context.service = [];
    }
    data.hashes().forEach(serviceData => {
        ServiceWorkFlow.createNewService(serviceData, true);
        scope.context.service.push(serviceData);
    });
})