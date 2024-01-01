Feature: Automating Database

  Scenario: Inserting data
    Given I have logged into database
    And I insert call center queries: <interviewList>
    Then I should see success message for Query Insert

    Examples: 
      | interviewList                                                                |
      | [adb6c7aa-d97a-4591-9d92-a9dcaed86c23, d115cbc2-ae9a-469e-bbd0-aae313b85a9f] |

      # Format: [<id1>, <id2>]
