const ServicePage = require('../../pom/web/Service');

class ServiceWorkFlow{
    constructor(driver){
        this.browser = driver? driver: browser;
        this.ServicePage = new ServicePage(driver);
    }

    createNewService(serviceData, checkExisted=false){
        if(checkExisted && this.isServiceExisted(serviceData)){
            return;
        }        
        this.ServicePage.clickNewService();
        this.ServicePage.setServiceName(serviceData['serviceName']);
        this.ServicePage.setServiceDescription(serviceData['serviceDesc']);
        this.ServicePage.selectSkillType(serviceData['skillType']);
        if(serviceData['userMember']){
            serviceData['userMember'].split(',').forEach(member => {
                this.ServicePage.selectUserMember(member);
            });
        }
        this.ServicePage.clickSave();
    }

    isServiceExisted(serviceData){
        this.ServicePage.serviceTable.search(serviceData.serviceName);
        return this.ServicePage.isServiceExisted(serviceData.serviceName);
    }



}
module.exports = ServiceWorkFlow;