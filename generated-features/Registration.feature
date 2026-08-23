Feature: Registration Form

  Scenario Outline: Fill registration form - <TestCaseId>

    Given User launches the Test Automation Practice application

    When User fills registration form using "<TestCaseId>"

    Then Registration details should be entered successfully
    
    essfully

    Examples:
      | TestCaseId |
      | TC001      |
      | TC002      |
      | TC003      |