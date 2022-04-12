Feature: Request Something

      @testIssue @requestAChange
      Scenario: Login
        Given I login with "Global Admin" role
        And I login in mobile app with "Client" role

      @test2 @requestAChange
      Scenario: Create service if not exist
        Given I'm in "Services" Page
        And I create service if not exist
        | serviceName | serviceDesc | skillType | userMember |
        | caring      | caring      | Caring    | WKR        |

      @test2 @requestAChange
      Scenario: Create Place if not exist   
        Given I'm in "Places" Page
        When I create new Place if not exist
          | placeName  | placeAddress                                        |
          | Automation | Victoria Road, Denistone West, NSW, 2114, Australia |

      @test2
      Scenario: Create App Client Service type successfully
        Given I'm in Edit Company Page
        When I create new App Client Service Type
          | serviceName               | serviceType      | serviceInstruction               |
          | Buy Something             | Input Notes      | Let us know what you need to buy |
          | Request A Call            | Input Notes      | How can we help?                 |
          | Request a Schedule Change | Schedule Change  |                                  |

      @TestCaseKey=CPT-T132 @testIssue
      Scenario: Verify client can request buy some thing successfully
        Given I make a request something in mobile application
          | serviceName    | serviceType | note               |
          | Buy Something  | Input Notes | Test buy something |
        And I login with "Global Admin" role
        And I'm in "Actions" Page
        Then New action requested from client is presented in action page
          | serviceType    | status |
          | Buy Something  | To Do  |

      @TestCaseKey=CPT-T133 @testIssue
      Scenario: Verify client can request a call successfully
        Given I make a request something in mobile application
          | serviceName     | serviceType | note                |
          | Request A Call  | Input Notes | Test request a call |
        And I login with "Global Admin" role
        And I'm in "Actions" Page
        Then New action requested from client is presented in action page
          | serviceType    | status |
          | Request A Call | To Do  |

      @test2 @requestAChange
      Scenario: Verify data from external platform is imported successfully
        Given I login with "Hayylo Admin" role
        When I upload external request in company page
        | clientName  | workerName  | serviceName | serviceNameFriendLy | scheduleDuration | importStatus | skillId |
        |             |             | caring      | caring              | 30               |  NEW         | 21      |

      @TestCaseKey=CPT-T134 @test2 @requestAChange
      Scenario: Verify client can request a schedule change
        When I make a request something in mobile application
          | serviceName               | serviceType     | note | workerName | serviceDate |
          | Request a Schedule Change | Schedule Change |      |            |             |
        And I login with "Global Admin" role
        And I'm in "Actions" Page
        Then New action requested from client is presented in action page
          | serviceType      | status |
          | Change           | To Do  |


