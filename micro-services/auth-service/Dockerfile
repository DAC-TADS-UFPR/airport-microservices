FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/auth-service-*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]