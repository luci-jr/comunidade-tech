package com.comunidadetech.api.dto;

import jakarta.validation.constraints.NotBlank;

public record ProgressoToggleDTO(
        @NotBlank(message = "O identificador do usuário é obrigatório")
        String usuarioUid,

        @NotBlank(message = "O nome do tópico é obrigatório")
        String topicoNome,

        boolean concluido
) {}
