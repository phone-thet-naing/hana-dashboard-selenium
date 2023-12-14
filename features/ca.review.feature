Feature: Making CA Review

    Scenario: Making CA Review on the Top Most Interview Found Filtered by Interview Status 'pending'
        Given I have successfully logged in with <username> and <password>
        When I navigate to Interview Results tab
        And I filter interviews with interview status pending
        Then I should see a list of interviews
        When I click on View button
        # Then I should see Interview Result Details heading
        Then I should be navigated to Interview Detail
        When I click on View CA Assessment credentials: <username> <password>
        And I choose View Assessment option
        Then the CA Review Form should appear
        And I fill ca review form
        Then I should see the success message: CA assessment create/update successfully.

        Examples: 
        | username | password | clientName |
        | chanmk   |      123 | Naing Si   |