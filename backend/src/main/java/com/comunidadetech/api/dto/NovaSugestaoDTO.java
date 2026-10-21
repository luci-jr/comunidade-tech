package com.comunidadetech.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

public record NovaSugestaoDTO(
        @NotBlank(message = "O nome da plataforma é obrigatório")
        @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres")
        String nome,

        @NotBlank(message = "A URL oficial é obrigatória")
        @URL(message = "A URL informada deve ser válida")
        @Size(max = 350, message = "A URL deve ter no máximo 350 caracteres")
        String url
) {}
