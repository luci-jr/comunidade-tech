package com.comunidadetech.api.dto;

import com.comunidadetech.api.entity.MensagemMural;

import java.time.LocalDateTime;

public record MensagemMuralDTO(
        Long id,
        String mensagem,
        String categoria,
        String autorNome,
        String autorFoto,
        String autorUid,
        Integer curtidas,
        LocalDateTime dataCriacao
) {
    public static MensagemMuralDTO fromEntity(MensagemMural entity) {
        return new MensagemMuralDTO(
                entity.getId(),
                entity.getMensagem(),
                entity.getCategoria(),
                entity.getAutorNome(),
                entity.getAutorFoto(),
                entity.getAutorUid(),
                entity.getCurtidas(),
                entity.getDataCriacao()
        );
    }
}
