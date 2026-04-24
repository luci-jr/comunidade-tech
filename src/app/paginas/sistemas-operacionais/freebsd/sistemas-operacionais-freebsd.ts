import { Component } from '@angular/core';
import { SistemaOperacional } from '../../../models/sistema-operacional.model';
import { SistemasOperacionaisTrilha } from '../trilha/sistemas-operacionais-trilha';

@Component({
  selector: 'app-sistemas-operacionais-freebsd',
  standalone: true,
  imports: [SistemasOperacionaisTrilha],
  template: `
    <app-sistemas-operacionais-trilha
      [titulo]="'Trilha FreeBSD'"
      [descricao]="'Sistema robusto para servidores, redes e ambientes que exigem estabilidade e desempenho.'"
      [iconeTitulo]="'🐡'"
      [recursos]="listaFreebsd"
    />
  `,
})
export class SistemasOperacionaisFreebsd {
  listaFreebsd: SistemaOperacional[] = [
    {
      nome: 'FreeBSD Official',
      url: 'https://www.freebsd.org/',
      icone: '🐡',
      descricaoCurta: 'Portal oficial do FreeBSD',
      detalhes: 'Downloads, release notes, documentacao e visao geral para iniciar no ecossistema BSD.',
    },
    {
      nome: 'FreeBSD Handbook',
      url: 'https://docs.freebsd.org/en/books/handbook/',
      icone: '📘',
      descricaoCurta: 'Guia completo de administracao',
      detalhes: 'Referencia detalhada para instalacao, rede, storage, seguranca e manutencao de servidores.',
    },
    {
      nome: 'FreeBSD Forums',
      url: 'https://forums.freebsd.org/',
      icone: '💬',
      descricaoCurta: 'Comunidade ativa para suporte',
      detalhes: 'Espaco para tirar duvidas tecnicas, acompanhar discussoes e boas praticas de operacao.',
    },
    {
      nome: 'FreshPorts',
      url: 'https://www.freshports.org/',
      icone: '📦',
      descricaoCurta: 'Indice de pacotes e ports',
      detalhes: 'Navegue por softwares disponiveis e acompanhe atualizacoes do ecossistema de ports.',
    },
    {
      nome: 'BSD Now',
      url: 'https://www.bsdnow.tv/',
      icone: '🎙️',
      descricaoCurta: 'Conteudo e noticias sobre BSD',
      detalhes: 'Podcast e agregador de noticias para se manter atualizado sobre FreeBSD e derivados.',
    },
  ];
}
