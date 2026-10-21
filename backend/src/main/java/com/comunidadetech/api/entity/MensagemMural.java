package com.comunidadetech.api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "mural_mensagens", indexes = {
        @Index(name = "idx_mural_categoria", columnList = "categoria"),
        @Index(name = "idx_mural_data_criacao", columnList = "data_criacao")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MensagemMural {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 400)
    private String mensagem;

    @Column(nullable = false, length = 50)
    private String categoria;

    @Column(name = "autor_nome", nullable = false, length = 100)
    private String autorNome;

    @Column(name = "autor_foto", length = 500)
    private String autorFoto;

    @Column(name = "autor_uid", nullable = false, length = 128)
    private String autorUid;

    @Column(name = "curtidas", nullable = false)
    @Builder.Default
    private Integer curtidas = 0;

    @CreationTimestamp
    @Column(name = "data_criacao", nullable = false, updatable = false)
    private LocalDateTime dataCriacao;
}
