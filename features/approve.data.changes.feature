Feature: Approve Data Changes

  Scenario Outline: Approve Data Changes in Interview Client
    Given I am on <interviewClientId> details
    Then I approve data changes

  Examples:
      | interviewClientId                           | caId  |
    #   | d39a73d1-6d0b-4420-ab75-f90a70dbdda4  | 479   |
      | 8f9a3eba-5e9b-47b0-8450-cd553d3f2fc0  | 479   |
      | 304a5aa3-f5d7-4d1c-9047-9c5902ec585f  | 479   |