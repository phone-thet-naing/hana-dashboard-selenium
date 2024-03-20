# You have to provide the interview id and the id of CA to perform CA review

Feature: Making CA Review

  Scenario Outline: Making specific ca review
    Given I am on CA Login for <interviewId> and <caId>
    Then I create CA Assessment

  Examples:
      | interviewId                           | caId  |
      # | d3cd84ef-af17-4242-a7b3-d33af3028589  | 479   |
      | 277e762a-b575-4350-bef6-6fae179b9bb4  | 479   |
      | 264096bc-4b02-4716-9547-82535000662a  | 479   |
