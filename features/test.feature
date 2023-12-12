Feature: General Test

    Scenario: When I Test
        Given I have successfully logged in with <username> and <password>
        When I navigate to Interview Results tab
        And I search <clientName> in search box
        Then I should see a list of interviews

        Examples:
        | username | password | clientName |
        | chanmk   | 123      | Naing Si   |  