const UserWF = require('../../../workflows/web/UserWorkFlow');
const UserWorkFlow = new UserWF();
const {Given, Then, When} = require('cucumber');
const scope = require('../../hooks/scope');
const assert = require('assert');
const LoginWorkFlow = require('../../../workflows/web/LoginWorkFlow');

When("I create user if not exist", (data)=>{
    if(!scope.context.hasOwnProperty("user")){
        scope.context.user = [];
    }
    data.hashes().forEach(userData => {
        UserWorkFlow.createNewUser(userData, false, true);
        scope.context.user.push(userData);
    });
})

When("I delete user", ()=>{
    // Get the worker data stored when creating worker
    const userCreated = scope.context.user
    userCreated.forEach(userCreated => {
        UserWorkFlow.deleteUser(userCreated);    
    });
})

When("I create new user", (data)=>{
    if(!scope.context.hasOwnProperty("user")){
        scope.context.user = [];
    }
    data.hashes().forEach(userData => {
        UserWorkFlow.createNewUser(userData, false, false);
        scope.context.user.push(userData);
    });
});

When("I create new user using email from 10 Minute", (data)=>{
    if(!scope.context.hasOwnProperty("user")){
        scope.context.user = [];
    }
    let userData = data.hashes()[0];
    userData.email = scope.context.tempData.emailAddress;
    UserWorkFlow.createNewUser(userData, false, false);
    scope.context.user.push(userData);
});

Then('User is added successfully', (data)=>{
    // User is added successfully
    data.hashes().forEach(userData => {
        // User is added successfully
        
        assert.ok(UserWorkFlow.isUserExisted(userData),
              'User ' + userData.firstName + ' is not displayed');

        // The Name, User Type, Role should be displayed as same as the inputted value in step 3
        UserWorkFlow.UserPage.clickEditUser(userData.firstName + ' ' + userData.lastName);
        UserWorkFlow.checkUserInformation(userData);
        UserWorkFlow.UserPage.clickCancel();
    });
});

Given('I get email from 10 Minute', ()=>{
    const tempEmailAddress = UserWorkFlow.get10MinEmail();
    scope.context.tempData.emailAddress = tempEmailAddress;
});

Then('New invitation email sent and user able to update password', ()=>{
    UserWorkFlow.confirm10MinEmail();
    
    // close other tab
    let handle = browser.getWindowHandles();

    // switch to first hayylo admin page
    browser.switchToWindow(handle[0]);
    browser.closeWindow();

    // switch to 10 minute page

    browser.switchToWindow(handle[1]);
    browser.closeWindow();

    // switch to latest window
    browser.switchToWindow(handle[2]);
    new LoginWorkFlow(browser).doLogout();
});

Then('New created user login succesfully', ()=>{
    // Get data from created
    userData = scope.context.user.slice(-1)[0];
    new LoginWorkFlow(browser).doLogin(userData.email, testConfig.defaultPassword);
    const currentUser = UserWorkFlow.UserPage.getCurrentUserName();
    assert.ok(currentUser === (userData.firstName + " " +  userData.lastName),
    'New created User is not loggin successfully');
});

Then('I update user', (data)=>{
    // Get newest user created
    let userData = scope.context.user.pop();

    // Update information
    for (const key in data.hashes()[0]) {
        if (data.hashes()[0].hasOwnProperty(key)) {
            userData[key] = data.hashes()[0][key];
        }
    }
    UserWorkFlow.editUser(userData)
    scope.context.user.push(userData);
});

Then('The information of this user should be displayed as same the input data', ()=>{
    let userData = scope.context.user.slice(-1)[0];
    assert.ok(UserWorkFlow.isUserExisted(userData),
    'User ' + userData.firstName + ' is not displayed');

    // The Name, User Type, Role should be displayed as same as the updated
    UserWorkFlow.UserPage.clickEditUser(userData.firstName + ' ' + userData.lastName);
    UserWorkFlow.checkUserInformation(userData);
    UserWorkFlow.UserPage.clickCancel();
});

When('I delete single user', ()=>{
    let userData = scope.context.user.slice(-1)[0];
    UserWorkFlow.deleteUser(userData);
});

Then('The deleted user should not be displayed in User Page', ()=>{
    let userData = scope.context.user.pop();
    assert.ok(!UserWorkFlow.isUserExisted(userData), 'The deleted user still display in User Page')
});

Then('I update email for {string} user information', (userType)=>{
    for (let index = 0; index < testConfig.userCreds.length; index++) {
        if(testConfig.userCreds[index]['role'] == userType)
        {
            testConfig.userCreds[index]['userName'] = scope.context.tempData.emailAddress;
        }
    }
})