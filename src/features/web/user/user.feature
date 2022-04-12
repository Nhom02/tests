Feature: User
      As a Global Admin, I want to test create and edit user/client/worker successfully

      @user_create @client_create @worker_create
      @testIssue @TestCaseKey=CPT-T110 @TestCaseKey=CPT-T118
      Scenario: Login into system successfully
        Given I login with "Global Admin" role

      @worker_create
      Scenario: Create service if not exist
        Given I'm in "Services" Page
        And I create service if not exist
        | serviceName | serviceDesc | skillType | userMember |
        | caring      | caring      | Caring    | WKR        |


      @user_create @TestCaseKey=CPT-T110
      Scenario: Verify to add new user successfully
        Given I'm in "Users" Page
        When I create new user
          | firstName       | lastName            | email          | phone      | userType            | role |  group  |
          | User Automation | Company Admin       | user1@mail.com |            | Company Admin       |      |         |
          | User Automation | Manager             | user2@mail.com |            | Manager             |      | Default |
          | User Automation | Service             | user3@mail.com |            | Service             |      |         |
          | User Automation | Marketing           | user4@mail.com |            | Marketing           |      |         |
          | User Automation | Health Professional | user5@mail.com | 0999999995 | Health Professional |      |         |
          | User Automation | Case Manager        | user6@mail.com |            | Case Manager        |      |         |
        Then User is added successfully
          | firstName       | lastName            | email          | phone      | userType            | role |  group  |
          | User Automation | Company Admin       | user1@mail.com |            | Company Admin       |      |         |
          | User Automation | Manager             | user2@mail.com |            | Manager             |      | Default |
          | User Automation | Service             | user3@mail.com |            | Service             |      |         |
          | User Automation | Marketing           | user4@mail.com |            | Marketing           |      |         |
          | User Automation | Health Professional | user5@mail.com | 0999999995 | Health Professional |      |         |
          | User Automation | Case Manager        | user6@mail.com |            | Case Manager        |      |         |

      @TestCaseKey=CPT-T111 @user_create @skip
      Scenario: Verify to activate user Admin successfully
        Given I login with "Global Admin" role
        And I'm in "Users" Page
        And I get email from 10 Minute
        When I create new user using email from 10 Minute
          | firstName       | lastName            | email | phone      | userType            | role |  group  |
          | User Automation | Company Admin       |       |            | Company Admin       |      |         |        
        Then New invitation email sent and user able to update password
        Then New created user login succesfully

      @TestCaseKey=CPT-T112 @user_create @skip
      Scenario: Verify to activate user Manager successfully
        Given I login with "Global Admin" role
        And I'm in "Users" Page
        And I get email from 10 Minute
        When I create new user using email from 10 Minute
          | firstName       | lastName            | email | phone      | userType            | role |  group  |
          | User Automation | Manager             |       |            | Manager             |      | Default |        
        Then New invitation email sent and user able to update password
        Then New created user login succesfully

      @TestCaseKey=CPT-T113 @user_create @skip
      Scenario: Verify to activate user Service successfully
        Given I login with "Global Admin" role
        And I'm in "Users" Page
        And I get email from 10 Minute
        When I create new user using email from 10 Minute
          | firstName       | lastName            | email | phone      | userType            | role |  group  |
          | User Automation | Service             |       |            | Service             |      |         |        
        Then New invitation email sent and user able to update password
        Then New created user login succesfully

      @TestCaseKey=CPT-T114 @user_create @skip
      Scenario: Verify to activate user Marketing successfully
        Given I login with "Global Admin" role
        And I'm in "Users" Page
        And I get email from 10 Minute
        When I create new user using email from 10 Minute
          | firstName       | lastName            | email | phone      | userType            | role |  group  |
          | User Automation | Marketing           |       |            | Marketing           |      |         |        
        Then New invitation email sent and user able to update password
        Then New created user login succesfully

      @TestCaseKey=CPT-T115 @user_create @skip
      Scenario: Verify to activate user Case Manager successfully
        Given I login with "Global Admin" role
        And I'm in "Users" Page
        And I get email from 10 Minute
        When I create new user using email from 10 Minute
          | firstName       | lastName            | email | phone      | userType            | role |  group  |
          | User Automation | Case Manager        |       |            | Case Manager        |      |         |        
        Then New invitation email sent and user able to update password
        Then New created user login succesfully
      
      @TestCaseKey=CPT-T116 @user_create
      Scenario: Verify to edit User successfully
        Given I login with "Global Admin" role
        And I'm in "Users" Page
        When I create new user
          | firstName  | lastName | email          | phone      | userType | role |  group  |
          | User       | Edit     | user7@mail.com |            | Service  |      |         |    
        And I update user
          | firstName       | lastName | email          | phone  | userType | role |  group  |
          | User Automation | Updated  | user7@mail.com |        | Manager  |      | Default |        
        Then The information of this user should be displayed as same the input data

      @TestCaseKey=CPT-T117 @user_create
      Scenario: Verify to delete Users successfully
        Given I login with "Global Admin" role
        And I'm in "Users" Page
        When I create new user
          | firstName  | lastName | email          | phone      | userType | role |  group  |
          | User       | Delete1  | user8@mail.com |            | Service  |      |         |         
        When I delete single user
        Then The deleted user should not be displayed in User Page 

      @TestCaseKey=CPT-T118 @client_create @issue
      Scenario: Verify to add new Clients successfully
        Given I login with "Global Admin" role
        And I'm in "Clients" Page
        When I create client
          | clientNumber  | firstName    | lastName   | email             | homePhone | address                                                 | branch     | primaryOffice| mobilePhone| dateOfBirth | emailLogin | phoneLogin | group   |
          | Client1       | Client       | Automation | client1@mail.com  |           | Victoria Road, Denistone West, NSW, 2114, Australia     |            | Any          |            |             |            |            | Default |
        Then The information of this client should be displayed as same the input data

      @TestCaseKey=CPT-T119 @client_create
      Scenario: Verify to add Contact for client successfully
        Given I login with "Global Admin" role
        And I'm in "Clients" Page
        When I create new client contact
        | clientName        | firstName | lastName | mobilePhone |
        | Client Automation | User      | Contact  | 0999999711  |
        Then The information of this client contact should be displayed as same the input data

      @TestCaseKey=CPT-T120 @client_create
      Scenario: Verify to delete Contact for client successfully
        Given I'm in "Clients" Page
        When I delete contact for client
        | clientName        | firstName | lastName | mobilePhone |
        | Client Automation | User      | Contact  | 0999999711  |
        Then The deleted contact should not be displayed in Client Contact page

      @TestCaseKey=CPT-T121 @client_create
      Scenario: Verify to delete client successfully
        Given I'm in "Clients" Page
        When I create client
          | clientNumber  | firstName    | lastName | email             | homePhone | address                                                 | branch     | primaryOffice| mobilePhone| dateOfBirth | emailLogin | phoneLogin | group   |
          | Client2       | Client       | Delete1  | client2@mail.com  |           | Victoria Road, Denistone West, NSW, 2114, Australia     |            | Any          |            |             |            |            | Default |
        When I delete single client
        Then The deleted client should not be displayed in Client Page 

      @TestCaseKey=CPT-T122 @worker_create
      Scenario: Verify to add new Workers successfully
        Given I'm in "Workers" Page
        When I create new Worker
          | employeeNumber      | emailLogin       | firstName | lastName     | mobilePhone | group   | services      |
          | Automation Worker 3 | worker1@mail.com | Worker    | Automation 1 | 0999999711  | Default | Auto - caring | 
        Then The information of this worker should be displayed as same the input data

      @TestCaseKey=CPT-T123 @worker_create
      Scenario: Verify to delete Worker successfully
        Given I'm in "Workers" Page
        When I create new Worker
          | employeeNumber      | emailLogin       | firstName | lastName     | mobilePhone | group   | services      |
          | Automation Worker 4 | worker2@mail.com | Worker    | Automation 2 | 0999999969  | Default | Auto - caring |
        When I delete single worker
        Then The deleted worker should not be displayed in Worker Page 

      @delete
      Scenario: Delete user
        Given I login with "Global Admin" role
        And I'm in "Users" Page
        When I delete user

      @delete @client_create
      Scenario: Delete client
        Given I'm in "Clients" Page
        When I delete client

      @delete @worker_create
      Scenario: Delete worker successfully
        Given I'm in "Workers" Page
        When I delete worker