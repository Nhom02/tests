const mysql = require('mysql');
const util = require('util');
const ActionWF = require('../../../../workflows/web/ActionWorkFlow');
const ActionWorkFlow = new ActionWF();
var assert = require('assert');
const scope = require('../../../hooks/scope');
const {Given} = require('cucumber');
const Connection = require('../../../../libraries/Connection');
let getCompanyExtTool = 'select company_ext_tools.user_tool_login_id \
from company_ext_tools , company_3rd_party_tools \
where company_ext_tools.company_3rd_party_tool_id=company_3rd_party_tools.company_3rd_party_tool_id \
and company_3rd_party_tools.company_id=?';

let getCompany3rdTool = 'select company_3rd_party_tools.company_3rd_party_tool_id \
                    from company_3rd_party_tools \
                    where company_3rd_party_tools.company_id=?';

let user_company = 'SELECT user_id FROM users where company_id=? AND user_type = 2';

let insertCompany3rdTool = 'INSERT INTO company_3rd_party_tools \
(company_id,tool_name, created_user_id, created_date, modified_user_id, modified_date) \
VALUE (?,?,?,CURRENT_TIMESTAMP(),?,CURRENT_TIMESTAMP())';
let insertCompanyExt = 'INSERT INTO company_ext_tools \
(company_ext_tool_id, company_3rd_party_tool_id, client_user_id, user_tool_login_id,valid_flg,created_user_id,created_date,modified_user_id,modified_date) \
VALUES (?,?,?,?,1,?,CURRENT_TIMESTAMP(),?,CURRENT_TIMESTAMP())';

let deleteCompanyExt = 'DELETE FROM company_ext_tools WHERE company_ext_tools.company_3rd_party_tool_id IN (?)';

let deleteCompany3rdTool = 'DELETE FROM company_3rd_party_tools WHERE company_3rd_party_tools.company_id=?';




Given("I'm in Action details which has priority and none priority task", ()=>{
    if(!scope.context.tempData.hasOwnProperty("subTaskPriority")){
        scope.context.tempData.subTaskPriority = {};
    }
    // Wait for table generated
    ActionWorkFlow.ActionPage.waitForSpinerGone();
    ActionWorkFlow.waitForActionTableGenerated();
    
    // Get 10 action row
    let actionArr = ActionWorkFlow.ActionPage.getActionTable(false, 10);
    scope.context.tempData.subTaskPriority.rootAction = {};
    scope.context.tempData.subTaskPriority.rootAction['ID'] = actionArr[0][0];
    ActionWorkFlow.ActionPage.scrollToTop();
    ActionWorkFlow.ActionPage.clickActionRowByID(actionArr[0][0]);
    ActionWorkFlow.ActionPage.waitForSpinerGone();

    // Create subtask which has priority
    let subId = ActionWorkFlow.createSubTask({priority: true});
    scope.context.tempData.subTaskPriority.prioritySubAction = {};

    // store subtask ID for verification in next steps
    scope.context.tempData.subTaskPriority.prioritySubAction['ID'] = subId;
    ActionWorkFlow.ActionPage.clickParentId();

    // Create subtask which has non priority
    subId = ActionWorkFlow.createSubTask({priority: false});
    scope.context.tempData.subTaskPriority.nonePrioritySubAction = {};

    // store subtask ID for verification in next steps
    scope.context.tempData.subTaskPriority.nonePrioritySubAction['ID'] = subId;
    ActionWorkFlow.ActionPage.clickParentId();
});

Given("Not existing the data has the case manager in action list", ()=>{

    // Check if case manager is configured for testing company
    // if not insert data for case manager configuration

    const companyId = testConfig.userCreds[0].companyId;
    browser.call(async ()=>{      
        const query = util.promisify(Connection.conn.query).bind(Connection.conn);
        // Check if case manager is configured for testing company
        let thỉrd_data = await query(getCompany3rdTool, [companyId]);

        if(typeof thỉrd_data !== 'undefined' && thỉrd_data.length > 0){
            thỉrd_data = thỉrd_data.map(function(el){return el.company_3rd_party_tool_id});
            await query(deleteCompanyExt, [thỉrd_data]);
            await query(deleteCompany3rdTool, [companyId]);
        }
    });
});

Given("Exist the data has the case manager in action list", ()=>{

    // Check if case manager is configured for testing company
    // if not insert data for case manager configuration

    const companyId = testConfig.userCreds[0].companyId;
    browser.call(async ()=>{      
        const query = util.promisify(Connection.conn.query).bind(Connection.conn);
        const user_data = await query(user_company, [companyId]);

        // Check if case manager is configured for testing company
        const thỉrd_data = await query(getCompany3rdTool, [companyId]);

        if(typeof thỉrd_data === 'undefined' || thỉrd_data.length == 0){
            await query(insertCompany3rdTool, [companyId, "Test", user_data[0].user_id, user_data[0].user_id]);
            await query(insertCompany3rdTool, [companyId, "Test", user_data[0].user_id, user_data[0].user_id]);
        }

        const ext_tool_data = await query(getCompanyExtTool, [companyId]);
        if(typeof ext_tool_data === 'undefined' || ext_tool_data.length == 0){
            const thỉrd_data = await query(getCompany3rdTool, [companyId]);
            for (let index = 0; index < thỉrd_data.length; index++) {
                const element = thỉrd_data[index];
                await query(insertCompanyExt, [element.company_3rd_party_tool_id, element.company_3rd_party_tool_id, index + 1, index + 1, user_data[0].user_id, user_data[0].user_id]);
            }
        }
    });
});

