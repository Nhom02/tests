const LoginAndroid = require('../../pom/mobile/LoginAndroid');
const LoginIOS = require('../../pom/mobile/LoginIOS');
const NavAndroid = require('../../components/mobile/NavAndroid');
const NavIOS = require('../../components/mobile/NavIOS');

class LoginWorkFlow{
    constructor(_driver){
        this.driver = _driver? _driver: driver;
        this.LoginPage = this.driver.isAndroid ? new LoginAndroid(this.driver): new LoginIOS(this.driver);
        this.Nav = (this.driver.isAndroid)? new NavAndroid(this.driver) : new NavIOS(this.driver);
    }

    doLogin(loginCred){
        console.log("Login in mobile app");
        if(this.isLogged()){
            console.log("Do logout");
            this.doLogout();
        }
        this.LoginPage.clickGetStart();
        this.LoginPage.setEmail(loginCred.userName);
        this.LoginPage.clickLogin();
        this.LoginPage.setEnterCode(loginCred.passWord);
        this.LoginPage.clickNextBtn();
        // this.driver.pause(50000);
        // TO DO
    }

    isLogged(){
        return this.Nav.isMenuDisplayed();
    }

    doLogout(){
        this.Nav.goToLeftNav('Sign out');
        this.driver.pause(2000);
        this.driver.reset();
        return this;
    }

}

module.exports = LoginWorkFlow;