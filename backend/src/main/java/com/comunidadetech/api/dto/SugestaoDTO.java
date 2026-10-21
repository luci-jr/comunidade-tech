package com.comunidadetech.api.dto;

import com.comunidadetech.api.entity.SugestaoPlataforma;

import java.time.LocalDateTime;

public record SugestaoDTO(
        Long id,
        String nome,
        String url,
        Boolean aprovada,
        LocalDateTime dataSugerida
) {
    public static SugestaoDTO fromEntity(SugestaoPlataforma entity) {
        return new SugestaoDTO(
                entity.getId(),
                entity.getNome(),
                entity.getUrl(),
                entity.getAprovada(),
                entity.getDataSugerida()
        );
    }
}
