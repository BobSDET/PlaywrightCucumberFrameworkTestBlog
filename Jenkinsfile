pipeline {

    agent any

    parameters {

        choice(
            name: 'TAG',
            choices: ['Smoke', 'Regression', 'Sanity'],
            description: 'Select the test suite to execute'
        )

        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit', 'all'],
            description: 'Select the browser'
        )

        booleanParam(
            name: 'HEADLESS',
            defaultValue: true,
            description: 'Run browser in headless mode'
        )
    }

    environment {
        CI = 'true'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Node Version') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Clean Reports') {
            steps {
                bat 'npm run clean'
            }
        }

        stage('Run Chromium') {

            when {
                expression {
                    params.BROWSER == 'chromium' ||
                    params.BROWSER == 'all'
                }
            }

            steps {

                echo '========================================'
                echo 'Running Chromium'
                echo "Tag: ${params.TAG}"
                echo "Headless: ${params.HEADLESS}"
                echo '========================================'

                catchError(
                    buildResult: 'FAILURE',
                    stageResult: 'FAILURE'
                ) {

                    bat """
                        npx cross-env ^
                        BROWSER=chromium ^
                        HEADLESS=${params.HEADLESS} ^
                        TAG=${params.TAG} ^
                        ts-node src/scripts/RetryRunner.ts
                    """
                }
            }
        }

        stage('Run Firefox') {

            when {
                expression {
                    params.BROWSER == 'firefox' ||
                    params.BROWSER == 'all'
                }
            }

            steps {

                echo '========================================'
                echo 'Running Firefox'
                echo "Tag: ${params.TAG}"
                echo "Headless: ${params.HEADLESS}"
                echo '========================================'

                catchError(
                    buildResult: 'FAILURE',
                    stageResult: 'FAILURE'
                ) {

                    bat """
                        npx cross-env ^
                        BROWSER=firefox ^
                        HEADLESS=${params.HEADLESS} ^
                        TAG=${params.TAG} ^
                        ts-node src/scripts/RetryRunner.ts
                    """
                }
            }
        }

        stage('Run WebKit') {

            when {
                expression {
                    params.BROWSER == 'webkit' ||
                    params.BROWSER == 'all'
                }
            }

            steps {

                echo '========================================'
                echo 'Running WebKit'
                echo "Tag: ${params.TAG}"
                echo "Headless: ${params.HEADLESS}"
                echo '========================================'

                catchError(
                    buildResult: 'FAILURE',
                    stageResult: 'FAILURE'
                ) {

                    bat """
                        npx cross-env ^
                        BROWSER=webkit ^
                        HEADLESS=${params.HEADLESS} ^
                        TAG=${params.TAG} ^
                        ts-node src/scripts/RetryRunner.ts
                    """
                }
            }
        }

        stage('Verify Allure Results') {

            steps {

                bat '''
                    echo ========================================
                    echo ALLURE RESULTS
                    echo ========================================

                    dir allure-results

                    echo.
                    echo RESULT FILE COUNT:

                    powershell -Command "(Get-ChildItem allure-results -Filter *-result.json).Count"

                    echo.
                    echo TEST RESULTS:

                    powershell -Command ^
                    "Get-ChildItem allure-results -Filter *-result.json | ForEach-Object { ^
                        $j = Get-Content $_.FullName -Raw | ConvertFrom-Json; ^
                        Write-Host '----------------------------------------'; ^
                        Write-Host ('TEST: ' + $j.name); ^
                        Write-Host ('TEST CASE ID: ' + $j.testCaseId); ^
                        Write-Host ('HISTORY ID: ' + $j.historyId); ^
                        Write-Host ('PARAMETER COUNT: ' + $j.parameters.Count); ^
                        if ($j.parameters.Count -gt 0) { ^
                            $j.parameters | ForEach-Object { ^
                                Write-Host ('PARAMETER: ' + $_.name + ' = ' + $_.value) ^
                            } ^
                        } ^
                    }"
                '''
            }
        }

        stage('Generate Allure Report') {

            steps {
                bat 'npm run allure'
            }
        }
    }

    post {

        always {

            echo '========================================'
            echo 'PIPELINE EXECUTION COMPLETED'
            echo '========================================'

            allure([
                includeProperties: false,
                jdk: '',
                results: [
                    [path: 'allure-results']
                ]
            ])
        }

        success {
            echo 'ALL TEST EXECUTIONS PASSED'
        }

        failure {
            echo 'ONE OR MORE TEST EXECUTIONS FAILED'
            echo 'CHECK THE INDIVIDUAL BROWSER STAGES AND ALLURE REPORT'
        }
    }
}