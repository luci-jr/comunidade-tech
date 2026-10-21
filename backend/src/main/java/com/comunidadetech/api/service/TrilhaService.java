package com.comunidadetech.api.service;

import com.comunidadetech.api.dto.ProgressoStatusDTO;
import com.comunidadetech.api.dto.ProgressoToggleDTO;
import com.comunidadetech.api.entity.ProgressoTopico;
import com.comunidadetech.api.repository.ProgressoTopicoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrilhaService {

    private final ProgressoTopicoRepository progressoRepository;

    @Transactional(readOnly = true)
    public ProgressoStatusDTO obterProgresso(String usuarioUid, String trilhaSlug, int totalTopicosNaTrilha) {
        List<ProgressoTopico> lista = progressoRepository.findByUsuarioUidAndTrilhaSlug(usuarioUid, trilhaSlug);

        Map<String, Boolean> mapa = lista.stream()
                .collect(Collectors.toMap(ProgressoTopico::getTopicoNome, ProgressoTopico::getConcluido, (a, b) -> b));

        int concluidos = (int) mapa.values().stream().filter(Boolean::booleanValue).count();
        int porcentagem = totalTopicosNaTrilha > 0 ? Math.round(((float) concluidos / totalTopicosNaTrilha) * 100) : 0;

        return new ProgressoStatusDTO(usuarioUid, trilhaSlug, mapa, concluidos, porcentagem);
    }

    @Transactional
    public void alternarTopico(String trilhaSlug, ProgressoToggleDTO dto) {
        ProgressoTopico entity = progressoRepository.findByUsuarioUidAndTrilhaSlugAndTopicoNome(
                dto.usuarioUid(), trilhaSlug, dto.topicoNome()
        ).orElseGet(() -> ProgressoTopico.builder()
                .usuarioUid(dto.usuarioUid())
                .trilhaSlug(trilhaSlug)
                .topicoNome(dto.topicoNome())
                .build());

        entity.setConcluido(dto.concluido());
        entity.setDataConclusao(dto.concluido() ? LocalDateTime.now() : null);

        progressoRepository.save(entity);
    }
}
