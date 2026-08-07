pipeline {

    agent any

    parameters {
        choice(
            name: 'TAG',
            choices: ['smoke', 'regression', 'sanity'],
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

                    echo "======================================"
                    echo "Tag : %TAG%"
                    echo "Browser   : %BROWSER%"
                     echo "Headless: %HEADLESS%"
                    echo "======================================"

                    bat """
            npx cross-env BROWSER=%BROWSER% HEADLESS=%HEADLESS% cucumber-js --config cucumber.js --tags "@%TAG% and not @api"
        """
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }

        success {
            echo 'TEST EXECUTION PASSED'
        }

        failure {
            echo 'TEST EXECUTION FAILED'
        }
    }
}