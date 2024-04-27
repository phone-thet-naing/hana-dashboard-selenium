# You have to provide the interview id and the id of CA to perform CA review

Feature: Making CA Review

  Scenario Outline: Making specific ca review
    Given I am on CA Login for <interviewId> and <caId>
    Then I create CA Assessment

  Examples:
      | interviewId                           | caId  |
      | 684a7b35-84b2-40a3-8e8c-c695a8da9a94  | 479   |
      | bbe208ca-18f7-4fa7-99cb-b9db712ba748  | 479   |
      | b0a087be-1021-4ad3-b53d-5f6d812b77c0  | 479   |
      # | f3d12f3c-7d85-49bb-9476-229da37e0961  | 479   |
