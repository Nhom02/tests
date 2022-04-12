Feature: Social Feed

      @test
      Scenario: Verify when worker post a feed to Family
        And I login in mobile app with "Worker" role
        When I post a topic on mobile feed as post to Family
          | title                      | team                 |
          | Post from Worker to Family | Health Team & Family |
        And I login in mobile app with "Family" role
        Then The post has to be displayed on the mobile Feed page
          | title                       | postTo               |
          | Post from Worker to Family  | Health Team & Family |        

      @test
      Scenario: Verify when client post a feed to Family
        And I login in mobile app with "Client" role
        When I post a topic on mobile feed as post to Family
          | title                      | team   |
          | Post from Client to Family | Family |
        And I login in mobile app with "Family" role
        Then The post has to be displayed on the mobile Feed page
          | title                      | postTo  |
          | Post from Client to Family | Family  |   