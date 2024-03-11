Feature: Automating Database

  Scenario: Inserting data
    Given I have logged into database
    And I insert call center queries: <interviewList>
    Then I should see success message for Query Insert

    Examples: 
      | interviewList                                                                |
      | [72013b8a-e31b-40a7-a62a-b5d4d57dc8f8, 531039ea-d60f-491e-b367-823ac4605fc5, 1eb85a24-3319-4929-97ae-607d8bd37d32, a5e19e61-8152-4711-9960-43df607b1762] |

      # Format: [<id1>, <id2>]
