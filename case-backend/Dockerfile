# Use a builder image with Gradle
FROM gradle:8.8.0-jdk21 AS builder
WORKDIR /app
COPY . .
RUN gradle bootJar --no-daemon

# Runtime image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
