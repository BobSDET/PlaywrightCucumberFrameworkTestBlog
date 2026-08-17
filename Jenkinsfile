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

        stage('Run Tests') {
            steps {
                script {

                    catchError(
                        buildResult: 'FAILURE',
                        stageResult: 'FAILURE'
                    ) {

                        bat """
                            echo ========================================
                            echo Browser: %BROWSER%
                            echo Tag: %TAG%
                            echo Headless: %HEADLESS%
                            echo ========================================

                            if(params.BROWSER == 'all')
                            {
                             echo 'Running tests on ALL browsers'
                                bat """
                    npx cross-env BROWSER=chromium HEADLESS=${params.HEADLESS} cucumber-js --config cucumber.js --tags "@${params.TAG} and not @api"
                """

                bat """
                    npx cross-env BROWSER=firefox HEADLESS=${params.HEADLESS} cucumber-js --config cucumber.js --tags "@${params.TAG} and not @api"
                """

                bat """
                    npx cross-env BROWSER=webkit HEADLESS=${params.HEADLESS} cucumber-js --config cucumber.js --tags "@${params.TAG} and not @api"
                """
                            }

                            npx cross-env BROWSER=%BROWSER% HEADLESS=%HEADLESS% TAG=%TAG% ts-node src/scripts/RetryRunner.ts
                        """
                    }
                    else
                    {
                        echo "Running tests on ${params.BROWSER}"

                bat """
                    npx cross-env BROWSER=${params.BROWSER} HEADLESS=${params.HEADLESS} cucumber-js --config cucumber.js --tags "@${params.TAG} and not @api"
                """
                    }
                }
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