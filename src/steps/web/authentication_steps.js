const {Given, Then, When} = require('cucumber');
const LoginWF = require('../../../workflows/web/LoginWorkFlow');
const scope = require('../../hooks/scope');
const _browser = (typeof myBrowser !== 'undefined')? myBrowser:browser;
let LoginWorkFlow = new LoginWF(_browser);

Given("I login with account {string}",(username)=>{
    
    let loginCred;
    testConfig.userCreds.forEach(element => {
      if(element['userName'] == username)
      {
        loginCred = element;
      }
      
    });
    // this function is not working for devtool running mode
    // browser.maximizeWindow();
    LoginWorkFlow.goToLoginPage().doLogin(loginCred['userName'], loginCred['passWord']);
  })


  Given("I login with {string} role",(role)=>{
    let loginCred;
    testConfig.userCreds.forEach(element => {
      if(element['role'] == role)
      {
        loginCred = element;
      }
    });
    try {
      LoginWorkFlow.goToLoginPage().doLogin(loginCred['userName'], loginCred['passWord']);   
    } catch (error) {
      console.log("Try login one more time");
      _browser.refresh();
      LoginWorkFlow.doLogin(loginCred['userName'], loginCred['passWord']);
    }
  })

  Given("I logout",()=>{
    LoginWorkFlow.doLogout();
  })