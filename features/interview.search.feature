Feature: Interview Searching

  Scenario: Searching for an Interview with Loan Id 
    Given I am on login page
    When I login with dadmin and Hana123
    And I click on Interview Results tab
    Then I should see Interview Results label
    When I search 875096 in search box   
    Then I should see result interview with 875096 
