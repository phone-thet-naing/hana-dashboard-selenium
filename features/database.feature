Feature: Automating Database

  Scenario: Inserting data
    Given I have logged into database
    And I insrt call center queries: <interviewList>

    Examples: 
      | interviewList                                                                |
      | [52d1cca6-abbb-440d-8181-0d36bb6eed83, 988adb9d-db12-4e18-bb08-3d416880dd39] |
