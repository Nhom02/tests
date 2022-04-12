const LoginPage = require('../../pom/web/Login')
const Nav = require('../../components/web/Nav')

class LoginWorkFlow{
    constructor(driver){
        this.browser = driver? driver: browser;
        this.LoginPage = new LoginPage(this.browser)
    }
    
    doLogin(username, password){
        // Check if logged then return;
        
        if(this.isLogged()){
            this.doLogout();
        }
        this.LoginPage.setUsername(username)
                      .clickNext();
        // In case, username is not inputted
        if(this.LoginPage.usernameInput.isDisplayed(4)){
            this.browser.refresh();
            this.LoginPage.setUsername(username)
                          .clickNext();
        }

        this.LoginPage.setPassword(password)
                      .clickSubmit();
        return this;
    }

    goToLoginPage(){
        // Check if logged then return;
        if(this.isLogged()){
            return this;
        }
        this.browser.url('/user/login')
        return this
    }

    doLogout(){
        new Nav(this.browser).goToRightNav('Logout');
        this.browser.waitUntil(
            () => this.browser.getTitle().includes("Hayylo-Login"), {
                timeout: 10000,
                timeoutMsg: 'Expect Login Page should be present after 10s logging out'
            }
        );
        this.browser.pause(2000);
        return this;
    }

    isLogged(){
        return new Nav(this.browser).userNavBarBtn.isDisplayed(4);
    }

    doLoginWithRole(role){
        /*
            role: Hayylo Admin or Global Admin or Service, user define at. data/feature/web/default.js
        */
        let loginCred;
        testConfig.userCreds.forEach(element => {
          if(element['role'] == role)
          {
            loginCred = element;
          }
        });
        this.doLogin(loginCred['userName'], loginCred['passWord']);
    }
}

module.exports = LoginWorkFlow;