Feature: General Test

    Scenario: When I Test
        # Given I have successfully logged in with <username> and <password>
        # When I navigate to Interview Results tab
        # And I filter interviews with interview status <interviewStatus>
        # And The interview status should be <interviewStatus>
        # And I search <clientName> in search box
        # Then I should see a list of interviews
        # When I click on View button
        # Then I should see Interview Result Details heading
        When The test code runs

        Examples:
        | username | password | clientName | interviewStatus |
        | chanmk   | 123      | Naing Si   | pending         |