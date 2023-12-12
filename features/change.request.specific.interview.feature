Feature: Reviewing a Specific Interview

  Scenario: Searching and Reviewing an interview
    Given I have successfully logged in with <username> and <password>
    When I navigate to Interview Results tab
    And I search <clientName> in search box
    Then I should see result interview with <clientName>
    When I click on View button
    Then I should see Interview Result Details heading
    When I click on View CA Assessment credentials: <username> <password>
    # Then I should see Feedback To FO option 
    And I choose Feedback To FO option

    Examples: 
      | username | password | clientName |
      | chanmk   |      123 | Aye Su Min |
