Feature: Loan Approve 

 Scenario Outline: Making specific loan approve 
    Given I am on loan approval page of <interviewId>
    Then I <option> loan with <amount>

    Examples:
        | interviewId                          | option  | amount |
        | a34f3e87-f53f-443f-9174-4d4f120fcfad | approve | 800000 |
        | 9a3f5596-c39e-44a9-bd36-c60f94b5e6f8 | approve | 800000 |  
        | 5e3b728a-17b9-497f-b1d9-a553fe4b0da7 | approve | 800000 |  