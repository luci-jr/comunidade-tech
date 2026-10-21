package com.comunidadetech.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "trilha_progresso", uniqueConstraints = {
        @UniqueConstraint(name = "uk_usuario_trilha_topico", columnNames = {"usuario_uid", "trilha_slug", "topico_nome"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProgressoTopico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_uid", nullable = false, length = 128)
    private String usuarioUid;

    @Column(name = "trilha_slug", nullable = false, length = 50)
    private String trilhaSlug;

    @Column(name = "topico_nome", nullable = false, length = 100)
    private String topicoNome;

    @Column(name = "concluido", nullable = false)
    @Builder.Default
    private Boolean concluido = true;

    @Column(name = "data_conclusao")
    private LocalDateTime dataConclusao;
}
