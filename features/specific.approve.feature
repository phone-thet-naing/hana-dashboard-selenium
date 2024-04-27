Feature: Loan Approve 

 Scenario Outline: Making specific loan approve 
    Given I am on loan approval page of <interviewId>
    When I approve the loan

    Examples:
        | interviewId                          |
        | 684a7b35-84b2-40a3-8e8c-c695a8da9a94 | 
        | bbe208ca-18f7-4fa7-99cb-b9db712ba748 | 
        | b0a087be-1021-4ad3-b53d-5f6d812b77c0 | 
        # | 531039ea-d60f-491e-b367-823ac4605fc5 | // example loan