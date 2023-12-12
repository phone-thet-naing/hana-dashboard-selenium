Feature: Reviewing a Specific Interview

  Scenario: Searching and Reviewing an Interview
    Given I am on login page
    When I login with <username> and <password>
    Then I should see Hana Finance title
    When I click on Interview Results tab
    Then I should see Interview Results heading
    When I search <clientName> in search box
    Then I should see result interview with <clientName>
    When I click on View button
    Then I should see Interview Result Details heading

    Examples: 
      | username | password | clientName |
      | chanmk   |      123 | Aye Su Min |
