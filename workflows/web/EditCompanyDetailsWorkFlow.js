const EditCompanyDetails = require('../../pom/web/company/EditCompanyDetails');

class EditCompanyDetailsWorkFlow{
    constructor(driver){
        this.EditCompanyDetails = new EditCompanyDetails(driver);
    }

    addNewClientServiceType(serviceData){

        this.EditCompanyDetails.clickActionTab();
        this.EditCompanyDetails.clickClientTab();
        if(this.EditCompanyDetails.getServiceTypeId(serviceData['serviceName'], 'client')){
            return;
        }

        
        this.EditCompanyDetails.setClientOptionName(serviceData['serviceName'])
                               .clickAddNewServiceType('client');
        let id = this.EditCompanyDetails.getServiceTypeId(serviceData['serviceName'], 'client');
        this.EditCompanyDetails.clickOpenServiceType(serviceData['serviceName'], 'client')
                        .setServiceName(serviceData['serviceName'], 'client', id)
                        .selectServiceType(serviceData['serviceType'], 'client', id)
                        .checkFollowUp(serviceData['followUp'], 'client', id);

        if(serviceData['numberOfDays']){
            this.EditCompanyDetails.setNumberOfDays(serviceData['numberOfDays'], 'client', id);
        }

        if(serviceData['routingGroup']){
            this.EditCompanyDetails.selectRoutingGroup(serviceData['routingGroup'], 'client', id)
        }
                        
        this.EditCompanyDetails.checkPostToFeed(serviceData['postToFeed'], 'client', id)
                        .clickSaveMenuStructure('client');
        this.EditCompanyDetails.acceptAlert();
    }

    addNewWorkerServiceType(serviceData){

        this.EditCompanyDetails.clickActionTab();
        this.EditCompanyDetails.clickWorkerTab();
        if(this.EditCompanyDetails.getServiceTypeId(serviceData['serviceName'], 'worker')){
            return;
        }
        
        this.EditCompanyDetails.setWorkerOptionName(serviceData['serviceName'])
                               .clickAddNewServiceType('worker');
        let id = this.EditCompanyDetails.getServiceTypeId(serviceData['serviceName'], 'worker');
        this.EditCompanyDetails.clickOpenServiceType(serviceData['serviceName'], 'worker')
                        .setServiceName(serviceData['serviceName'], 'worker', id)
                        .selectServiceType(serviceData['serviceType'], 'worker', id)
                        .checkFollowUp(serviceData['followUp'], 'worker', id);
        if(serviceData['numberOfDays']){
            this.EditCompanyDetails.setNumberOfDays(serviceData['numberOfDays'], 'worker', id);
        }
                        
        if(serviceData['routingGroup']){
            this.EditCompanyDetails.selectRoutingGroup(serviceData['routingGroup'], 'worker', id);
        }
        this.EditCompanyDetails.clickSaveMenuStructure('worker');
        this.EditCompanyDetails.acceptAlert();  
    }

    editClientServiceType(serviceData){
        this.EditCompanyDetails.clickActionTab()
                        .clickClientTab();        
        let id = this.EditCompanyDetails.getServiceTypeId(serviceData['serviceName'], 'client');
        this.EditCompanyDetails.clickOpenServiceType(serviceData['serviceName'], 'client')
                        .setServiceName(serviceData['serviceName'], 'client', id)
                        .selectServiceType(serviceData['serviceType'], 'client', id)
                        .checkFollowUp(serviceData['followUp'], 'client', id);
        if(serviceData['numberOfDays']){
            this.EditCompanyDetails.setNumberOfDays(serviceData['numberOfDays'], 'client', id);
        }
                        
        if(serviceData['routingGroup']){
            this.EditCompanyDetails.selectRoutingGroup(serviceData['routingGroup'], 'client', id);
        }
        this.EditCompanyDetails.checkPostToFeed(serviceData['postToFeed'], 'client', id)
                        .clickSaveMenuStructure('client');
        this.EditCompanyDetails.acceptAlert();
    }

    deleteClientServiceType(serviceData){
        this.EditCompanyDetails.clickActionTab()
                        .clickClientTab()
        let id = this.EditCompanyDetails.getServiceTypeId(serviceData['serviceName'], 'client');
        if(!id){
            return;
        }
        this.EditCompanyDetails.clickOpenServiceType(serviceData['serviceName'], 'client')
                        .clickDeleteServiceType(id);
        this.EditCompanyDetails.acceptAlert();
        this.EditCompanyDetails.acceptAlert();
    }

    deleteWorkerServiceType(serviceData){
        this.EditCompanyDetails.clickActionTab()
                        .clickWorkerTab()
        let id = this.EditCompanyDetails.getServiceTypeId(serviceData['serviceName'], 'worker');
        if(!id){
            return;
        }
        this.EditCompanyDetails.clickOpenServiceType(serviceData['serviceName'], 'worker')
                        .clickDeleteServiceType(id);
        this.EditCompanyDetails.acceptAlert();
        this.EditCompanyDetails.acceptAlert();
    }

    getCompanyName(){
        this.EditCompanyDetails.goToPage();
        return this.EditCompanyDetails.getCompanyName()
    }

    addNewAppServiceType(serviceData){

        this.EditCompanyDetails.clickActionTab()
                               .clickAppTab();
        if(this.EditCompanyDetails.getServiceTypeId(serviceData['serviceName'], 'app')){
            console.log("Existed");
            return;
        }
        
        this.EditCompanyDetails.setAppOptionName(serviceData['serviceName'])
                               .clickAddNewServiceType('app');
        let id = this.EditCompanyDetails.getServiceTypeId(serviceData['serviceName'], 'app');
        console.log(id);

        this.EditCompanyDetails.clickOpenServiceType(serviceData['serviceName'], 'app')
                        .setServiceName(serviceData['serviceName'], 'app', id)
                        .selectServiceType(serviceData['serviceType'], 'app', id)
                        .setServiceInstruction(serviceData['serviceInstruction'], 'app', id);
        this.EditCompanyDetails.clickSaveMenuStructure('app');
        this.EditCompanyDetails.acceptAlert();  
    }

}

module.exports = EditCompanyDetailsWorkFlow;
