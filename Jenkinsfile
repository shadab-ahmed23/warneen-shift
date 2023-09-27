pipeline {
    agent any 
    stages{
        stage("code"){
            steps{
                echo "cloning the code"
                git url:"https://github.com/shadab-ahmed23/warneen-shift.git",branch:"master"
            }
        }
        stage("build"){
            steps{
                echo "building the code"
                sh "docker build -t my-veu-app ."
            }
        }
        stage("pushing image"){
            steps{
                echo "push the image"
                 withCredentials([usernamePassword(credentialsId:"DockerHub-ID",passwordVariable:"dockerHubPass",usernameVariable:"dockerHubUser")]){
                    sh "docker tag my-veu-app shadabahmed23/my-veu-app:latest"
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                     sh "docker push shadabahmed23/my-veu-app:latest"
                
            
            }
            }
        }
        stage("deploye image"){
            steps{
                echo "deploye the image"
                sh "docker-compose down && docker-compose up -d"
            
            }
            
        }
    }
}
