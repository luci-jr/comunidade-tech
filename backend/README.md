# ☕ Comunidade Tech — Backend API (Java 21 LTS + Spring Boot 3)

[![Java](https://img.shields.io/badge/Java-21%20LTS-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/projects/jdk/21/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Swagger](https://img.shields.io/badge/OpenAPI-Swagger%20UI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](http://localhost:8080/swagger-ui.html)

API RESTful corporativa de alta performance desenvolvida para gerenciar o **Mural dos Devs**, **Gamificação das Trilhas de Estudo** e **Indicações da Comunidade** da plataforma [Comunidade Tech](https://comunidade.tech.lucivaldo.cloud).

---

## 🏛️ Arquitetura e Decisões de Engenharia

- **Java 21 LTS & Virtual Threads (Project Loom):** Concorrência escalável de alta taxa de I/O ativada nativamente via `spring.threads.virtual.enabled=true`.
- **DTOs Imutáveis com Java Records:** Todos os contratos de Request e Response utilizam `record` com validação estrita (Jakarta Bean Validation).
- **Tratamento Global de Erros (RFC 7807):** `@RestControllerAdvice` padronizando respostas em *Problem Details*.
- **Spring Data JPA & Governança de Índices:** Mapeamento relacional com índices em colunas estratégicas (`categoria`, `data_criacao`).
- **OpenAPI 3 / Swagger Integrado:** Documentação interativa em `/swagger-ui.html`.
- **Multi-Environment Ready:** Banco H2 em memória para testes imediatos sem dependências e perfil `prod` configurado para PostgreSQL.

---

## 🚀 Como Executar Localmente

### Opção 1: Via Maven Wrapper (Banco H2 em memória)
```bash
./mvnw spring-boot:run
```
* **Swagger UI:** `http://localhost:8080/swagger-ui.html`
* **H2 Console:** `http://localhost:8080/h2-console` *(JDBC URL: `jdbc:h2:mem:comunidadedb`)*

### Opção 2: Via Docker Compose (Spring Boot + PostgreSQL 16)
```bash
docker compose up -d --build
```

---

## 🧪 Executando os Testes Automatizados

```bash
./mvnw clean test
```
* Suíte de testes unitários com **JUnit 5**, **Mockito** e **AssertJ**.

---

## 📍 Endpoints Principais

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/v1/mural` | Listar recados (suporta filtro por `categoria` e paginação) |
| `POST` | `/api/v1/mural` | Publicar nova mensagem de dev autenticado |
| `PATCH`| `/api/v1/mural/{id}/curtir` | Incrementar curtida em mensagem |
| `GET` | `/api/v1/trilhas/{slug}/progresso` | Obter porcentagem e tópicos concluídos |
| `POST`| `/api/v1/trilhas/{slug}/progresso` | Alternar status de conclusão de tópico |
| `GET` | `/api/v1/sugestoes` | Listar indicações enviadas pela comunidade |
| `POST`| `/api/v1/sugestoes` | Submeter nova sugestão de plataforma |
