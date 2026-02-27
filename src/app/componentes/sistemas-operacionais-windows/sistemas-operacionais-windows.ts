import { Component } from '@angular/core';
import { SistemaOperacional } from '../../models/sistema-operacional.model';
import { SistemasOperacionaisTrilha } from '../sistemas-operacionais-trilha/sistemas-operacionais-trilha';

@Component({
  selector: 'app-sistemas-operacionais-windows',
  standalone: true,
  imports: [SistemasOperacionaisTrilha],
  template: `
    <app-sistemas-operacionais-trilha
      [titulo]="'Trilha Windows'"
      [descricao]="'Recursos essenciais para produtividade, desenvolvimento e ambiente profissional.'"
      [iconeTitulo]="'🪟'"
      [recursos]="listaWindows"
    />
  `,
})
export class SistemasOperacionaisWindows {
  listaWindows: SistemaOperacional[] = [
    {
      nome: 'Windows (Microsoft)',
      url: 'https://www.microsoft.com/pt-br/windows/?r=1',
      icone: '🪟',
      descricaoCurta: 'Sistema operacional comercial amplamente usado',
      detalhes: 'Base para trabalho corporativo, desenvolvimento, jogos e uso pessoal no dia a dia.',
    },
    {
      nome: 'Documentacao Windows',
      url: 'https://learn.microsoft.com/pt-br/windows/',
      icone: '📚',
      descricaoCurta: 'Guias oficiais e boas praticas',
      detalhes: 'Referencia oficial com arquitetura, configuracoes, administracao e desenvolvimento no ecossistema Windows.',
    },
    {
      nome: 'WSL (Windows Subsystem for Linux)',
      url: 'https://learn.microsoft.com/pt-br/windows/wsl/',
      icone: '🐧',
      descricaoCurta: 'Linux integrado ao Windows para devs',
      detalhes: 'Permite executar ferramentas Linux no Windows, acelerando fluxos de Node, Python, Docker e Git.',
    },
    {
      nome: 'Windows Server',
      url: 'https://learn.microsoft.com/pt-br/windows-server/',
      icone: '🖥️',
      descricaoCurta: 'Configuracao e administracao de servidores Windows',
      detalhes:
        'Guias oficiais para Active Directory, DNS, politicas de grupo, seguranca e operacao de ambientes corporativos.',
    },
    {
      nome: 'IIS (Internet Information Services)',
      url: 'https://learn.microsoft.com/pt-br/iis/',
      icone: '🌐',
      descricaoCurta: 'Hospedagem de aplicacoes web no Windows',
      detalhes:
        'Conteudo para instalar, configurar sites, publicar APIs e ajustar performance e seguranca no servidor web da Microsoft.',
    },
  ];
}
