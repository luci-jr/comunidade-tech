package com.comunidadetech.api.controller;

import com.comunidadetech.api.dto.MensagemMuralDTO;
import com.comunidadetech.api.dto.NovaMensagemDTO;
import com.comunidadetech.api.service.MuralService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mural")
@RequiredArgsConstructor
@Tag(name = "Mural dos Devs", description = "Endpoints para leitura, postagem e curtidas no mural da comunidade")
public class MuralController {

    private final MuralService muralService;

    @GetMapping
    @Operation(summary = "Listar recados do mural", description = "Retorna os recados mais recentes ordenados por data decrescente, com filtro opcional por categoria")
    public ResponseEntity<List<MensagemMuralDTO>> listar(
            @RequestParam(required = false) String categoria,
            @RequestParam(defaultValue = "50") int limite
    ) {
        return ResponseEntity.ok(muralService.listarRecentes(categoria, limite));
    }

    @PostMapping
    @Operation(summary = "Publicar novo recado", description = "Cria uma nova mensagem no mural associada ao usuário autenticado")
    public ResponseEntity<MensagemMuralDTO> criar(@Valid @RequestBody NovaMensagemDTO dto) {
        MensagemMuralDTO criado = muralService.criarMensagem(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    @PatchMapping("/{id}/curtir")
    @Operation(summary = "Curtir recado", description = "Incrementa o contador de curtidas de um recado específico")
    public ResponseEntity<Void> curtir(@PathVariable Long id) {
        boolean sucesso = muralService.curtirMensagem(id);
        return sucesso ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
