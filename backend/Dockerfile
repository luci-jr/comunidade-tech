# Stage 1: Build
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Copia dependências e wrappers
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline -B

# Copia código-fonte e compila pacote enxuto
COPY src/ src/
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime leve
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Usuário sem privilégios de root para segurança corporativa
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY --from=builder /app/target/comunidade-tech-api-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-XX:+UseG1GC", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
