#!/usr/bin/env bash
# =============================================================================
# COMUNIDADE TECH — SCRIPT DE INICIALIZAÇÃO DE DESENVOLVIMENTO (LIVE RELOAD)
# =============================================================================

set -e

echo "=========================================================="
echo "🚀 INICIANDO ECOSSISTEMA COMPLETO — COMUNIDADE TECH"
echo "=========================================================="

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 1. Subir Banco de Dados e Adminer via Docker
echo "📦 [1/3] Subindo PostgreSQL 16 e Adminer no Docker..."
docker compose up -d db adminer

# Função de limpeza ao encerrar com Ctrl+C
cleanup() {
    echo ""
    echo "🛑 Encerrando serviços locais..."
    kill $(jobs -p) 2>/dev/null || true
    echo "✅ Ambiente finalizado."
    exit 0
}
trap cleanup SIGINT SIGTERM EXIT

# 2. Iniciar API Backend (Spring Boot 3 / Java 21)
echo "☕ [2/3] Iniciando API Backend (Spring Boot 3 / Java 21)..."
(cd "$ROOT_DIR/backend" && ./mvnw spring-boot:run) &
BACKEND_PID=$!

# Aguardar 5 segundos para a API iniciar
sleep 4

# 3. Iniciar Frontend (Angular 21)
echo "🅰️  [3/3] Iniciando Frontend Angular 21 (Live Reload)..."
echo "🌐 Frontend: http://localhost:4200"
echo "🌐 API Swagger: http://localhost:8080/swagger-ui.html"
echo "🌐 Adminer: http://localhost:8085"
echo "----------------------------------------------------------"
(cd "$ROOT_DIR/frontend" && npm start) &
FRONTEND_PID=$!

# Manter o processo vivo aguardando os dois jobs
wait $BACKEND_PID $FRONTEND_PID
