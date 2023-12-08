Feature: Hana OMS (Admin) Dashboard Login

  Scenario: Login with invalid credentials
    Given I am on login page
    When I login with InvalidUsername and InvalidPassword
    Then I should see the Bad credentials in Finflux warning

  Scenario: Login with valid credentials
    Given I am on login page
    When I login with dadmin and Hana123
    Then I should see Hana Finance title
