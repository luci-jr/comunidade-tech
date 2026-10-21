-- =============================================================================
-- COMUNIDADE TECH — SCHEMA & SEED INICIAL (PostgreSQL 16+)
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabela: Mural dos Devs
CREATE TABLE IF NOT EXISTS mural_mensagens (
    id BIGSERIAL PRIMARY KEY,
    mensagem VARCHAR(400) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    autor_nome VARCHAR(100) NOT NULL,
    autor_foto VARCHAR(500),
    autor_uid VARCHAR(128) NOT NULL,
    curtidas INTEGER NOT NULL DEFAULT 0,
    data_criacao TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_mural_categoria ON mural_mensagens(categoria);
CREATE INDEX IF NOT EXISTS idx_mural_data_criacao ON mural_mensagens(data_criacao DESC);

-- 2. Tabela: Sugestões de Plataformas de Aprendizado
CREATE TABLE IF NOT EXISTS plataforma_sugestoes (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    url VARCHAR(350) NOT NULL,
    aprovada BOOLEAN NOT NULL DEFAULT TRUE,
    data_sugerida TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabela: Progresso de Trilhas (Gamificação)
CREATE TABLE IF NOT EXISTS trilha_progresso (
    id BIGSERIAL PRIMARY KEY,
    usuario_uid VARCHAR(128) NOT NULL,
    trilha_slug VARCHAR(50) NOT NULL,
    topico_nome VARCHAR(100) NOT NULL,
    concluido BOOLEAN NOT NULL DEFAULT TRUE,
    data_conclusao TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_usuario_trilha_topico UNIQUE (usuario_uid, trilha_slug, topico_nome)
);

CREATE INDEX IF NOT EXISTS idx_trilha_usuario ON trilha_progresso(usuario_uid, trilha_slug);

-- =============================================================================
-- SEED INICIAL DE DADOS
-- =============================================================================

INSERT INTO mural_mensagens (mensagem, categoria, autor_nome, autor_foto, autor_uid, curtidas, data_criacao)
VALUES 
('Bem-vindo à nova versão da Comunidade Tech! Espaço aberto para compartilhar conhecimento e trilhas.', 'Dúvida', 'Lucy (Nexus Tech Lead)', 'https://avatars.githubusercontent.com/u/583231?v=4', 'system_nexus_lucy', 10, CURRENT_TIMESTAMP),
('Trilha de Sistemas Operacionais reformulada com gamificação de XP e tópicos interativos!', 'Trilhas', 'Lucivaldo Junior', 'https://github.com/lucivaldo-junior.png', 'lucivaldo_admin', 15, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

INSERT INTO plataforma_sugestoes (nome, url, aprovada, data_sugerida)
VALUES
('Roadmap.sh (Guias e Trilhas Visuais)', 'https://roadmap.sh', TRUE, CURRENT_TIMESTAMP),
('Exercism (Prática de Código com Mentoria)', 'https://exercism.org', TRUE, CURRENT_TIMESTAMP),
('LeetCode (Algoritmos e Estruturas de Dados)', 'https://leetcode.com', TRUE, CURRENT_TIMESTAMP),
('freeCodeCamp (Certificações Gratuitas)', 'https://www.freecodecamp.org', TRUE, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;
