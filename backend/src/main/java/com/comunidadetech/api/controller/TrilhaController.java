package com.comunidadetech.api.controller;

import com.comunidadetech.api.dto.ProgressoStatusDTO;
import com.comunidadetech.api.dto.ProgressoToggleDTO;
import com.comunidadetech.api.service.TrilhaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/trilhas")
@RequiredArgsConstructor
@Tag(name = "Trilhas de Estudo", description = "Endpoints para acompanhamento de progresso e gamificação nas trilhas de SO")
public class TrilhaController {

    private final TrilhaService trilhaService;

    @GetMapping("/{slug}/progresso")
    @Operation(summary = "Obter progresso na trilha", description = "Retorna os tópicos concluídos e porcentagem de avanço de um usuário em determinada trilha")
    public ResponseEntity<ProgressoStatusDTO> obterProgresso(
            @PathVariable String slug,
            @RequestParam String usuarioUid,
            @RequestParam(defaultValue = "10") int totalTopicos
    ) {
        return ResponseEntity.ok(trilhaService.obterProgresso(usuarioUid, slug, totalTopicos));
    }

    @PostMapping("/{slug}/progresso")
    @Operation(summary = "Alternar conclusão de tópico", description = "Marca ou desmarca um tópico estudado na trilha")
    public ResponseEntity<Void> alternarProgresso(
            @PathVariable String slug,
            @Valid @RequestBody ProgressoToggleDTO dto
    ) {
        trilhaService.alternarTopico(slug, dto);
        return ResponseEntity.noContent().build();
    }
}
