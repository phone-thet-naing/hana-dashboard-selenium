# You have to provide the interview id and the id of CA to perform CA review

Feature: Making CA Review

  Scenario Outline: Making specific ca review
    Given I am on CA Login for <interviewId> and <caId>
    Then I create CA Assessment

  Examples:
      | interviewId                           | caId  |
      | b8cf1acb-c9c9-49f2-a0a5-538512a3f5e9  | 479   |
      # | bc4d2e6b-f026-4f8b-98d8-201a81ba98a5  | 479   |
      # | d6ee96b0-ecb7-440b-a6c8-a9b37fc6cea2  | 479   |
      # | 551d0e69-c489-4035-86f1-29ef581a6e72  | 479   |
