Feature: Data Import
      As a Hayllo Admin, I want to import data for specific company

      @create @data_import
      Scenario: Create client if not exist
        Given I login with "Global Admin" role
        And I'm in "Clients" Page
        When I create client if not exist
          | clientNumber  | firstName  | lastName   | email          | homePhone | address                                                 | branch     | primaryOffice| mobilePhone| dateOfBirth | emailLogin | phoneLogin | group   |
          | Test999       | Test       | Automation | test@mail.com  |           | Victoria Road, Denistone West, NSW, 2114, Australia     | Automation | Any          |            |             |            |            | Default |
      
      @data_import @create
      Scenario: Create service if not exist
        Given I'm in "Services" Page
        And I create service if not exist
        | serviceName | serviceDesc | skillType | userMember |
        | caring      | caring      | Caring    | WKR        |

      @data_import @create
      Scenario: Create Worker if not exist 
        Given I'm in "Workers" Page
        When I create new Worker if not exist
          | employeeNumber      | emailLogin        | firstName   | lastName   | mobilePhone | group   | services      |
          | Automation Worker   | test9998@mail.com | Test        | Automation | 099999999   | Default | Auto - caring | 

      @data_import @create
      Scenario: Create Place if not exist   
        Given I'm in "Places" Page
        When I create new Place if not exist
          | placeName  | placeAddress                                        |
          | Automation | Victoria Road, Denistone West, NSW, 2114, Australia |

      @TestCaseKey=CPT-T124
      Scenario: Verify data from external platform is imported successfully
        Given I login with "Hayylo Admin" role
        When I upload external request in company page
        | clientName      | workerName      | serviceName | serviceNameFriendLy | scheduleDuration | importStatus | skillId |
        | Test Automation | Test Automation | caring      | caring              | 30               |  NEW         | 119     |
        Then External data is imported successfully
        And New imported schedule is displayed in Schedule Page
        And New imported schedule is displayed in "Client" "Test Automation"
        And New imported schedule is displayed in "Worker" "Test Automation"

      @delete @data_import
      Scenario: Delete worker
        Given I login with "Global Admin" role
        And I'm in "Workers" Page
        When I delete worker

      @delete @data_import
      Scenario: Delete client
        Given I'm in "Clients" Page
        When I delete client

      @delete @data_import
      Scenario: Delete Place
        Given I'm in "Places" Page
        When I delete place