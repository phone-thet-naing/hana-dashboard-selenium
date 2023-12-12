Feature: Reviewing a Specific Interview

  Scenario: Searching and Reviewing an Interview
    Given I have successfully logged in with <username> and <password>
    When I navigate to Interview Results tab
    When I search <clientName> in search box
    Then I should see a list of interviews
    When I click on View button
    Then I should see Interview Result Details heading

    Examples: 
      | username | password | clientName |
      | chanmk   |      123 | Aye Su Min |
