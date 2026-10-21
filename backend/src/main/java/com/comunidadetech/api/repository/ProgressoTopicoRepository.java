package com.comunidadetech.api.repository;

import com.comunidadetech.api.entity.ProgressoTopico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProgressoTopicoRepository extends JpaRepository<ProgressoTopico, Long> {

    List<ProgressoTopico> findByUsuarioUidAndTrilhaSlug(String usuarioUid, String trilhaSlug);

    Optional<ProgressoTopico> findByUsuarioUidAndTrilhaSlugAndTopicoNome(
            String usuarioUid, String trilhaSlug, String topicoNome
    );
}
