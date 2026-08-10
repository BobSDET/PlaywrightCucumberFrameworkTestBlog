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
            choices: ['chromium', 'firefox', 'webkit'],
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

                npx cross-env BROWSER=%BROWSER% HEADLESS=%HEADLESS% cucumber-js --config cucumber.js --tags "@%TAG% and not @api"
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
            echo 'Allure report generation completed.'
        }

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