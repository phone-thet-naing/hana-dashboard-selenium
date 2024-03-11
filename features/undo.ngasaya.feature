Feature: Making Undo NgaSaYa

  Scenario: Making Undo NgaSaYa on the Top Most Interview Found Filtered by Interview Status 'pending'
    Given I have successfully logged in with <username> and <password>
    When I navigate to Interview Results tab
    And I set interview status to pending
    And I set FO to hnineel
    And I filter
    Then I should see a list of interviews
    When I click on View button
    # Then I should see Interview Result Details heading
    Then I should be navigated to Interview Detail
    When I click on View CA Assessment credentials: <username> <password> 
    # Then I should see Feedback To FO option 
    Then I should be navigated to CA Dashboard
    And I choose Undo Ngasaya option
    Then I should see a success alert

    Examples: 
      | username | password | clientName |
      | chanmk   | train    | Naing Si   |