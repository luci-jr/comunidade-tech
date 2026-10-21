package com.comunidadetech.api.service;

import com.comunidadetech.api.dto.MensagemMuralDTO;
import com.comunidadetech.api.dto.NovaMensagemDTO;
import com.comunidadetech.api.entity.MensagemMural;
import com.comunidadetech.api.repository.MuralRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MuralService {

    private final MuralRepository muralRepository;

    @Transactional(readOnly = true)
    public List<MensagemMuralDTO> listarRecentes(String categoria, int limite) {
        PageRequest pageRequest = PageRequest.of(0, Math.min(limite, 100));

        List<MensagemMural> mensagens;
        if (categoria != null && !categoria.isBlank() && !categoria.equalsIgnoreCase("TODAS")) {
            mensagens = muralRepository.findByCategoriaOrderByDataCriacaoDesc(categoria, pageRequest);
        } else {
            mensagens = muralRepository.findAllByOrderByDataCriacaoDesc(pageRequest);
        }

        return mensagens.stream()
                .map(MensagemMuralDTO::fromEntity)
                .toList();
    }

    @Transactional
    public MensagemMuralDTO criarMensagem(NovaMensagemDTO dto) {
        MensagemMural entity = MensagemMural.builder()
                .mensagem(dto.mensagem().trim())
                .categoria(dto.categoria().trim())
                .autorNome(dto.autorNome().trim())
                .autorFoto(dto.autorFoto())
                .autorUid(dto.autorUid().trim())
                .curtidas(0)
                .build();

        MensagemMural salvo = muralRepository.save(entity);
        return MensagemMuralDTO.fromEntity(salvo);
    }

    @Transactional
    public boolean curtirMensagem(Long id) {
        return muralRepository.incrementarCurtida(id) > 0;
    }
}
