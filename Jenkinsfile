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

    stage('Verify Generated Features') {
    steps {
        bat '''
            echo ========================================
            echo VERIFYING GENERATED FEATURES
            echo ========================================

            echo.
            echo Current directory:
            cd

            echo.
            echo Generated-features folder:
            dir generated-features

            echo.
            echo Feature files:
            dir generated-features\\*.feature

            echo.
            echo FEATURE FILE COUNT:
            powershell -Command "(Get-ChildItem .\\generated-features -Filter *.feature -ErrorAction SilentlyContinue).Count"

            echo.
            echo FEATURE CONTENT:
            powershell -Command "Get-ChildItem .\\generated-features -Filter *.feature -ErrorAction SilentlyContinue | ForEach-Object { Write-Host ('===== ' + $_.FullName + ' ====='); Get-Content $_.FullName }"

            echo.
            echo ========================================
            echo END GENERATED FEATURE VERIFICATION
            echo ========================================
        '''
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
            echo VERIFYING ALLURE RESULTS
            echo ========================================

            echo.
            echo Contents of allure-results:
            dir allure-results

            echo.
            echo Result JSON files:
            dir allure-results\\*-result.json

            echo.
            echo RESULT FILE COUNT:
            powershell -Command "(Get-ChildItem .\\allure-results -Filter *-result.json).Count"

            echo.
            echo TEST NAMES:
            powershell -Command "Get-ChildItem .\\allure-results -Filter *-result.json | ForEach-Object { $j = Get-Content $_.FullName -Raw | ConvertFrom-Json; Write-Host ('TEST: ' + $j.name); Write-Host ('HISTORY ID: ' + $j.historyId); Write-Host ('PARAMETERS: ' + $j.parameters.Count); Write-Host '' }"

            echo.
            echo ========================================
            echo END ALLURE VERIFICATION
            echo ========================================
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