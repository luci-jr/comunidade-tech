package com.comunidadetech.api.repository;

import com.comunidadetech.api.entity.MensagemMural;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MuralRepository extends JpaRepository<MensagemMural, Long> {

    List<MensagemMural> findAllByOrderByDataCriacaoDesc(Pageable pageable);

    List<MensagemMural> findByCategoriaOrderByDataCriacaoDesc(String categoria, Pageable pageable);

    @Modifying
    @Query("UPDATE MensagemMural m SET m.curtidas = m.curtidas + 1 WHERE m.id = :id")
    int incrementarCurtida(@Param("id") Long id);
}
