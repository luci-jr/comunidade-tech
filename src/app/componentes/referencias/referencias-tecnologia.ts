import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PlataformaEnsino } from '../../models/plataforma-ensino.model';
import { LoadingService } from '../../servicos/loading.service';

@Component({
  selector: 'app-referencias-tecnologia',
  standalone: true,
  imports: [],
  templateUrl: './referencias-tecnologia.html',
  styleUrl: './referencias-tecnologia.css',
})
export class ReferenciasTecnologia {
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  filtroAtivo = signal<'todos' | 'backend' | 'frontend' | 'mobile' | 'devops'>('todos');

  listaReferencias = signal<PlataformaEnsino[]>([
    {
      nome: 'Spring',
      url: 'https://spring.io/projects',
      descricao: '🌱 Framework backend para APIs e microsservicos',
      detalhes: 'Projetos Spring Boot, Security e Data para APIs, microsservicos e aplicacoes corporativas.',
      icone: '🌱',
    },
    {
      nome: 'Quarkus',
      url: 'https://quarkus.io/',
      descricao: '⚡ Framework cloud-native de alta performance',
      detalhes: 'Framework leve, ideal para containers, Kubernetes e inicializacao rapida.',
      icone: '⚡',
    },
    {
      nome: 'FastAPI',
      url: 'https://fastapi.tiangolo.com/',
      descricao: '🚀 Framework moderno para APIs',
      detalhes: 'Framework rapido com tipagem e documentacao automatica para back-end.',
      icone: '🚀',
    },
    {
      nome: 'Django',
      url: 'https://docs.djangoproject.com/en/stable/',
      descricao: '🧱 Framework web completo para backend',
      detalhes: 'Estrutura robusta para projetos web com admin, ORM e seguranca embutida.',
      icone: '🧱',
    },
    {
      nome: 'Angular',
      url: 'https://angular.dev/',
      descricao: '🅰️ Framework front-end completo',
      detalhes: 'Documentacao oficial com guias para SPA, componentes standalone e arquitetura.',
      icone: '🅰️',
    },
    {
      nome: 'React',
      url: 'https://react.dev/',
      descricao: '⚛️ Biblioteca para interfaces',
      detalhes: 'Fonte oficial para componentes, hooks e ecossistema React moderno.',
      icone: '⚛️',
    },
    {
      nome: 'Ionic',
      url: 'https://ionicframework.com/docs',
      descricao: '📱 Apps mobile com tecnologias web',
      detalhes: 'Framework para criar aplicativos iOS/Android com Angular, React ou Vue.',
      icone: '📱',
    },
    {
      nome: 'Flutter',
      url: 'https://docs.flutter.dev/',
      descricao: '🦋 Framework cross-platform para mobile',
      detalhes: 'SDK do Google para criar apps nativos para Android e iOS com um unico codigo-base.',
      icone: '🦋',
    },
    {
      nome: 'Swift',
      url: 'https://developer.apple.com/swift/',
      descricao: '🍎 Linguagem principal para iOS',
      detalhes: 'Tecnologia base para apps Apple com alto desempenho e integracao nativa ao ecossistema iOS.',
      icone: '🍎',
    },
    {
      nome: 'Docker',
      url: 'https://docs.docker.com/',
      descricao: '🐳 Containerizacao de aplicacoes',
      detalhes: 'Tecnologia essencial para empacotar e executar apps com ambiente padronizado.',
      icone: '🐳',
    },
    {
      nome: 'Kubernetes',
      url: 'https://kubernetes.io/docs/home/',
      descricao: '☸️ Orquestracao de containers',
      detalhes: 'Plataforma para deploy, escalabilidade e operacao de servicos em producao.',
      icone: '☸️',
    },
  ]);

  referenciasFiltradas = computed(() => {
    const filtro = this.filtroAtivo();
    if (filtro === 'todos') return this.listaReferencias();

    return this.listaReferencias().filter((item) => {
      const texto = `${item.nome} ${item.descricao} ${item.detalhes}`.toLowerCase();
      if (filtro === 'backend') return texto.includes('api') || texto.includes('backend') || texto.includes('django') || texto.includes('spring') || texto.includes('quarkus') || texto.includes('fastapi');
      if (filtro === 'frontend') return texto.includes('front-end') || texto.includes('interface') || texto.includes('spa') || texto.includes('angular') || texto.includes('react');
      if (filtro === 'mobile') {
        return (
          texto.includes('mobile') ||
          texto.includes('ios') ||
          texto.includes('android') ||
          texto.includes('ionic') ||
          texto.includes('flutter') ||
          texto.includes('swift')
        );
      }
      return texto.includes('docker') || texto.includes('kubernetes') || texto.includes('container');
    });
  });

  descricaoIcone(texto: string): string {
    return texto.split(' ')[0] ?? '';
  }

  descricaoTexto(texto: string): string {
    return texto.split(' ').slice(1).join(' ');
  }

  alterarFiltro(filtro: 'todos' | 'backend' | 'frontend' | 'mobile' | 'devops') {
    this.filtroAtivo.set(filtro);
  }

  voltar() {
    this.loadingService.showReturning();
    setTimeout(() => {
      this.router.navigate(['/']);
      this.loadingService.hide();
    }, 800);
  }
}
