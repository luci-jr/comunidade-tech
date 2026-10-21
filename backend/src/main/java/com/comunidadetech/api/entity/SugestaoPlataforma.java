package com.comunidadetech.api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "plataforma_sugestoes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SugestaoPlataforma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 350)
    private String url;

    @Column(name = "aprovada", nullable = false)
    @Builder.Default
    private Boolean aprovada = true;

    @CreationTimestamp
    @Column(name = "data_sugerida", nullable = false, updatable = false)
    private LocalDateTime dataSugerida;
}
