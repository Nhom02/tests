const PlaceWF = require('../../../workflows/web/PlaceWorkFlow');
const {Given, Then, When} = require('cucumber');
const scope = require('../../hooks/scope');
const _browser = (typeof myBrowser !== 'undefined')? myBrowser:browser;
const PlaceWorkFlow = new PlaceWF(_browser);

When("I create new Place if not exist", (data)=>{
    if(!scope.context.hasOwnProperty("place")){
        scope.context.place = [];
    }
    data.hashes().forEach(placeData => {
        PlaceWorkFlow.createNewPlace(placeData, true);
        scope.context.place.push(placeData);
    });
});

When("I delete place", ()=>{
    // Get the worker data stored when creating worker
    const placeCreated = scope.context.place
    placeCreated.forEach(placeData => {
        PlaceWorkFlow.deletePlace(placeData);    
    });
})



