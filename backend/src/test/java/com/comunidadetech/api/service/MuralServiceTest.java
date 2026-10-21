package com.comunidadetech.api.service;

import com.comunidadetech.api.dto.MensagemMuralDTO;
import com.comunidadetech.api.dto.NovaMensagemDTO;
import com.comunidadetech.api.entity.MensagemMural;
import com.comunidadetech.api.repository.MuralRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MuralServiceTest {

    @Mock
    private MuralRepository muralRepository;

    @InjectMocks
    private MuralService muralService;

    @Test
    @DisplayName("Deve salvar uma nova mensagem no mural com sucesso")
    void deveSalvarNovaMensagemComSucesso() {
        NovaMensagemDTO dto = new NovaMensagemDTO(
                "Estudando Java 21 com Spring Boot 3!",
                "#FUNDAMENTOS",
                "Lucivaldo Junior",
                "https://avatar.url/foto.png",
                "uid-12345"
        );

        MensagemMural entidadeSalva = MensagemMural.builder()
                .id(1L)
                .mensagem(dto.mensagem())
                .categoria(dto.categoria())
                .autorNome(dto.autorNome())
                .autorFoto(dto.autorFoto())
                .autorUid(dto.autorUid())
                .curtidas(0)
                .dataCriacao(LocalDateTime.now())
                .build();

        when(muralRepository.save(any(MensagemMural.class))).thenReturn(entidadeSalva);

        MensagemMuralDTO resultado = muralService.criarMensagem(dto);

        assertThat(resultado).isNotNull();
        assertThat(resultado.id()).isEqualTo(1L);
        assertThat(resultado.mensagem()).isEqualTo("Estudando Java 21 com Spring Boot 3!");
        assertThat(resultado.curtidas()).isEqualTo(0);

        verify(muralRepository, times(1)).save(any(MensagemMural.class));
    }

    @Test
    @DisplayName("Deve incrementar curtida com sucesso")
    void deveIncrementarCurtidaComSucesso() {
        when(muralRepository.incrementarCurtida(1L)).thenReturn(1);

        boolean sucesso = muralService.curtirMensagem(1L);

        assertThat(sucesso).isTrue();
        verify(muralRepository, times(1)).incrementarCurtida(1L);
    }
}
