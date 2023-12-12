Feature: General Test

    Scenario: When I Test
        Given I have successfully logged in with <username> and <password>
        When I navigate to Interview Results tab
        And I filter interviews with interview status <interviewStatus>
        Then I should see a list of interviews
        And The interview status should be <interviewStatus>

        Examples:
        | username | password | clientName | interviewStatus |
        | chanmk   | 123      | Naing Si   | pending         |