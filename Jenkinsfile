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
            defaultValue: false,
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

        stage('Run Tests') {
    steps {
        script {

            echo '========================================'
            echo "Browser: ${params.BROWSER}"
            echo "Tag: ${params.TAG}"
            echo "Headless: ${params.HEADLESS}"
            echo '========================================'

            catchError(
                buildResult: 'FAILURE',
                stageResult: 'FAILURE'
            ) {

                if (params.BROWSER == 'all') {

                    echo 'Running tests on ALL browsers'

                    bat """
                        echo ========================================
                        echo Running Chromium
                        echo ========================================

                        npx cross-env BROWSER=chromium HEADLESS=${params.HEADLESS} TAG=${params.TAG} ts-node src/scripts/RetryRunner.ts
                    """

                    bat """
                        echo ========================================
                        echo Running Firefox
                        echo ========================================

                        npx cross-env BROWSER=firefox HEADLESS=${params.HEADLESS} TAG=${params.TAG} ts-node src/scripts/RetryRunner.ts
                    """

                    bat """
                        echo ========================================
                        echo Running WebKit
                        echo ========================================

                        npx cross-env BROWSER=webkit HEADLESS=${params.HEADLESS} TAG=${params.TAG} ts-node src/scripts/RetryRunner.ts
                    """

                } else {

                    echo "Running tests on ${params.BROWSER}"

                    bat """
                        echo ========================================
                        echo Running ${params.BROWSER}
                        echo Tag: ${params.TAG}
                        echo Headless: ${params.HEADLESS}
                        echo ========================================

                        npx cross-env BROWSER=${params.BROWSER} HEADLESS=${params.HEADLESS} TAG=${params.TAG} ts-node src/scripts/RetryRunner.ts
                    """
                }
            }
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
            powershell -Command "Get-ChildItem allure-results -Filter *-result.json | ForEach-Object { Write-Host '---' $_.Name; Get-Content $_.FullName | Select-String '\"name\"|\"historyId\"|\"parameters\"' }"
            echo.
            echo RESULT FILE COUNT:
            powershell -Command "(Get-ChildItem allure-results -Filter *.json).Count"
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

            echo 'Pipeline execution completed.'

            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])
        }

        success {
            echo 'TEST EXECUTION PASSED'
        }

        failure {
            echo 'TEST EXECUTION FAILED'
        }
    }
}