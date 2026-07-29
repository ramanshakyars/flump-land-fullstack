pipeline {
    agent any

    environment {
        IMAGE_NAME = 'flumpland-app'
        CONTAINER_NAME = 'flumpland-app-container'
        APP_PORT = '9091'
        FRONTEND_DIST = 'flump-ui/dist/ui/browser'
        STATIC_DIR = 'API/src/main/resources/static'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test Backend') {
            steps {
                dir('API') {
                    sh 'chmod +x mvnw'
                    sh './mvnw test'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('flump-ui') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Package Combined Application') {
            steps {
                sh '''
                    rm -rf "${STATIC_DIR}"
                    mkdir -p "${STATIC_DIR}"
                    cp -R "${FRONTEND_DIST}/." "${STATIC_DIR}/"
                '''
                dir('API') {
                    sh './mvnw clean package -DskipTests'
                    sh 'ls -lh target'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('API') {
                    sh 'docker build -t ${IMAGE_NAME}:latest .'
                }
            }
        }

        stage('Deploy Combined Application') {
            steps {
                sh '''
                    docker rm -f "${CONTAINER_NAME}" || true
                    docker run -d \
                      --name "${CONTAINER_NAME}" \
                      --restart unless-stopped \
                      -p "${APP_PORT}:9091" \
                      "${IMAGE_NAME}:latest"
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    sleep 20
                    docker inspect --format='{{.State.Status}}' "${CONTAINER_NAME}" | grep -qx running
                '''
            }
        }
    }

    post {
        always {
            // These files are generated only to package the Angular app in the Spring Boot JAR.
            sh 'rm -rf "${STATIC_DIR}"'
        }
        success {
            echo 'Frontend and backend deployed successfully at http://<jenkins-host>:9091'
        }
        failure {
            echo 'Combined frontend/backend deployment failed. See the stage logs above.'
        }
    }
}
