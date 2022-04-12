const { setWorldConstructor } = require('cucumber');
const scope = require('./scope');


const World = function () {
  scope.context;
};

setWorldConstructor(World);
