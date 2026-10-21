import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PlataformaEnsino } from '../../models/plataforma-ensino.model';
import { LoadingService } from '../../servicos/loading.service';

@Component({
  selector: 'app-plataformas-ensino-jogo',
  standalone: true,
  imports: [],
  templateUrl: './plataformas-ensino-jogo.html',
  styleUrl: './plataformas-ensino-jogo.css',
})
export class PlataformasEnsinoJogo {
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  sidebarRecolhida = signal<boolean>(false);

  alternarSidebar() {
    this.sidebarRecolhida.update((v) => !v);
  }

  filtroAtivo = signal<'todos' | 'algoritmos' | 'frontend' | 'ia-dados'>('todos');

  listaPlataformas = signal<PlataformaEnsino[]>([
    {
      nome: 'CodeCombat',
      url: 'https://codecombat.com',
      descricao: '⚔️ Aprenda programacao jogando',
      detalhes:
        'Ensina logica, JavaScript e Python atraves de fases interativas onde voce controla o personagem escrevendo codigo.',
      icone: '🕹️',
    },
    {
      nome: 'CheckiO',
      url: 'https://checkio.org',
      descricao: '🐍 Missoes em Python e TypeScript',
      detalhes:
        'Resolva desafios progressivos em ilhas tematicas compartilhando solucoes com outros desenvolvedores.',
      icone: '🏝️',
    },
    {
      nome: 'HackerRank',
      url: 'https://www.hackerrank.com',
      descricao: '🏆 Desafios e preparacao tecnica',
      detalhes:
        'Plataforma com trilhas de algoritmos, estruturas de dados, SQL e certificacoes de habilidades.',
      icone: '🏆',
    },
    {
      nome: 'LeetCode',
      url: 'https://leetcode.com',
      descricao: '🧠 Algoritmos para entrevistas',
      detalhes:
        'Banco classico de questoes tecnicas para entrevistas em empresas globais e competicoes.',
      icone: '🧠',
    },
    {
      nome: 'Codewars',
      url: 'https://www.codewars.com',
      descricao: '🥋 Katas de codigo por ranking',
      detalhes:
        'Evolua em katas diarios em diversas linguagens subindo de ranking na comunidade.',
      icone: '🥋',
    },
    {
      nome: 'CodinGame',
      url: 'https://www.codingame.com',
      descricao: '🎮 Jogos multiplayer e IA',
      detalhes:
        'Programe bots para batalhas de jogos com suporte a mais de vinte e cinco linguagens.',
      icone: '🎮',
    },
    {
      nome: 'Exercism',
      url: 'https://exercism.org',
      descricao: '🤝 Pratica gratuita com mentores',
      detalhes:
        'Mais de setenta linguagens com feedback de mentores para aperfeicoar boas praticas.',
      icone: '🤝',
    },
    {
      nome: 'Frontend Mentor',
      url: 'https://www.frontendmentor.io',
      descricao: '🎨 Desafios reais de UI/UX',
      detalhes:
        'Construa interfaces profissionais a partir de layouts e designs prontos em HTML, CSS e JS.',
      icone: '🎨',
    },
    {
      nome: 'CSSBattle',
      url: 'https://cssbattle.dev',
      descricao: '⚔️ Batalhas de CSS puro',
      detalhes:
        'Replique alvos visuais com o menor numero de caracteres possivel em competicoes de CSS.',
      icone: '🎯',
    },
    {
      nome: 'Kaggle',
      url: 'https://www.kaggle.com',
      descricao: '📊 Ciencia de dados e Machine Learning',
      detalhes:
        'Competicoes globais de dados, datasets abertos e cursos interativos com notebooks.',
      icone: '📊',
    },
  ]);

  plataformasFiltradas = computed(() => {
    const filtro = this.filtroAtivo();
    if (filtro === 'todos') {
      return this.listaPlataformas();
    }
    const mapaFiltros: Record<string, string[]> = {
      algoritmos: ['codecombat', 'checkio', 'hackerrank', 'leetcode', 'codewars', 'codingame', 'exercism'],
      frontend: ['frontend mentor', 'cssbattle'],
      'ia-dados': ['kaggle'],
    };
    const permitidos = mapaFiltros[filtro] || [];
    return this.listaPlataformas().filter((p) =>
      permitidos.includes(p.nome.toLowerCase())
    );
  });

  alterarFiltro(filtro: 'todos' | 'algoritmos' | 'frontend' | 'ia-dados') {
    this.filtroAtivo.set(filtro);
  }

  descricaoIcone(desc: string): string {
    const partes = desc.split(' ');
    return partes[0] || '⭐';
  }

  descricaoTexto(desc: string): string {
    const partes = desc.split(' ');
    return partes.slice(1).join(' ') || desc;
  }

  voltar() {
    this.loadingService.showReturning();
    setTimeout(() => {
      this.router.navigate(['/']);
      this.loadingService.hide();
    }, 800);
  }
}
