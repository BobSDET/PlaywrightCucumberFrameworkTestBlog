pipeline {

    agent any

    parameters {
        choice(
            name: 'TEST_TYPE',
            choices: ['smoke', 'regression', 'sanity'],
            description: 'Select the test suite to execute'
        )

        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Select the browser'
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
                    echo "TEST TYPE : ${params.TEST_TYPE}"
                    echo "BROWSER   : ${params.BROWSER}"
                     echo "CI      : ${env.CI}"
                    echo "======================================"

                    if (params.TEST_TYPE == 'smoke') {

                        bat "npx cross-env BROWSER=${params.BROWSER} cucumber-js --config cucumber.js --tags \"@Smoke and not @api\""

                    } else if (params.TEST_TYPE == 'regression') {

                        bat "npx cross-env BROWSER=${params.BROWSER} cucumber-js --config cucumber.js --tags \"@Regression and not @api\""

                    } else if (params.TEST_TYPE == 'sanity') {

                        bat "npx cross-env BROWSER=${params.BROWSER} cucumber-js --config cucumber.js --tags \"@Sanity and not @api\""
                    }
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