pipeline {

    agent any
    parameters {
    choice(
        name: 'SUITE',
        choices: [
            'smoke',
            'regression',
            'sanity',
            'api'
        ],
        description: 'Select Test Suite'
    )
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
        bat "npm run ${params.SUITE}"
    }
    }

    }

}