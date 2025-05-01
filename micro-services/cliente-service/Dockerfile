FROM eclipse-temurin:21-jdk-alpine as builder
WORKDIR /workspace/app
COPY . .
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY target/cliente-service-*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

