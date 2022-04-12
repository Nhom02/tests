Feature: Action
      As a Global Admin, I want to test create and edit action successfully

      @create @action_filter @delete @action_comment @action_log @action_create @action_company
      @action_worker @action_subtask @action_client @action_attachment @duedate
      @action_notification @login @action_layout @action_report @action_details
      @action_comment @test5
      Scenario: Login into system successfully
        Given I login with "Global Admin" role  

      @create
      Scenario: Create service if not exist
        Given I'm in "Services" Page
        And I create service if not exist
        | serviceName | serviceDesc | skillType | userMember |
        | caring      | caring      | Caring    | WKR        |

      @user @delete @create @test5
      Scenario: Create user successfully
        Given I'm in "Users" Page
        When I create user if not exist
          | firstName       | lastName  | email          | phone | userType | role |
          | User Automation | Service   | test1@mail.com |       | Service  |      |
          | User Automation | Service 2 | test2@mail.com |       | Service  |      |

      @action_notification @skip
      Scenario: Create user Service successfully
        Given I login with "Global Admin" role
        And I'm in "Users" Page
        And I get email from 10 Minute
        When I create new user using email from 10 Minute
          | firstName | lastName            | email | phone      | userType            | role |  group  |
          | User      | Service             |       |            | Service             |      |         |        
        Then New invitation email sent and user able to update password
        Then I update email for "Service" user information

      @create @delete
      Scenario: Create client successfully
        Given I login with "Global Admin" role
        And I'm in "Clients" Page
        When I create client if not exist
          | clientNumber  | firstName  | lastName   | email          | homePhone | address                                                 | branch     | primaryOffice| mobilePhone| dateOfBirth | emailLogin | phoneLogin | group   |
          | Test999       | Test       | Automation | test@mail.com  |           | Victoria Road, Denistone West, NSW, 2114, Australia     | Automation | Any          |            |             |            |            | Default |
          | Test998       | Test 2     | Automation | test2@mail.com |           | Victoria Road, Denistone West, NSW, 2114, Australia     | Automation | Any          |            |             |            |            | Default |

      @create @testexist @delete
      Scenario: Verify to create worker successfully
        Given I'm in "Workers" Page
        When I create new Worker if not exist
          | employeeNumber      | emailLogin        | firstName   | lastName   | mobilePhone | group   | services      |
          | Automation Worker   | test9998@mail.com | Test        | Automation | 099999999   | Default | Auto - caring | 
          | Automation Worker 2 | test9997@mail.com | Test 2      | Automation | 099999998   | Default | Auto - caring | 


      @routingGroup @delete @create
      Scenario: Create routing group successfully
        Given I'm in "Routing Groups" Page
        When I create routing group if not exist
          | groupName                  | status  | users |
          | Smart Action               | Active  |       |
          | Automation Routing Group   | Active  |       |
          | Automation Routing Group 2 | Active  |       | 

      @TestCaseKey=CPT-T16 @create @delete
      Scenario: Verify to create service type successfully
        Given I'm in Edit Company Page
        When I create new Client Service Type
          | serviceName                       | serviceType      | followUp | numberOfDays | routingGroup | postToFeed |
          | Client Automation Input Notes     | Input Notes      |          |              |              |            |
          | Client Automation Quick Request   | Quick Request    |          |              |              |            |
          | Client Automation Schedule Change | Schedule Change  |          |              |              |            |
          | Client Automation Schedule & Note | Schedule & Note  |          |              |              |            |
          | Client Automation Schedule Cancel | Schedule Cancel  |          |              |              |            |
          | Client Automation Follow Up       | Quick Request    |   true   |      10      | Smart Action |            |
          | Client Automation Post To Feed    | Schedule Change  |          |              |              |    true    |
        When I create new Worker Service Type
          | serviceName                       | serviceType      | followUp | numberOfDays | routingGroup | postToFeed |
          | Worker Automation Input Notes     | Input Notes      |          |              |              |            |
          | Worker Automation Quick Request   | Quick Request    |          |              |              |            |
          | Worker Automation Schedule Change | Schedule Change  |          |              |              |            |
          | Worker Automation Schedule & Note | Schedule & Note  |          |              |              |            |
          | Worker Automation Schedule Cancel | Schedule Cancel  |          |              |              |            |
          | Worker Automation Follow Up       | Quick Request    |   true   |      10      | Smart Action |            |
        When I create action and stop at Select Service Type
          | type  | clientName      | serviceType    | comment | dueDate |
          | Client| Test Automation | Input Notes 01 | Tesst   | Today   |
        Then The service type created should be displayed in Select Type of create "client" action

      @TestCaseKey=CPT-T1 @action_create @action_company @create @subtask @action_details
      Scenario: Create action successfully without child action with 
        Given I'm in "Actions" Page
        When I clear filter 'Type'
        And I do filter "Client Automation Input Notes" "Type" 
        And I get number of actions
        And I create new action
          | type  | clientName      | serviceType                   | comment | dueDate |
          | Client| Test Automation | Client Automation Input Notes | Tesst   | Today   |
        Then New action present in action page
          | type  | clientName      | serviceType                   | status |
          | Client| Test Automation | Client Automation Input Notes | To Do  |

      @TestCaseKey=CPT-T2 @action_create @p2 @testReport
      Scenario: Create action unsuccessfully
        Given I'm in "Actions" Page
        When I clear filter 'Type'
        And I get number of actions
        And I create new action and click cancel
          | type  | clientName      | serviceType                   | comment | dueDate | cancel |
          | Client| Test Automation | Client Automation Input Notes | Tesst   | Today   | true   |
        Then New action should not present in action page

      @TestCaseKey=CPT-T3 @action_details  @test_issue @T2 @p2
      Scenario: Edit action detail status successfully
        Given I'm in "Actions" Page
        When I clear filter 'Status'
        And I do filter "To Do" "Status"
        And I clear filter 'Type'
        And I do filter "Client Automation Input Notes" "Type"         
        And Click edit on specific action
        And I change action "Status" to "In Progress"
        And I close the action detail
        Then Edited action should not present in action page

      @TestCaseKey=CPT-T102 @action_details @testReport
      Scenario: Verify to edit action detail Due Date successfully
        Given I'm in "Actions" Page
        When I clear filter 'Status'
        And Click edit on specific action
        And I change action "Due Date" to "next 1 day"
        And I close the action detail
        Then "Due" column should be displayed as "next 1 day" in action list

      @TestCaseKey=CPT-T101 @action_details
      Scenario: Verify to edit action detail Primary Assignee successfully
        Given I'm in "Actions" Page
        When I clear filter 'Group'
        And Click edit on specific action
        And I change the primary assignee to "Smart Action"
        And I close the action detail
        Then "Assignee(s)" column should be displayed as "Smart Action" in action list

      @TestCaseKey=CPT-T5 @action_create
      Scenario: Create action successfully with Service Type "Schedule Change"
        Given I'm in "Actions" Page
        When I clear filter 'Type'
        And I do filter "Client Automation Schedule Change" "Type" 
        And I get number of actions
        And I create new action
          | type  | clientName      | serviceType                       | comment | dueDate |
          | Client| Test Automation | Client Automation Schedule Change | Tesst   | Today   |
        Then New action present in action page
          | type  | clientName      | serviceType                       | status | dueDate |
          | Client| Test Automation | Client Automation Schedule Change | To Do  | Today   |

      @TestCaseKey=CPT-T19 @action_create
      Scenario: Create action successfully with Service Type "Schedule & Note"
        Given I'm in "Actions" Page
        When I clear filter 'Type'
        And I do filter "Client Automation Schedule & Note" "Type" 
        And I get number of actions
        And I create new action
          | type  | clientName      | serviceType                       | comment | dueDate |
          | Client| Test Automation | Client Automation Schedule & Note | Tesst   | Today   |
        Then New action present in action page
          | type  | clientName      | serviceType                       | status | dueDate |
          | Client| Test Automation | Client Automation Schedule & Note | To Do  | Today   |

      @TestCaseKey=CPT-T18 @action_create
      Scenario: Create action successfully with Service Type "Schedule Cancel"
        Given I'm in "Actions" Page
        When I clear filter 'Type'
        And I do filter "Client Automation Schedule Cancel" "Type" 
        And I get number of actions
        And I create new action
          | type  | clientName      | serviceType                       | comment | dueDate |
          | Client| Test Automation | Client Automation Schedule Cancel | Tesst   | Today   |
        Then New action present in action page
          | type  | clientName      | serviceType                       | status | dueDate |
          | Client| Test Automation | Client Automation Schedule Cancel | To Do  | Today   |

      @TestCaseKey=CPT-T17 @action_create
      Scenario: Create action successfully with Service Type "Quick Request"
        Given I'm in "Actions" Page
        When I clear filter 'Type'
        And I do filter "Client Automation Quick Request" "Type" 
        And I get number of actions
        And I create new action
          | type  | clientName      | serviceType                | comment | dueDate |
          | Client| Test Automation | Client Automation Quick Request   | Tesst   | Today   |
        Then New action present in action page
          | type  | clientName      | serviceType                | status | dueDate |
          | Client| Test Automation | Client Automation Quick Request   | To Do  | Today   |     

      @TestCaseKey=CPT-T20 @action_create
      Scenario: Create action successfully with Service Type "Input Notes"
        Given I'm in "Actions" Page
        When I clear filter 'Type'
        And I do filter "Client Automation Input Notes" "Type" 
        And I get number of actions
        And I create new action
          | type  | clientName      | serviceType                       | comment | dueDate |
          | Client| Test Automation | Client Automation Input Notes     | Tesst   | Today   |
        Then New action present in action page
          | type  | clientName      | serviceType                       | status | dueDate |
          | Client| Test Automation | Client Automation Input Notes     | To Do  | Today   |

      @TestCaseKey=CPT-T42 @action_create
      Scenario: Verify that user is able to create action for worker successfully
        Given I'm in "Actions" Page
        When I clear filter 'Type'
        And I do filter "Worker Automation Schedule Cancel" "Type"        
        And I get number of actions
        And I create new action
          | type   | workerName      | serviceType                       | comment | dueDate       |
          | Worker | Test Automation | Worker Automation Schedule Cancel | Tesst   | Today         |
          | Worker | Test Automation | Worker Automation Schedule Cancel | Tesst   | next 10 days  |
        Then New action present in action page
          | type   | workerName      | serviceType                       | status  | dueDate       |
          | Worker | Test Automation | Worker Automation Schedule Cancel | To Do   | Today         |
          | Worker | Test Automation | Worker Automation Schedule Cancel | To Do   | next 10 days  |
        Then The value of due date is displayed "Today", the color is "#bf0003"
          | type   | workerName      | serviceType                       | status  | dueDate       |
          | Worker | Test Automation | Worker Automation Schedule Cancel | To Do   | Today         |        
        Then The value of due date should be displayed as same as the selected
          | type   | workerName      | serviceType                       | status | dueDate        |
          | Worker | Test Automation | Worker Automation Schedule Cancel | To Do  | next 10 days   |

      @TestCaseKey=CPT-T41 @action_create
      Scenario: Verify that user is able to create action for client successfully
        Given I'm in "Actions" Page
        When I clear filter 'Type'
        And I do filter "Client Automation Schedule Cancel" "Type" 
        And I get number of actions
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate      |
          | Client | Test Automation | Client Automation Schedule Cancel | Tesst   | Today        |
          | Client | Test Automation | Client Automation Schedule Cancel | Tesst   | next 5 days  |
        Then New action present in action page
          | type   | clientName      | serviceType                       | status  | dueDate      |
          | Client | Test Automation | Client Automation Schedule Cancel | To Do   | Today        |
          | Client | Test Automation | Client Automation Schedule Cancel | To Do   | next 5 days  |
        Then The value of due date is displayed "Today", the color is "#bf0003"
          | type   | clientName      | serviceType                       | status | dueDate       |
          | Client | Test Automation | Client Automation Schedule Cancel | To Do  | Today         |        
        Then The value of due date should be displayed as same as the selected
          | type   | clientName      | serviceType                       | status | dueDate       |
          | Client | Test Automation | Client Automation Schedule Cancel | To Do  | next 5 days   |

      @TestCaseKey=CPT-T44 @action_create @p3
      Scenario: Verify there will be a Post to Feed new popup displays in the action details which has not child
        Given I'm in "Actions" Page
        When I create new action
          | type   | clientName      | serviceType                       | comment | dueDate      |
          | Client | Test Automation | Client Automation Post To Feed    | Tesst   | Today        |
        And I clear filter 'Type'
        And I do filter "Client Automation Post To Feed" "Type" 
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate      | status |
          | Client | Test Automation | Client Automation Post To Feed    | Tesst   | Today        | To Do  |
        And I change action "Status" to "Done"
        Then The Post to Feed new popup is displayed

      @TestCaseKey=CPT-T45 @action_create @p3
      Scenario: Verify there will be a Post to Feed new popup displays in the action details which has child
        Given I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate      | childAction |
          | Client | Test Automation | Client Automation Post To Feed    | Tesst   | Today        | currentUser |
        And I clear filter 'Type'
        And I do filter "Client Automation Post To Feed" "Type" 
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate      | status |
          | Client | Test Automation | Client Automation Post To Feed    | Tesst   | Today        | To Do  |
        And I change action "Status" to "Done"
        Then The Post to Feed new popup is displayed

      @TestCaseKey=CPT-T46 @action_create
      Scenario: There is no popup will be displayed on Action has not child feature when user change status to "Done" if user unticks to “Post to Feed”
        Given I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate |
          | Client | Test Automation | Client Automation Schedule & Note | Tesst   | Today   |
        And I clear filter 'Type'
        And I do filter "Client Automation Schedule & Note" "Type" 
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate |
          | Client | Test Automation | Client Automation Schedule & Note | Tesst   | Today   |
        And I change action "Status" to "Done"
        Then There is no The Post to Feed popup is displayed

      @TestCaseKey=CPT-T47 @action_create @testing1 @p3
      Scenario: There is no popup will be displayed on Action has child feature when user change status to "Done" if user unticks to “Post to Feed”
        Given I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                | comment | dueDate | childAction |
          | Client | Test Automation | Client Automation Schedule & Note | Tesst   | Today   | currentUser |
        And I clear filter 'Type'
        And I do filter "Client Automation Schedule & Note" "Type" 
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate | status |
          | Client | Test Automation | Client Automation Schedule & Note | Tesst   | Today   | To Do  |
        And I change action "Status" to "Done"
        Then There is no The Post to Feed popup is displayed

      @TestCaseKey=CPT-T48 @action_create @testing1 @p3
      Scenario: There is no popup will be displayed on Action has not child feature when user change status to "Cancelled" if user unticks to “Post to Feed”
        Given I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                | comment | dueDate |
          | Client | Test Automation | Client Automation Schedule & Note | Tesst   | Today   |
        And I clear filter 'Type'
        And I do filter "Client Automation Schedule & Note" "Type"
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate | status |
          | Client | Test Automation | Client Automation Schedule & Note | Tesst   | Today   | To Do  |
        And I change action "Status" to "Cancelled"
        Then There is no The Post to Feed popup is displayed

      @TestCaseKey=CPT-T49 @action_create
      Scenario: There is no popup will be displayed on Action has child feature when user change status to "Cancelled" if user unticks to “Post to Feed”
        Given I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate | childAction |
          | Client | Test Automation | Client Automation Schedule & Note | Tesst   | Today   | currentUser |
        And I clear filter 'Type'
        And I do filter "Client Automation Schedule & Note" "Type" 
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate | status |
          | Client | Test Automation | Client Automation Schedule & Note | Tesst   | Today   | To Do  |
        And I change action "Status" to "Cancelled"
        Then There is no The Post to Feed popup is displayed

      @TestCaseKey=CPT-T50 @action_create
      Scenario: Verify there is no popup will be displayed on Action feature when User change status to “Done” popup displays in the action details after User udpate an existing Action by untick the “Post to Feed” checkbox on service type
        Given I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate |
          | Client | Test Automation | Client Automation Post To Feed    | Tesst   | Today   |
        And I clear filter 'Type'
        And I do filter "Client Automation Post To Feed" "Type" 
        And I update Client Service Type
          | serviceName                       | serviceType      | followUp | numberOfDays | routingGroup | postToFeed |
          | Client Automation Post To Feed    | Schedule Change  |          |              |              |            |
        And I'm in "Actions" Page
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate | status |
          | Client | Test Automation | Client Automation Post To Feed    | Tesst   | Today   | To Do  |
        And I change action "Status" to "Done"
        Then There is no The Post to Feed popup is displayed

      @TestCaseKey=CPT-T51 @action_create
      Scenario: Verify there will be a “Post to Feed” new popup displays in the action details after User udpate an existing service type by Tick the “Post to Feed” checkbox
        Given I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate |
          | Client | Test Automation | Client Automation Post To Feed    | Tesst   | Today   |
        And I update Client Service Type
          | serviceName                       | serviceType      | followUp | numberOfDays | routingGroup | postToFeed |
          | Client Automation Post To Feed    | Schedule Change  |          |              |              |    true    |
        And I'm in "Actions" Page
        And I clear filter 'Type'
        And I do filter "Client Automation Post To Feed" "Type" 
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate | status |
          | Client | Test Automation | Client Automation Post To Feed    | Tesst   | Today   | To Do  |
        And I change action "Status" to "Done"
        Then The Post to Feed new popup is displayed

      @TestCaseKey=CPT-T63 @action_create
      Scenario: Verify Show the client name respectively in the “Post to Feed” popup when User change status to “Done”
        Given I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate |
          | Client | Test Automation | Client Automation Post To Feed    | Tesst   | Today   |
        And I clear filter 'Type'
        And I do filter "Client Automation Post To Feed" "Type" 
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate | status |
          | Client | Test Automation | Client Automation Post To Feed    | Tesst   | Today   | To Do  |
        And I change action "Status" to "Done"
        Then The client name "Test Automation" is shown correctly in Post To Feed popup
        And The Post to Feed new popup is displayed

      @TestCaseKey=CPT-T57 @action_create
      Scenario: Verify The textbox allows user to input the TEXT only and must show in the “Post to Feed” popup.
        Given I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate |
          | Client | Test Automation | Client Automation Post To Feed    | Tesst   | Today   |
        And I clear filter 'Type'
        And I do filter "Client Automation Post To Feed" "Type" 
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate | status |
          | Client | Test Automation | Client Automation Post To Feed    | Tesst   | Today   | To Do  |
        And I change action "Status" to "Done"
        Then The textbox allows user to input the text and must show in the Post to Feed popup
        And The Post to Feed new popup is displayed

      @TestCaseKey=CPT-T68 @action_create
      Scenario: Verify the “Post to Feed” popup is not shown when User change action status to “In Progress”
        Given I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                         | comment | dueDate |
          | Client | Test Automation | Client Automation Post To Feed      | Tesst   | Today   |
        And I clear filter 'Type'
        And I do filter "Client Automation Post To Feed" "Type"         
        And I click on new action created
          | type   | clientName      | serviceType                          | comment | dueDate | status |
          | Client | Test Automation | Client Automation Post To Feed       | Tesst   | Today   | To Do  |
        And I change action "Status" to "In Progress"
        Then There is no The Post to Feed popup is displayed

      @TestCaseKey=CPT-T52 @action_create
      Scenario: Verify there will be a Follow Up new popup displays in the action details which has child
        Given I'm in "Actions" Page
        When I create new action
          | type   | clientName      | serviceType                    | comment | dueDate      | childAction |
          | Client | Test Automation | Client Automation Follow Up    | Tesst   | Today        | currentUser |
        And I clear filter 'Type'
        And I do filter "Client Automation Follow Up" "Type" 
        And I click on new action created
          | type   | clientName      | serviceType                    | comment | status | dueDate      | 
          | Client | Test Automation | Client Automation Follow Up    | Tesst   | To Do  | Today        |
        And I change action "Status" to "Done"
        Then The Follow Up new popup is displayed

      @TestCaseKey=CPT-T53 @action_create
      Scenario: Verify there will be a Follow Up new popup displays in the action details which has not child
        Given I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                    | comment | dueDate      |
          | Client | Test Automation | Client Automation Follow Up    | Tesst   | Today        |
        And I clear filter 'Type'
        And I do filter "Client Automation Follow Up" "Type" 
        And I click on new action created
          | type   | clientName      | serviceType                    | comment | dueDate      | status |
          | Client | Test Automation | Client Automation Follow Up    | Tesst   | Today        | To Do  |
        And I change action "Status" to "Done"
        Then The Follow Up new popup is displayed

      @TestCaseKey=CPT-T54 @action_create
      Scenario: Verify there is no popup will be displayed on Action feature when user chage status to Done popup displays in the action details after User udpate an existing service type by untick the Follow Up checkbox on service type
        Given I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate |
          | Client | Test Automation | Client Automation Follow Up       | Tesst   | Today   |
        And I update Client Service Type
          | serviceName                       | serviceType      | followUp | numberOfDays | routingGroup | postToFeed |
          | Client Automation Follow Up       | Quick Request    |          |              |              |            |
        And I'm in "Actions" Page
        And I clear filter 'Type'
        And I do filter "Client Automation Follow Up" "Type" 
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate | status |
          | Client | Test Automation | Client Automation Follow Up       | Tesst   | Today   | To Do  |
        And I change action "Status" to "Done"
        Then The Follow Up popup is not displayed

      @TestCaseKey=CPT-T55 @action_create
      Scenario: Verify there will be a Follow Up new popup displays in the action details after User update an existing service type by Tick the Follow Up checkbox
        Given I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate |
          | Client | Test Automation | Client Automation Follow Up       | Tesst   | Today   |
        And I update Client Service Type
          | serviceName                       | serviceType      | followUp | numberOfDays | routingGroup | postToFeed |
          | Client Automation Follow Up       | Quick Request    |   true   |      10      | Smart Action |            |
        And I'm in "Actions" Page
        And I clear filter 'Type'
        And I do filter "Client Automation Follow Up" "Type" 
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate | status |
          | Client | Test Automation | Client Automation Follow Up       | Tesst   | Today   | To Do  |
        And I change action "Status" to "Done"
        Then The Follow Up new popup is displayed

      @TestCaseKey=CPT-T56 @action_create
      Scenario: Verify the behavior when user clicks on Add Action button
        Given I'm in "Actions" Page
        When I clear filter 'Group'
        And I get number of actions
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate |
          | Client | Test Automation | Client Automation Follow Up       | Tesst   | Today   |
        And I update Client Service Type
          | serviceName                       | serviceType      | followUp | numberOfDays | routingGroup | postToFeed |
          | Client Automation Follow Up       | Quick Request    |   true   |      10      | Smart Action |            |
        And I'm in "Actions" Page
        And I clear filter 'Type'
        And I do filter "Client Automation Follow Up" "Type" 
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate | status |
          | Client | Test Automation | Client Automation Follow Up       | Tesst   | Today   | To Do  |
        And I change action "Status" to "Cancelled"
        And I click on Add Action button
        Then New action present in action page
          | type  | clientName      | serviceType                | status | dueDate        |
          | Client| Test Automation | Client Automation Follow Up       | To Do  | next 10 days   |

      @TestCaseKey=CPT-T62 @action_create
      Scenario: Verify the “Follow Up Action” new popup is not shown when User change action status to “In Progress”
        Given I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate |
          | Client | Test Automation | Client Automation Follow Up       | Tesst   | Today   |
        And I clear filter 'Type'
        And I do filter "Client Automation Follow Up" "Type"         
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate | status |
          | Client | Test Automation | Client Automation Follow Up       | Tesst   | Today   | To Do  |
        And I change action "Status" to "In Progress"
        Then The Follow Up popup is not displayed

      @TestCaseKey=CPT-T58 @action_create
      Scenario: Verify the “Follow Up Action” new popup is not shown when User change action status to “To Do”
        Given I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate |
          | Client | Test Automation | Client Automation Follow Up       | Tesst   | Today   |
        And I clear filter 'Type'
        And I do filter "Client Automation Follow Up" "Type" 
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate | status |
          | Client | Test Automation | Client Automation Follow Up       | Tesst   | Today   | To Do  |
        And I change action "Status" to "In Progress"
        And I change action "Status" to "To Do"
        Then The Follow Up popup is not displayed

      @TestCaseKey=CPT-T59 @action_create
      Scenario: Verify the number of days displays on the “Follow Up” popup
        Given I'm in Edit Company Page
        Then I update Client Service Type
          | serviceName                       | serviceType      | followUp | numberOfDays | routingGroup | postToFeed |
          | Client Automation Follow Up       | Quick Request    |   true   |      10      | Smart Action |            |
        And I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate |
          | Client | Test Automation | Client Automation Follow Up       | Tesst   | Today   |
        And I clear filter 'Type'
        And I do filter "Client Automation Follow Up" "Type" 
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate | status |
          | Client | Test Automation | Client Automation Follow Up       | Tesst   | Today   | To Do  |
        And I change action "Status" to "Done"
        Then The number of days displayed on the “Follow Up” popup is 10

      @TestCaseKey=CPT-T60 @action_create
      Scenario: Verify there is no popup will be displayed on Action has child feature when User chage status to “Done” if user unticks to “Follow Up”
        Given I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate | childAction |
          | Client | Test Automation | Client Automation Schedule & Note | Tesst   | Today   | currentUser |
        And I clear filter 'Type'
        And I do filter "Client Automation Schedule & Note" "Type" 
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate |
          | Client | Test Automation | Client Automation Schedule & Note | Tesst   | Today   |
        And I change action "Status" to "Done"
        Then The Follow Up popup is not displayed

      @TestCaseKey=CPT-T61 @action_create
      Scenario: Verify there is no popup will be displayed on Action has not child feature when User chage status to “Done” if user unticks to “Follow Up”
        Given I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate |
          | Client | Test Automation | Client Automation Schedule & Note | Tesst   | Today   |
        And I clear filter 'Type'
        And I do filter "Client Automation Schedule & Note" "Type" 
        And I click on new action created
          | type   | clientName      | serviceType                       | comment | dueDate |
          | Client | Test Automation | Client Automation Schedule & Note | Tesst   | Today   |
        And I change action "Status" to "Done"
        Then The Follow Up popup is not displayed

      @TestCaseKey=CPT-T66 @action_create
      Scenario: Verify the customer name or worker name respectively on the “Follow Up” popup
        Given I'm in "Actions" Page
        And I create new action
          | type   | workerName      | serviceType                       | comment | dueDate |
          | Worker | Test Automation | Worker Automation Follow Up       | Tesst   | Today   |
        And I clear filter 'Type'
        And I do filter "Worker Automation Follow Up" "Type" 
        And I click on new action created
          | type   | workerName      | serviceType                       | comment | dueDate | status |
          | Worker | Test Automation | Worker Automation Follow Up       | Tesst   | Today   | To Do  |
        And I change action "Status" to "Cancelled"
        Then The worker name "Test Automation" is shown correctly in Follow Up popup
        And The Follow Up new popup is displayed

      @TestCaseKey=CPT-T4 @action_log
      Scenario: History log is updated when user changes Status to another value in action details
        Given I'm in "Actions" Page
        When I clear filter 'Status'
        And I clear filter 'Type'
        And I do filter "To Do" "Status" 
        And I do filter "Client Automation Input Notes" "Type" 
        And Click edit on specific action
        And I change action "Status" to "In Progress"
        And I close the action detail
        And I do filter "In Progress" "Status" 
        Then The log should be updated as "changed the status to In Progress"

      @TestCaseKey=CPT-T95 @action_log
      Scenario: Verify history log is not updated even when user makes no change to Status drop down
        Given I'm in "Actions" Page
        When I clear filter 'Status'
        And I clear filter 'Type'
        And I do filter "To Do" "Status" 
        And I do filter "Client Automation Input Notes" "Type"
        And Click edit on specific action
        And I get current log entry in action details
        And I change action "Status" to "To Do"
        And I close the action detail
        Then There is no log entry inserted in action details

      @TestCaseKey=CPT-T11 @action_filter
      Scenario: Verify the correctness of behavior of “Apply Filters” button when selecting Type Filter
        Given I'm in "Actions" Page
        When I clear filter 'Status'
        And I clear filter 'Type'
        And I do filter "Client Automation Input Notes" "Type" 
        Then The action list should contains only "Client Automation Input Notes" "Type" action

      @TestCaseKey=CPT-T10 @action_filter
      Scenario: Verify the correctness of behavior of “Apply Filters” button when selecting Status Filter
        Given I'm in "Actions" Page
        When I clear filter 'Status'
        When I do filter "In Progress" "Status" 
        Then The action list should contains only "In Progress" "Status" action

      @TestCaseKey=CPT-T12 @action_filter
      Scenario: Verify the correctness of behavior of “Apply Filters” button when selecting Group Filter
        Given I'm in "Actions" Page
        When I do filter "My Actions" "Group" 
        Then The action list should contains only "" "Assignee(s)" action

      @TestCaseKey=CPT-T13 @action_filter
      Scenario: Verify the correctness of behavior of “Apply Filters” button when selecting Branch Filter
        Given I'm in "Actions" Page
        When I do filter "Automation" "Branch" 
        Then The action list should contains only "Automation" "Branch" action

      @TestCaseKey=CPT-T14 @action_filter
      Scenario: Verify the correctness of behavior of “Apply Filters” button when selecting State Filter
        Given I'm in "Actions" Page
        When I do filter "NSW" "State" 
        Then The action list should contains only "NSW" "State" action

      @TestCaseKey=CPT-T15 @action_filter
      Scenario: Verify the correctness of behavior of “Apply Filters” button when selecting Priority Filter
        Given I'm in "Actions" Page
        When I do filter "No" "Priority" 
        Then The action list should contains only "No" "Priority" action

      @TestCaseKey=CPT-T69 @action_filter
      Scenario: Verify the filter should be kept after refreshing page or lost focus
        Given I'm in "Actions" Page
        When I select filter "In Progress" "Status"
        And I select filter "NSW" "State" 
        And I select filter "Client Automation Input Notes" "Type"
        And I select filter "My Actions" "Group"
        And I select filter "Automation" "Branch"
        And I select filter "No" "Priority"
        Then The selected filters should be kept
          | Status      | Type                          | Group      | State | Priority | Branch     |
          | In Progress | Client Automation Input Notes | My Actions |  NSW  |    No    | Automation |

      @TestCaseKey=CPT-T84 @action_filter
      Scenario: Check the page is loading data successfully when user combine many filters and then click refresh button
        Given I'm in "Actions" Page
        When I select filter "In Progress" "Status"
        And I select filter "NSW" "State" 
        And I select filter "Client Automation Input Notes" "Type"
        And I select filter "My Actions" "Group"
        And I select filter "Automation" "Branch"
        And I select filter "No" "Priority"
        And I click refresh filter button in action page
        Then Action list should be load successfully
          | Status      | Type                          | Branch     |
          | In Progress | Client Automation Input Notes | Automation |

      @TestCaseKey=CPT-T85 @action_filter
      Scenario: Check the page is loading data successfully when user combine many filters and then apply the new filter
        Given I'm in "Actions" Page
        When I select filter "In Progress" "Status"
        And I select filter "NSW" "State" 
        And I select filter "Client Automation Input Notes" "Type"
        And I select filter "My Actions" "Group"
        And I select filter "Automation" "Branch"
        And I select filter "No" "Priority"
        And I click apply filter button in action page
        Then Action list should be load successfully
          | Status      | Type                          | Branch     |
          | In Progress | Client Automation Input Notes | Automation |

      @TestCaseKey=CPT-T86 @action_filter
      Scenario: Verify actions list is loaded within a mins
        Given I'm in "Actions" Page
        When I clear all filter in action page
        And I'm in "Actions" Page
        Then Action list should be loaded within a min

      @TestCaseKey=CPT-T87 @action_caseManager
      Scenario: Verify to display the Case Manager in Action List
        Given Exist the data has the case manager in action list
        Given I'm in "Actions" Page
        And Case Manager filter is displayed
        And The initially filter of Case Manager is All
        When I select one value of Case Manager filter
        And The selected value should be displayed in Case Manager filter
        And The clear selected display item that selected in Case Manager filter
        And The suggested item display item that not selected in Case Manager filter

      @TestCaseKey=CPT-T89 @action_caseManager
      Scenario: Verify the correct value of Case Manager in Action List
        Given I'm in "Actions" Page
        Then The value in Case Manager filter should be displayed to consistency with the query SQL

      @TestCaseKey=CPT-T88 @action_caseManager
      Scenario: Verify the value of case manager filter should be kept after user log-in and log-out
       Given I'm in "Actions" Page
       When I select one value of Case Manager filter
       And I click apply filter button in action page
       And I logout 
       And I login with "Global Admin" role
       Given I'm in "Actions" Page
       Then The selected value should be displayed in Case Manager filter

      @TestCaseKey=CPT-T90 @action_caseManager
      Scenario: Verify to not display the Case Manager in Action List
        Given Not existing the data has the case manager in action list
        When I'm in "Actions" Page
        Then Case Manager filter is not displayed

      @TestCaseKey=CPT-T22 @action_layout
      Scenario: Verify the layout of Action Create >> Search for a client
        Given I'm in "Actions" Page
        When I click on create action
        And I select create "client" action
        And I search for client "Test Automation"
        And I click on client "Test Automation" 
        Then The client selected should hightlight to "#00a79d"
        And The next button color is "#027369"

      @TestCaseKey=CPT-T23 @action_layout
      Scenario: Verify the layout of Action Create >> Search for a worker
        Given I'm in "Actions" Page
        When I click on create action
        And I select create "worker" action
        And I search for worker "Test Automation"
        And I click on worker "Test Automation" 
        Then The client selected should hightlight to "#00a79d"
        And The next button color is "#027369"

      @TestCaseKey=CPT-T6 @action_filter
      Scenario: Verify the value of Assignee after filtering in action list
        Given I'm in "Actions" Page
        When I do filter "To Do" "Status" 
        And I clear filter 'Group'
        And Click edit on specific action
        And I change action "Status" to "Done"
        And I change action "Status" to "To Do"
        And I close the action detail
        Then The action should be displayed as same as value in action details

      @TestCaseKey=CPT-T91 @action_filter @skip
      Scenario: Verify to show the new column TEAM add into the action list
        Given I login with "Hayylo Admin" role 
        And I'm in "Company" Page
        When I set "Team" as custom filter for "Automation Company" company
        Then I login with "Global Admin" role 
        And "Team" filter be shown after Status and before the Priority

      @TestCaseKey=CPT-T92 @action_filter @skip
      Scenario: Verify to show the new column Team in create action
        Given I'm in "Actions" Page
        When Create action for "client" is displayed in action page
        Then "Team" column must be shown between Phone and Address column

      @TestCaseKey=CPT-T93 @action_filter @skip
      Scenario: Verify to show the new column Branch add into the action list
        Given I login with "Hayylo Admin" role 
        And I'm in "Company" Page
        When I set "Branch" as custom filter for "Automation Company" company
        Then I login with "Global Admin" role 
        And "Branch" filter be shown after Status and before the Priority

      @TestCaseKey=CPT-T94 @action_filter
      Scenario: Verify to show the new column Team in create action
        Given I'm in "Actions" Page
        When Create action for "client" is displayed in action page
        Then "Branch" column must be shown between Phone and Address column

      @TestCaseKey=CPT-T21 @action_filter
      Scenario: Verify the value of TEAM after filtering in action list
        Given I'm in "Actions" Page
        When I do filter "Automation" "Branch" 
        And Click edit on specific action
        And I change action "Status" to "Done"
        And I change action "Status" to "To Do"
        And I close the action detail
        Then The action should be displayed as same as value in action details

      @TestCaseKey=CPT-T24 @action_comment
      Scenario: Verify that user are able to input comment and save successfully
        Given I'm in "Actions" Page
        When Click edit on specific action
        And I add the comment "Comment Tesing 1"
        And I close the action detail
        Then The commented should be displayed same as the "Comment Tesing 1"

      @TestCaseKey=CPT-T25 @action_comment
      Scenario: Verify that user is able to edit comments successfully
        Given I'm in "Actions" Page
        When Click edit on specific action
        And I edit latest the comment with value "Edited comment Tesing 1"
        And I close the action detail
        Then The commented should be displayed same as the "Edited comment Tesing 1"

      @TestCaseKey=CPT-T26 @action_comment
      Scenario: Verify that user is able to delete comments successfully
        Given I'm in "Actions" Page
        When Click edit on specific action
        And I delete comment "Edited comment Tesing 1"
        And I close the action detail
        Then The deleted comment "Edited comment Tesing 1" should not be displayed

      @TestCaseKey=CPT-T70 @action_comment
      Scenario: Verify that user save successfully in Edit comment when clicking on Save button
        Given I'm in "Actions" Page
        When Click edit on specific action
        And I add the comment to display the scroll bar
        And I close the action detail
        Then The content is displayed as same as the data that user inputs

      @TestCaseKey=CPT-T96 @action_attachment @skip
      Scenario: Verify that user attach file successfully
        Given I'm in "Actions" Page
        When Click edit on specific action
        And I upload attach file "attachment_1.png" in action details
        And I upload attach file "attachment_2.png" in action details
        Then The attachments file must be displayed correctly
          | fileName         |
          | attachment_1.png |
          | attachment_2.png |       

      @TestCaseKey=CPT-T97 @action_attachment @skip
      Scenario: Verify that user are able to delete many attachment files
        When I click delete all attachment files in action details
        Then The Attachment files are deleted successfully

      @TestCaseKey=CPT-T37 @action_client
      Scenario: Verify that the new Action UI display in Client container
        Given I'm in "Clients" Page
        When I go to client "Test Automation" details page
        Then There will be a Action tab in client container
        And I can allows viewing all of the action of selected client

      @TestCaseKey=CPT-T35 @action_client
      Scenario: The “Create an action for” screen will be required to remove when creating an action
        Given I'm in "Clients" Page
        When Create new action is opened in client "Test Automation" details
        Then The Create an action for screen is not shown

      @TestCaseKey=CPT-T36 @action_client
      Scenario: The “Search for a client” screen will be required to remove when creating an action
        Given I'm in "Clients" Page
        When Create new action is opened in client "Test Automation" details
        Then The Search for a client screen is not shown

      @TestCaseKey=CPT-T38 @action_worker
      Scenario: Verify that the new Action UI display in Worker container
        Given I'm in "Workers" Page
        When I go to worker "Test Automation" details page
        Then There will be a Action tab in worker container
        And I can allows viewing all of the action of selected worker

      @TestCaseKey=CPT-T39 @action_worker
      Scenario: In Workers screen, the “Create an action for” screen will be required to remove when creating an action
        Given I'm in "Workers" Page
        When Create new action is opened in worker "Test Automation" details
        Then The Create an action for screen is not shown

      @TestCaseKey=CPT-T40 @action_worker
      Scenario: In Workers screen, the “Search for a client” screen will be required to remove when creating an action
        Given I'm in "Workers" Page
        When Create new action is opened in worker "Test Automation" details
        Then The Search for a worker screen is not shown

      @TestCaseKey=CPT-T64 @action_client
      Scenario: Verify new action created is present in this client container not other
        Given I'm in "Clients" Page
        When I go to client "Test Automation" details page
        And I get number of actions
        And I'm in "Actions" Page
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate      |
          | Client | Test Automation | Client Automation Schedule Cancel | Tesst   | Today        |
        And I'm in "Clients" Page
        And I go to client "Test Automation" details page
        Then New action present in client details at action tab
          | type   | clientName      | serviceType                       | comment | dueDate      | status |
          | Client | Test Automation | Client Automation Schedule Cancel | Tesst   | Today        | To Do  |   
        And I'm in "Clients" Page
        And I go to client "Test 2 Automation" details page     
        And This action is not present in other client details
          | type   | clientName      | serviceType                       | comment | dueDate      | status |
          | Client | Test Automation | Client Automation Schedule Cancel | Tesst   | Today        | To Do  | 

      @TestCaseKey=CPT-T65 @action_worker
      Scenario: Verify new action created is present in this worker container not other
        Given I'm in "Workers" Page
        When I go to worker "Test Automation" details page
        And I get number of actions
        And I'm in "Actions" Page
        And I create new action
          | type   | workerName      | serviceType                       | comment | dueDate       |
          | Worker | Test Automation | Worker Automation Schedule Cancel | Tesst   | Today         |   
        And I'm in "Workers" Page
        And I go to worker "Test Automation" details page
        Then New action present in worker details at action tab
          | type   | workerName      | serviceType                       | comment | dueDate      | status |
          | Worker | Test Automation | Worker Automation Schedule Cancel | Tesst   | Today        | To Do  |   
        And I'm in "Workers" Page
        And I go to worker "Test 2 Automation" details page     
        And This action is not present in other worker details
          | type   | workerName      | serviceType                       | comment | dueDate      | status |
          | Worker | Test Automation | Worker Automation Schedule Cancel | Tesst   | Today        | To Do  | 


      @TestCaseKey=CPT-T34 @action_company @company @skip
      Scenario: Verify that Subaction checkbox is displayed in Add Company
        Given I login with "Hayylo Admin" role 
        And I'm in "Company" Page
        When I create new company
          | companyName    | companyCode | companyTrade | companyABN | companyTelephone | companyAddress                                       | companyTrade   | companyEmail          | companyWebsite | contactName | contactTelephone | contactEmail      | contactTitle | features  |
          | Action Test    | TES         |    AUT       | AUT        | 0999999910       | Victoria Road, Denistone West, NSW, 2114, Australia  | AUT            | automation@hayylo.com | automation.com | Automation  | 09768456567      | test9997@mail.com |      Mr      | subaction |
        Then The status of subaction checkbox should be checked

      @TestCaseKey=CPT-T29 @action_company @skip
      Scenario: Verify that Subaction checkbox is displayed in Edit Company
        Given I login with "Hayylo Admin" role 
        And I'm in "Company" Page
        When I click edit company "Automation Company"
        And I turn on "Subaction" checkbox in edit company page
        And I Click save on Add Company Tab
        Then The status of subaction checkbox should be checked

      @TestCaseKey=CPT-T32 @action_company @skip
      Scenario: Verify the behavior of action detail in company has Subaction checkbox is off
        Given "Automation Company" company subaction is turn off
        Given I login with "Global Admin" role 
        And I'm in "Actions" Page
        When Click edit on specific action
        Then This subaction function should not be existed 
        And I can not able to add any subaction
        
      @TestCaseKey=CPT-T33 @action_company @skip
      Scenario: Verify the behavior of creating action in company has Subaction checkbox is off
        Given "Automation Company" company subaction is turn off
        Given I login with "Global Admin" role 
        And I'm in "Actions" Page
        When Click create action
        And I create "Client" action
        And I select "Client Automation Input Notes" service Type
        Then This subaction function should not be existed 
        And I can not able to add any subaction


      @TestCaseKey=CPT-T30 @action_company @skip
      Scenario: Verify the behavior of action detail in company has Subaction checkbox is on
        Given "Automation Company" company subaction is turn on
        Given I login with "Global Admin" role 
        And I'm in "Actions" Page
        When Click edit on specific action
        Then This subaction function should be existed 
        And I'm able to add any subaction
        
      @TestCaseKey=CPT-T31 @action_company @action_subtask @skip
      Scenario: Verify the behavior of creating action in company has Subaction checkbox is on
        Given "Automation Company" company subaction is turn on
        Given I login with "Global Admin" role 
        And I'm in "Actions" Page
        When Click create action
        And I create "Client" action
        And I select "Client Automation Input Notes" service Type
        Then This subaction function should be existed 
        And I'm able to add any subaction

      @TestCaseKey=CPT-T27 @action_subtask
      Scenario: Verify that user is able to create a new sub-task
        Given I login with "Global Admin" role 
        And I'm in "Actions" Page
        And Click edit on specific action
        And I click on Linked Action text field
        And I select Linked Action Assignee
        Then The sub-task page is displayed to add the information
        And The action status is "To Do"
        And Due Date is date time picker and user is able to select the date
        And Primary assignee the value is same as the value in Groups and user is able to select
        And Auto-generated a comment when a subtask is created
        And The ID main task / sub task should be displayed
        And Sub-task is created with status "To Do"

      @TestCaseKey=CPT-T28 @action_subtask
      Scenario: Verify the layout of Linked Task when there is exist at least one sub-task
        Given I'm in "Actions" Page
        When I clear filter 'Status'
        And Click edit on action has linked task
        And Linked Task should be shown the subtaskId, subtaskDescription and subtaskStatus

      @TestCaseKey=CPT-T7 @action_create
      Scenario: Verify the behavior of due date when user creates task
        Given I'm in "Actions" Page
        When Click create action
        And I create "Client" action
        And I select "Client Automation Input Notes" service Type
        And I click select Due Date action
        Then The value should be enable from current date to future date and user is able to select it
        And The value date from back later due date should be disabled and user is not able to select it

      @TestCaseKey=CPT-T9 @action_filter
      Scenario: Verify when an icon ! in red show in the priority record
        Given I'm in "Actions" Page
        When I clear filter 'Type'
        And I do filter "Client Automation Input Notes" "Type" 
        And Click edit on specific action
        And I "check" priority icon
        And I close the action detail
        Then This record should have an icon ! in red show

      @TestCaseKey=CPT-T8 @action_filter
      Scenario: Verify when an icon ! in red does not show in the priority record
        Given I'm in "Actions" Page
        When Click edit on specific action
        And I "uncheck" priority icon
        And I close the action detail
        Then This record should not have an icon ! in red show
      
      @TestCaseKey=CPT-T43 @action_create
      Scenario: Verify the behavior of Priority icon in Action details screen
        Given I'm in "Actions" Page
        And I'm in Action details which has priority and none priority task
        When I click on priority task
        And I click on root action task
        And I click on none priority task
        Then The default value is show priority in red icon
        And The default value is not show priority in red icon

      @TestCaseKey=CPT-T67 @action_details
      Scenario: Verify the correct of header information in Action details screen
        Given I'm in "Actions" Page
        And I do filter "Client Automation Input Notes" "Type"
        When Click edit on specific action
        Then The actionId should be shown in the top and the value should be same as the value in Action list
        And The header information should be shown

      @TestCaseKey=CPT-T71 @action_create
      Scenario: Verify the correctness data of assignee column
        Given I'm in "Actions" Page
        When I clear filter 'Type'
        And I do filter "Client Automation Input Notes" "Type" 
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate      | primaryAssignee |
          | Client | Test Automation | Client Automation Input Notes     | Tesst   | Today         | currentUser     |
        Then The assignee value should be displayed as "currentUser"

      @TestCaseKey=CPT-T73 @action_details
      Scenario: Verify the primary assignee is displayed correctly when user creates action with primary assignee is any value in Users
        Given I'm in "Actions" Page
        When I clear filter 'Type'
        And I clear filter 'Group'
        And I do filter "Client Automation Input Notes" "Type" 
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate      | primaryAssignee         |
          | Client | Test Automation | Client Automation Input Notes     | Tesst   | Today        | User Automation Service |
        Then The assignee value should be displayed as "User Automation Service"
        And The value of due date is displayed as "Today"
        And The action status is "To Do"
        And I close the action detail

      @TestCaseKey=CPT-T72 @action_details
      Scenario: Verify when user changes the primary assignee in Users to another value
        Given I'm in "Actions" Page
        When I clear filter 'Type'
        And I clear filter 'Group'
        And I do filter "Client Automation Input Notes" "Type"
        And I click on newest action
        And I change the primary assignee to "User Automation Service 2"
        And I close the action detail
        Then "Assignee(s)" column should be displayed as "User Automation Service 2" in action list

      @TestCaseKey=CPT-T75 @action_details
      Scenario: Verify the primary assignee is displayed correctly when user creates action with primary assignee is any value in Groups
        Given I'm in "Actions" Page
        When I clear filter 'Type'
        And I clear filter 'Group'
        And I do filter "Client Automation Input Notes" "Type" 
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate      | primaryAssignee          |
          | Client | Test Automation | Client Automation Input Notes     | Tesst   | Today        | Automation Routing Group |
        Then The assignee value should be displayed as "Automation Routing Group"
        And The value of due date is displayed as "Today"
        And The action status is "To Do"
        And I close the action detail

      @TestCaseKey=CPT-T76 @action_details
      Scenario: Verify when user changes the primary assignee in Groups to another value
        Given I'm in "Actions" Page
        When I clear filter 'Type'
        And I clear filter 'Group'
        And I do filter "Client Automation Input Notes" "Type"
        And I click on newest action
        And I change the primary assignee to "Smart Action"
        And I close the action detail
        Then "Assignee(s)" column should be displayed as "Smart Action" in action list

      @TestCaseKey=CPT-T74 @action_subtask
      Scenario: Verify the sub-task is displayed on an action list after creating from parent task in view action mode
        Given I'm in "Actions" Page
        When I clear filter 'Type'
        And I clear filter 'Group'
        And I do filter "Client Automation Input Notes" "Type"
        And I create new action
          | type   | clientName      | serviceType                       | comment | dueDate      | primaryAssignee         |
          | Client | Test Automation | Client Automation Input Notes     | Tesst   | Today        | User Automation Service |
        And I click on newest action
        And I create new sub-task
          | status | dueDate      | primaryAssignee           |
          | To Do  | Today        | User Automation Service   |
          | To Do  | Today        | User Automation Service 2 |
        And I close the action detail
        Then These sub-task should be displayed in action list correctly

      @TestCaseKey=CPT-T77 @action_subtask
      Scenario: Verify the sub-task is displayed on an action list after creating from parent task in creating action mode
        Given I'm in "Actions" Page
        When I clear filter 'Type'
        And I clear filter 'Group'
        And I do filter "Client Automation Input Notes" "Type"
        And I get number of actions
        And I create new action has sub-task with assignee as same as the parent task
          | type   | clientName      | serviceType                       | comment | dueDate      | childAction |
          | Client | Test Automation | Client Automation Input Notes     | Tesst   | next 1 day   | currentUser |
        And I refresh page
        And I create new action has sub-task with assignee differs with the parent task
          | type   | clientName      | serviceType                       | comment | dueDate      | childAction             |
          | Client | Test Automation | Client Automation Input Notes     | Tesst   | next 1 day   | User Automation Service |
        Then New action present in action page
          | type  | clientName      | serviceType                       | status | dueDate    | primaryAssignee         | 
          | Client| Test Automation | Client Automation Input Notes     | To Do  | next 1 day | currentUser             |
          | Client| Test Automation | Client Automation Input Notes     | To Do  | next 1 day | User Automation Service |

      @TestCaseKey=CPT-T78 @action_worker
      Scenario: Verify the link in UserID of editing and deleting Worker should be shown matched together
        Given I'm in "Workers" Page
        When I go to worker "Test 2 Automation" details page
        Then The userId of worker "Test 2 Automation" in editing and deleting should be matched together

      @TestCaseKey=CPT-T98 @action_create
      Scenario: Verify when the due date changed to yellow colour
        Given I'm in "Actions" Page
        And I create new action has due date greater than current date 2 days
          | type   | clientName      | serviceType                       | comment | dueDate      |
          | Client | Test Automation | Client Automation Input Notes     | Tesst   | next 2 days   |
        Then The colour of this due date in action list is "yellow"

      @TestCaseKey=CPT-T99 @action_create
      Scenario: Verify when the due date changed to green colour
        Given I'm in "Actions" Page
        And I create new action has due date greater than current date 4 days
          | type   | clientName      | serviceType                       | comment | dueDate       |
          | Client | Test Automation | Client Automation Input Notes     | Tesst   | next 4 days   |
        Then The colour of this due date in action list is "green"

      @TestCaseKey=CPT-T100 @action_create
      Scenario: Verify when the due date changed to red colour with the due date is not the current date
        Given I'm in "Actions" Page
        And I create new action has due date greater than current date 1 days
          | type   | clientName      | serviceType                       | comment | dueDate       |
          | Client | Test Automation | Client Automation Input Notes     | Tesst   | next 1 days   |
        Then The colour of this due date in action list is "red"

      @TestCaseKey=CPT-T79 @action_report
      Scenario: Verify the behaviour of Reports: Action Summary
        Given I'm in "Reports" "Action Summary" Page
        When I select from date "previous 1 days"
        And I select to date "today"
        And I click filter in Action Summary page
        Then The Excel file be displayed consistency with data in the UI
  
      @TestCaseKey=CPT-T80 @action_notification 
      Scenario: Verify to show the action details page when user clicked on Notification Bell on Actions page
        Given I login with "Global Admin" role 
        And I'm in "Actions" Page
        Then I create new action for Service User to get notification
          | type  | clientName      | serviceType                   | comment | dueDate | primaryAssignee |
          | Client| Test Automation | Client Automation Input Notes | Tesst   | Today   | User Service    |
        And I login with "Service" role
        And I click on assigned action notification
        Then The action details page should be displayed

      @TestCaseKey=CPT-T81 @action_notification
      Scenario: Verify the notification marked as READ and removed from the notification bell
        Given I login with "Global Admin" role 
        And I'm in "Actions" Page
        Then I create new action for Service User to get notification
          | type  | clientName      | serviceType                   | comment | dueDate | primaryAssignee |
          | Client| Test Automation | Client Automation Input Notes | Tesst   | Today   | User Service    |
        And I login with "Service" role
        And I'm in "Actions" Page
        And I get number of notification bell
        And I get notification send date
        And I click on first notification
        Then The notification should be removed from the notification list
        And The number of notification bell should be decreased one number

      @TestCaseKey=CPT-T82 @action_notification
      Scenario: Verify in case there are no notification to view
        Given I login with "Global Admin" role 
        And I'm in "Actions" Page
        Then I create new action for Service User to get notification
          | type  | clientName      | serviceType                   | comment | dueDate | primaryAssignee |
          | Client| Test Automation | Client Automation Input Notes | Tesst   | Today   | User Service    |
        And I login with "Service" role
        And I'm in "Actions" Page
        And I click on mark as read notification
        Then The number of notification should be back to zero

      @TestCaseKey=CPT-T83 @action_notification
      Scenario: Verify to view all notifications
        Given I login with "Global Admin" role 
        And I'm in "Actions" Page
        Then I create new action for Service User to get notification
          | type  | clientName | serviceType                   | comment | dueDate | primaryAssignee |
          | Client|            | Client Automation Input Notes | Tesst   | Today   | User Service    |
        And I login with "Service" role
        And I'm in "Actions" Page
        And I click on view all notification message
        Then Notification page should be presented


      @test3
      Scenario: Verify web user sends an outbound SMS to client successfully
        Given I login with "Global Admin" role
        And I'm in "Actions" Page
        When I create new action for default client
          | type  | clientName  | serviceType                   | comment | dueDate |
          | Client|             | Client Automation Input Notes | Tesst   | Today   |
        And I'm in "Clients" Page
        And I click edit action on default client
        And I add the comment 'Share with client' and share with customer
        Then The commented should be displayed same as the 'Share with client'

      @delete @p2
      Scenario: Delete client service type successfully
        Given I login with "Global Admin" role
        And I'm in Edit Company Page
        When I delete Client Service Type     
        And I delete Worker Service Type

      @delete @p2
      Scenario: Delete worker successfully
        Given I'm in "Workers" Page
        When I delete worker

      @delete @p2
      Scenario: Delete client successfully
        Given I'm in "Clients" Page
        When I delete client

      @delete @user @action_notification @test5
      Scenario: Delete user successfully
        Given I login with "Global Admin" role
        And I'm in "Users" Page
        When I delete user

      @routingGroup @delete @p2
      Scenario: Delete routing group successfully
        Given I'm in "Routing Groups" Page
        When I delete routing group if exist

      @company @skip
      Scenario: Delete company successfully
        Given I login with "Hayylo Admin" role 
        And I'm in "Company" Page
        When I delete company "Action Test"