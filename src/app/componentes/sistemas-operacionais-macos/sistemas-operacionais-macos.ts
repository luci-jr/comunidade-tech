import { Component } from '@angular/core';
import { SistemaOperacional } from '../../models/sistema-operacional.model';
import { SistemasOperacionaisTrilha } from '../sistemas-operacionais-trilha/sistemas-operacionais-trilha';

@Component({
  selector: 'app-sistemas-operacionais-macos',
  standalone: true,
  imports: [SistemasOperacionaisTrilha],
  template: `
    <app-sistemas-operacionais-trilha
      [titulo]="'Trilha MacOS'"
      [descricao]="'Ferramentas e referencias para produtividade, desenvolvimento e setup profissional no ecossistema Apple.'"
      [iconeTitulo]="'🍎'"
      [recursos]="listaMacos"
    />
  `,
})
export class SistemasOperacionaisMacos {
  listaMacos: SistemaOperacional[] = [
    {
      nome: 'Apple Support (Mac)',
      url: 'https://support.apple.com/pt-br/mac',
      icone: '🍎',
      descricaoCurta: 'Guias oficiais para usar e configurar o Mac',
      detalhes: 'Base oficial da Apple com tutoriais de sistema, ajustes, backup e solucoes de problemas.',
    },
    {
      nome: 'Documentacao Apple Developer',
      url: 'https://developer.apple.com/documentation/',
      icone: '🧰',
      descricaoCurta: 'Referencia tecnica para desenvolvimento no ecossistema Apple',
      detalhes: 'APIs, frameworks, Xcode, Swift e boas praticas para apps e ferramentas no macOS.',
    },
    {
      nome: 'Homebrew',
      url: 'https://brew.sh/',
      icone: '🍺',
      descricaoCurta: 'Gerenciador de pacotes mais popular no Mac',
      detalhes: 'Facilita instalar e atualizar ferramentas como Git, Node.js, Python e utilitarios de terminal.',
    },
    {
      nome: 'iTerm2',
      url: 'https://iterm2.com/',
      icone: '⌨️',
      descricaoCurta: 'Terminal avancado para produtividade',
      detalhes: 'Recursos como split panes, perfis e atalhos para melhorar fluxo de trabalho no desenvolvimento.',
    },
    {
      nome: 'Raycast',
      url: 'https://www.raycast.com/',
      icone: '⚡',
      descricaoCurta: 'Launcher para automacoes e comandos rapidos',
      detalhes: 'Acelera tarefas no Mac com pesquisa, snippets, extensoes e integracao com ferramentas de dev.',
    },
  ];
}
