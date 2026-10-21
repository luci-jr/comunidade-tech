package com.comunidadetech.api.service;

import com.comunidadetech.api.dto.NovaSugestaoDTO;
import com.comunidadetech.api.dto.SugestaoDTO;
import com.comunidadetech.api.entity.SugestaoPlataforma;
import com.comunidadetech.api.repository.SugestaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SugestaoService {

    private final SugestaoRepository sugestaoRepository;

    @Transactional(readOnly = true)
    public List<SugestaoDTO> listarAprovadas(int limite) {
        PageRequest pageRequest = PageRequest.of(0, Math.min(limite, 50));
        return sugestaoRepository.findByAprovadaTrueOrderByDataSugeridaDesc(pageRequest)
                .stream()
                .map(SugestaoDTO::fromEntity)
                .toList();
    }

    @Transactional
    public SugestaoDTO criarSugestao(NovaSugestaoDTO dto) {
        SugestaoPlataforma entity = SugestaoPlataforma.builder()
                .nome(dto.nome().trim())
                .url(dto.url().trim())
                .aprovada(true)
                .build();

        SugestaoPlataforma salvo = sugestaoRepository.save(entity);
        return SugestaoDTO.fromEntity(salvo);
    }
}
