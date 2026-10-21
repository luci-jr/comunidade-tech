package com.comunidadetech.api.dto;

import java.util.Map;

public record ProgressoStatusDTO(
        String usuarioUid,
        String trilhaSlug,
        Map<String, Boolean> topicosConcluidos,
        int totalConcluidos,
        int porcentagem
) {}
