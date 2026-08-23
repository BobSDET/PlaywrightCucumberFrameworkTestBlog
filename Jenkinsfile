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