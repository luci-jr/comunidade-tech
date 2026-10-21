import { Component } from '@angular/core';
import { SistemaOperacional } from '../../../models/sistema-operacional.model';
import { SistemasOperacionaisTrilha } from '../trilha/sistemas-operacionais-trilha';

@Component({
  selector: 'app-sistemas-operacionais-linux',
  standalone: true,
  imports: [SistemasOperacionaisTrilha],
  template: `
    <app-sistemas-operacionais-trilha
      [titulo]="'Trilha Linux'"
      [descricao]="'Distribuicoes, comparadores e ambientes para evoluir no ecossistema open-source.'"
      [iconeTitulo]="'🐧'"
      [recursos]="listaLinux"
    />
  `,
})
export class SistemasOperacionaisLinux {
  listaLinux: SistemaOperacional[] = [
    {
      nome: 'DistroWatch',
      url: 'https://distrowatch.com/?language=PT',
      icone: '🧭',
      descricaoCurta: 'Comparador de distribuicoes Linux e BSD',
      detalhes: 'Rankings, novidades e detalhes tecnicos para escolher uma distro com mais seguranca.',
    },
    {
      nome: 'Ubuntu',
      url: 'https://ubuntu.com/',
      icone: '🟠',
      descricaoCurta: 'Distribuicao Linux popular e estavel',
      detalhes: 'Muito usada em desktop e servidor, com grande comunidade e excelente documentacao.',
    },
    {
      nome: 'Fedora Project',
      url: 'https://fedoraproject.org/pt-br/',
      icone: '🐻',
      descricaoCurta: 'Linux com tecnologias recentes',
      detalhes: 'Boa opcao para devs que querem recursos modernos e integracao forte com ecossistema open-source.',
    },
    {
      nome: 'Pop!_OS',
      url: 'https://system76.com/pop/',
      icone: '🚀',
      descricaoCurta: 'Linux focado em produtividade',
      detalhes: 'Distribuicao baseada em Ubuntu, otimizada para desenvolvimento e multitarefa.',
    },
    {
      nome: 'BigLinux',
      url: 'https://www.biglinux.com.br/',
      icone: '🇧🇷',
      descricaoCurta: 'Linux amigavel para usuarios brasileiros',
      detalhes: 'Interface acessivel e ferramentas prontas para facilitar a migracao de iniciantes.',
    },
  ];
}
