Feature: Making CA Review 

    Scenario: Approving Group Interviews Filtered with NgaSaYa Name 
        Given I have successfully logged in with <username> and <password>
        When I navigate to Interview Results tab
        And I search <ngaSaYaName> in search box
        And I approve multiple interviews: CAC credentials <username>, <password>

        Examples: 
        | username | password | clientName | ngaSaYaName                |
        | cac      | hana123  | Naing Si   | G0087024919THPU_0000000001 |