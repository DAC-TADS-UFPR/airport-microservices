
## Getting Started with micro services

1. Clone this repository on your local machine:
   ```sh
   git clone 'https://github.com/DAC-TADS-UFPR/airport-microservices.git'
   ```

2. Navigate to the project directory:
   ```sh
   cd airport-microservices/micro-services
   ```
3. Run the following command to build the project images:
   ```sh
   mvn clean install -DskipTests
   ```
   
4. Run the following command to run the images in docker and run the project:
   ```sh
   docker-compose up -d
   ```

5. To check running containers:
   ```sh
   docker ps
   ```
