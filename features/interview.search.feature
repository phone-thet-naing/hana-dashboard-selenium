Feature: Interview Searching

  Scenario: Searching for an Interview with Client Name
    Given I have successfully logged in with <username> and <password>
    When I click on Interview Results tab
    Then I should see Interview Results heading
    When I search <clientName> in search box
    Then I should see result interview with <clientName>

    Examples: 
      | username | password | clientName |
      | chanmk   |      123 | Aye Su Min |
