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
        DOCKER_IMAGE = 'playwright-cucumber-tests'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {

                bat '''
                    echo ========================================
                    echo BUILDING PLAYWRIGHT DOCKER IMAGE
                    echo ========================================

                    docker build -t %DOCKER_IMAGE% .

                    echo.
                    echo Docker image built successfully.
                    echo ========================================
                '''
            }
        }

        stage('Docker Test') {
    steps {
        bat 'docker version'
        bat 'docker images playwright-cucumber-tests'
    }
}
        stage('Prepare Allure Directories') {
            steps {

                bat '''
                    if exist allure-results rmdir /s /q allure-results
                    if exist allure-results-chromium rmdir /s /q allure-results-chromium
                    if exist allure-results-firefox rmdir /s /q allure-results-firefox
                    if exist allure-results-webkit rmdir /s /q allure-results-webkit

                    mkdir allure-results
                    mkdir allure-results-chromium
                    mkdir allure-results-firefox
                    mkdir allure-results-webkit
                '''
            }
        }

       /* stage('Node Version') {
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

    stage('Generate Features') {
    steps {
        bat '''
            echo ========================================
            echo GENERATING FEATURE FILES
            echo ========================================

            npm run generate-feature

            echo.
            echo ========================================
            echo FEATURE GENERATION COMPLETED
            echo ========================================
        '''
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
}*/
        stage('Run Chromium') {

            when {
                expression {
                    params.BROWSER == 'chromium' ||
                    params.BROWSER == 'all'
                }
            }

            steps {

        echo '========================================'
        echo 'Running Chromium in Docker'
        echo "Tag: ${params.TAG}"
        echo "Headless: ${params.HEADLESS}"
        echo '========================================'

        bat '''
            if exist allure-results rmdir /s /q allure-results
            mkdir allure-results
        '''

        catchError(
            buildResult: 'FAILURE',
            stageResult: 'FAILURE'
        ) {

            bat """
                docker run --rm ^
                  --name playwright-cucumber-chromium ^
                  -e CI=true ^
                  -e BROWSER=chromium ^
                  -e HEADLESS=${params.HEADLESS} ^
                  -e TAG=${params.TAG} ^
                  -v "%WORKSPACE%\\allure-results:/docker-output" ^
                  playwright-cucumber-tests
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
        echo 'Running Firefox in Docker'
        echo "Tag: ${params.TAG}"
        echo "Headless: ${params.HEADLESS}"
        echo '========================================'

        catchError(
            buildResult: 'FAILURE',
            stageResult: 'FAILURE'
        ) {

            bat """
                docker run --rm ^
                  --name playwright-cucumber-firefox ^
                  -e CI=true ^
                  -e BROWSER=firefox ^
                  -e HEADLESS=${params.HEADLESS} ^
                  -e TAG=${params.TAG} ^
                  -v "%WORKSPACE%\\allure-results:/docker-output" ^
                  playwright-cucumber-tests
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
        echo 'Running WebKit in Docker'
        echo "Tag: ${params.TAG}"
        echo "Headless: ${params.HEADLESS}"
        echo '========================================'

        catchError(
            buildResult: 'FAILURE',
            stageResult: 'FAILURE'
        ) {

            bat """
                docker run --rm ^
                  --name playwright-cucumber-webkit ^
                  -e CI=true ^
                  -e BROWSER=webkit ^
                  -e HEADLESS=${params.HEADLESS} ^
                  -e TAG=${params.TAG} ^
                  -v "%WORKSPACE%\\allure-results:/docker-output" ^
                  playwright-cucumber-tests
            """
        }
    }
        }

        stage('Merge Allure Results') {

            steps {

                bat '''
                    echo ========================================
                    echo MERGING ALLURE RESULTS
                    echo ========================================

                    powershell -NoProfile -Command ^
                    "Copy-Item -Path '.\\allure-results-chromium\\*' -Destination '.\\allure-results' -Recurse -Force -ErrorAction SilentlyContinue"

                    powershell -NoProfile -Command ^
                    "Copy-Item -Path '.\\allure-results-firefox\\*' -Destination '.\\allure-results' -Recurse -Force -ErrorAction SilentlyContinue"

                    powershell -NoProfile -Command ^
                    "Copy-Item -Path '.\\allure-results-webkit\\*' -Destination '.\\allure-results' -Recurse -Force -ErrorAction SilentlyContinue"

                    echo.
                    echo Final Allure results:
                    dir allure-results

                    echo.
                    echo RESULT FILE COUNT:
                    powershell -NoProfile -Command ^
                    "(Get-ChildItem '.\\allure-results' -Filter '*-result.json' -ErrorAction SilentlyContinue).Count"

                    echo ========================================
                '''
            }
        }

        stage('Verify Allure Results') {
    steps {
        bat '''
                    echo ========================================
                    echo VERIFYING ALLURE RESULTS
                    echo ========================================

                    powershell -NoProfile -Command ^
                    "Get-ChildItem '.\\allure-results' -Filter '*-result.json' | ForEach-Object { $j = Get-Content $_.FullName -Raw | ConvertFrom-Json; Write-Host ('TEST: ' + $j.name); Write-Host ('HISTORY ID: ' + $j.historyId); Write-Host ('PARAMETERS: ' + $j.parameters.Count); Write-Host '' }"

                    echo ========================================
                '''
    }
}

        /*stage('Generate Allure Report') {

            steps {
                bat 'npm run allure'
            }
        }*/
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