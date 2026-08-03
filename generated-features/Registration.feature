Feature: Registration Form


@Smoke
Scenario: Fill registration form - TC001

Given User launches the Test Automation Practice application
When User fills registration form using "TC001"
Then Registration details should be entered successfully


@Regression
Scenario: Fill registration form - TC002

Given User launches the Test Automation Practice application
When User fills registration form using "TC002"
Then Registration details should be entered successfully


@Smoke @Regression
Scenario: Fill registration form - TC003

Given User launches the Test Automation Practice application
When User fills registration form using "TC003"
Then Registration details should be entered successfully

