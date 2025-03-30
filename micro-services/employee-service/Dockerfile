FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/employee-service-*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]