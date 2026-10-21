package com.comunidadetech.api.controller;

import com.comunidadetech.api.dto.NovaSugestaoDTO;
import com.comunidadetech.api.dto.SugestaoDTO;
import com.comunidadetech.api.service.SugestaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sugestoes")
@RequiredArgsConstructor
@Tag(name = "Sugestões de Plataformas", description = "Endpoints para submissão e listagem de fontes recomendadas pela comunidade")
public class SugestaoController {

    private final SugestaoService sugestaoService;

    @GetMapping
    @Operation(summary = "Listar indicações da galera", description = "Retorna plataformas de ensino recomendadas pelos usuários")
    public ResponseEntity<List<SugestaoDTO>> listar(@RequestParam(defaultValue = "30") int limite) {
        return ResponseEntity.ok(sugestaoService.listarAprovadas(limite));
    }

    @PostMapping
    @Operation(summary = "Sugerir nova plataforma", description = "Registra uma nova fonte de estudos para análise e exibição")
    public ResponseEntity<SugestaoDTO> criar(@Valid @RequestBody NovaSugestaoDTO dto) {
        SugestaoDTO criado = sugestaoService.criarSugestao(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }
}
