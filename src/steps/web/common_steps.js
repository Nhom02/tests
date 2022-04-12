const ActionWorkFlow = require('../../../workflows/web/ActionWorkFlow');
const _browser = (typeof myBrowser !== 'undefined')? myBrowser:browser;
const Nav = require('../../../components/web/Nav');

const {Given, Then, When} = require('cucumber');

Given("I refresh page", ()=>{
    browser.refresh();
})

Given("I'm in {string} Page", (page)=>{
    new Nav(_browser).goToLeftNav(page);
})

Given("I'm in {string} {string} Page", (page, subPage)=>{
    new Nav(_browser).goToLeftNav(page, subPage);
})