package com.comunidadetech.api.repository;

import com.comunidadetech.api.entity.SugestaoPlataforma;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SugestaoRepository extends JpaRepository<SugestaoPlataforma, Long> {

    List<SugestaoPlataforma> findByAprovadaTrueOrderByDataSugeridaDesc(Pageable pageable);
}
