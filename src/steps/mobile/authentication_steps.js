const {Given} = require('cucumber');
const LoginWorkFlow = require('../../../workflows/mobile/LoginWorkFlow');
const scope = require('../../hooks/scope');
const _driver = (typeof myDevice !== 'undefined')? myDevice:browser;
const MobileLoginWorkFlow = new LoginWorkFlow(_driver);

Given("I login in mobile app with {string} role",(role)=>{

  let loginCred;
  testConfig.userCreds.forEach(element => {
    if(element['role'] == role)
    {
      loginCred = element;
    }
  });
  
  try {
    MobileLoginWorkFlow.doLogin(loginCred);
  } catch (error) {
    console.log("Issue with login, try again");
    _driver.reset();
    MobileLoginWorkFlow.doLogin(loginCred);
  }
  
});
