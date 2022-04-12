Feature: Social Feed

      @TestCaseKey=CPT-T125
      Scenario: Verify when user post a feed to Workers
        Given I login with "Global Admin" role
        And I login in mobile app with "Worker" role
        And I'm in "Social Feed" Page
        When I post a topic on social feed in text box as Post a company
          | title           | postToGroup  | postAs  | image | video | postTo |
          | Post to Workers | Workers      | company |       |       |        |
        Then The post has to be displayed on the feed of "Global Admin"
          | title            | postAs  |
          | Post to Workers  | company |
        Then The post has to be displayed on the 'Worker' mobile Notification Page
        Then The post has to be displayed on the mobile Feed page
          | title            | postTo  |
          | Post to Workers  | Workers |        

      @TestCaseKey=CPT-T128
      Scenario: Verify when web user post to GROUP that worker is assigned
        Given I login with "Global Admin" role
        And I'm in "Social Feed" Page
        When I post a topic on social feed in text box as Post a company
          | title                 | postToGroup  | postAs  | image | video | postTo |
          | Post as Default Group | Default      | company |       |       |        | 
        Then The post has to be displayed on the 'Worker' mobile Notification Page
        Then The post has to be displayed on the mobile Feed page
          | title                 | postTo  |
          | Post as Default Group | Default | 

      @TestCaseKey=CPT-T126 
      Scenario: Verify when user post a feed to Customers
        Given I login with "Global Admin" role
        And I login in mobile app with "Client" role
        And I'm in "Social Feed" Page
        When I post a topic on social feed in text box as Post a company
          | title             | postToGroup  | postAs  | image | video | postTo |
          | Post to Customers | Customers    | company |       |       |        |
        Then The post has to be displayed on the feed of "Global Admin"
          | title             | postAs  |
          | Post to Customers | company |
        Then The post has to be displayed on the 'Client' mobile Notification Page
        Then The post has to be displayed on the mobile Feed page
          | title             | postTo    |
          | Post to Customers | Customers |                 

      @TestCaseKey=CPT-T127
      Scenario: Verify when web user post to GROUP that client is assigned
        Given I login with "Global Admin" role
        And I'm in "Social Feed" Page
        When I post a topic on social feed in text box as Post a company
          | title                  | postToGroup  | postAs  | image | video | postTo |
          | Post to Default Group  | Default      | company |       |       |        |
        Then The post has to be displayed on the 'Client' mobile Notification Page
        Then The post has to be displayed on the mobile Feed page
          | title                  | postTo    |
          | Post to Default Group  | Default   | 

      @TestCaseKey=CPT-T130 @skip
      Scenario: Verify when worker post a feed to Family
        And I login in mobile app with "Worker" role
        When I post a topic on mobile feed as post to Family
          | title                      | team                 |
          | Post from Worker to Family | Health Team & Family |
        And I login in mobile app with "Family" role
        Then The post has to be displayed on the mobile Feed page
          | title                       | postTo               |
          | Post from Worker to Family  | Health Team & Family |        

      @TestCaseKey=CPT-T131 @skip
      Scenario: Verify when client post a feed to Family
        And I login in mobile app with "Client" role
        When I post a topic on mobile feed as post to Family
          | title                      | team   |
          | Post from Client to Family | Family |
        And I login in mobile app with "Family" role
        Then The post has to be displayed on the mobile Feed page
          | title                      | postTo  |
          | Post from Client to Family | Family  |   

      @TestCaseKey=CPT-T129
      Scenario: Verify to receive the push notification when customer is active on app
        Given I login with "Global Admin" role
        And I'm in "Social Feed" Page
        When I post a topic on social feed in text box as Post a company
          | title             | postToGroup    | postAs  | image | video | postTo |
          | Post to Customers | Customers      | company |       |       |        |
        Then Push notification is present in mobile device
        # And Notification is targed to feed
        #   | title             | postTo    |
        #   | Post to Customers | Customers |  