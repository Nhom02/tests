const PlacePage = require('../../pom/web/Place');


class PlaceWorkFlow{
    constructor(driver){
        this.browser = driver? driver: browser;
        this.PlacePage = new PlacePage(driver);
    }    

    createNewPlace(placeData, checkExisted=false){
        if(checkExisted && this.isPlaceExisted(placeData)){
            return;
        }
        this.PlacePage.clickAddPlace();
        this.PlacePage.setPlaceName(placeData['placeName']);
        this.PlacePage.setPlaceAddress(placeData['placeAddress']);
        this.PlacePage.clickSave();
        this.PlacePage.successModal.clickClose();
    }

    clickEditPlace(placeData){
        this.PlacePage.placeTable.search(placeData['placeName']);
        this.PlacePage.clickEditPlace(placeData['placeName']);
    }

    deletePlace(placeData){
        this.PlacePage.placeTable.search(placeData['placeName']);
        this.PlacePage.clickDeletePlace(placeData['placeName']);
        this.PlacePage.successModal.clickClose();
    }

    isPlaceExisted(placeData){
        this.PlacePage.placeTable.search(placeData['placeName']);
        return this.PlacePage.isPlaceExisted(placeData['placeName']);
    }
}

module.exports = PlaceWorkFlow;