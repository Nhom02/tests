Feature: Social Feed

      @TestCaseKey=CPT-T103
      Scenario: Verify to shown the user name of user when Global admin post as company
        Given I login with "Global Admin" role
        And I'm in "Social Feed" Page
        When I post a topic on social feed in text box as Post a company
          | title           | postToGroup  | postAs  | image | video | postTo |
          | Post as company | Everyone     | company |       |       |        |
        Then New posted topic should be shown as "company"

      @TestCaseKey=CPT-T104
      Scenario: Verify to shown the user name of user when Global admin post as user
        Given I login with "Global Admin" role
        And I'm in "Social Feed" Page
        When I post a topic on social feed in text box as Post a user
          | title        | postToGroup  | postAs  | image | video | postTo |
          | Post as user | Everyone     | user    |       |       |        |
        Then New posted topic should be shown as "user"

      @TestCaseKey=CPT-T105
      Scenario: Verify when user post a feed to Everyone
        Given I login with "Global Admin" role
        And I'm in "Social Feed" Page
        When I post a topic on social feed in text box as Post a user
          | title            | postToGroup  | postAs  | image | video | postTo |
          | Post to Everyone | Everyone     | user    |       |       |        |
        Then The post has to be displayed on the feed of "Global Admin"
          | title            | postAs  |
          | Post to Everyone | user    |       
        And The post has to be displayed on the feed of "Company Admin"
          | title            | postAs  |
          | Post to Everyone | user    | 

      @TestCaseKey=CPT-T106
      Scenario: Verify when user post a feed to Managers
        Given I login with "Global Admin" role
        And I'm in "Social Feed" Page
        When I post a topic on social feed in text box as Post a user
          | title           | postToGroup  | postAs  | image | video | postTo |
          | Post to Manager | Managers     | user    |       |       |        |
        Then The post has to be displayed on the feed of "Global Admin"
          | title           | postAs  |
          | Post to Manager | user    |       
        And The post has to be displayed on the feed of "Manager"
          | title           | postAs  |
          | Post to Manager | user    |

      @TestCaseKey=CPT-T107
      Scenario: Verify user post for Customers successfully by company role when post an image
        Given I login with "Global Admin" role
        And I'm in "Social Feed" Page
        When I post a topic on social feed in text box including image
          | title            | postToGroup   | postAs  | image            | video | postTo |
          | Post to Customer | Customers     | company | attachment_1.png |       |        |
        Then The post has to be displayed on the feed of "Global Admin"
          | title            | postAs  |
          | Post to Customer | company |
        And The image uploaded has to be displayed on the feed

      @TestCaseKey=CPT-T109
      Scenario: Verify user post for Customers successfully by company role when post an video
        Given I login with "Global Admin" role
        And I'm in "Social Feed" Page
        When I post a topic on social feed in text box including video
          | title             | postToGroup   | postAs  | image | video            | postTo |
          | Post to Customer  | Customers     | company |       |  SampleVideo.mp4 |        |
        Then The post has to be displayed on the feed
          | title             | postAs  |
          | Post to Customer  | company |
        And The video uploaded has to be displayed on the feed
    
      @TestCaseKey=CPT-T108
      Scenario: Verify user post for Customers successfully by company role when input a text
        Given I login with "Global Admin" role
        And I'm in "Social Feed" Page
        When I post a topic on social feed in text box
          | title             | postToGroup   | postAs  | image | video | postTo |
          | Post to Customer  | Customers     | company |       |       |        |
        Then The post has to be displayed on the feed
          | title             | postAs  |
          | Post to Customer  | company |