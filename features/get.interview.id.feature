Feature: Getting Interview IDs from Database

  Scenario Outline: Getting Interview IDs with Ngasaya Name as Parameter
    Given I have logged into database
    And I have passed <ngasayaName> as Parameter
    Then I should get the interview ids back

    Examples:
        | ngasayaName                   |
        | G0171525020THPU_0000000001    |



        