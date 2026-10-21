package com.comunidadetech.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NovaMensagemDTO(
        @NotBlank(message = "A mensagem não pode ficar em branco")
        @Size(min = 5, max = 350, message = "A mensagem deve ter entre 5 e 350 caracteres")
        String mensagem,

        @NotBlank(message = "A categoria é obrigatória")
        String categoria,

        @NotBlank(message = "O nome do autor é obrigatório")
        String autorNome,

        String autorFoto,

        @NotBlank(message = "O identificador do usuário é obrigatório")
        String autorUid
) {}
