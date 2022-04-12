Feature: Social Feed

      @test
      Scenario: Delete client contact if existed
        Given I login with "Global Admin" role
        And I'm in "Clients" Page
        When I delete contact for client if exised
        | firstName  | lastName | mobilePhone |
        | Automation | Test     | 0999999711  |

      @TestCaseKey=CPT-T135 @test
      Scenario: Verify client invite people successfully
        And I login in mobile app with "Client" role
        When I invite new people on mobile
        | firstName  | lastName | mobilePhone |
        | Automation | Test     | 0999999711  |
        And I'm in "Clients" Page
        Then New peple is added into default client contact
        | firstName  | lastName | mobilePhone |
        | Automation | Test     | 0999999711  |           

      @test
      Scenario: Delete client contact if existed
        Given I login with "Global Admin" role
        And I'm in "Clients" Page
        When I delete contact for client if exised
        | firstName  | lastName | mobilePhone |
        | Automation | Test     | 0999999711  |