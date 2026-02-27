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
  styles: [
    `
      .plataformas-layout {
        --sidebar-width: 380px;
        width: 100%;
        min-height: calc(100vh - 1px);
      }

      .sidebar-plataformas {
        position: fixed;
        inset: 0 auto 0 0;
        width: var(--sidebar-width);
        background: #1a1930;
        border-right: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 8px 0 28px rgba(0, 0, 0, 0.4);
        padding: 34px 24px;
        display: flex;
        flex-direction: column;
      }

      .sidebar-plataformas h2 {
        color: var(--color-text);
        margin: 0 0 18px;
        font-size: 1.8rem;
        font-family: 'Press Start 2P', var(--font-montserrat);
        line-height: 1.25;
        text-shadow: 0 0 6px rgba(77, 163, 255, 0.6), 0 0 14px rgba(77, 163, 255, 0.35);
      }

      .sidebar-plataformas p {
        margin: 0 0 36px;
        color: #d4d8e3;
        line-height: 1.65;
        font-size: 1.16rem;
        font-weight: 600;
      }

      .menu-plataformas {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: auto;
      }

      .menu-plataformas button {
        text-align: left;
        padding: 14px 15px;
        border-radius: 12px;
        color: var(--color-text);
        border: 1px solid transparent;
        background: rgba(255, 255, 255, 0.02);
        transition: all 0.2s ease;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
      }

      .menu-plataformas button.ativo {
        border-color: var(--color-accent);
        background: rgba(227, 112, 47, 0.15);
        box-shadow: var(--neon-sepia);
      }

      .conteudo-plataformas {
        min-width: 0;
        margin-left: calc(var(--sidebar-width) + 26px);
        padding: 34px 24px 60px 0;
      }

      @media (max-width: 900px) {
        .sidebar-plataformas {
          position: static;
          width: 100%;
          border-right: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: none;
          padding: 22px 16px;
        }

        .menu-plataformas {
          margin-bottom: 18px;
        }

        .conteudo-plataformas {
          margin-left: 0;
          padding: 24px 16px 40px;
        }
      }
    `,
  ],
})
export class PlataformasEnsinoJogo {
  private loadingService = inject(LoadingService);
  private router = inject(Router);
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
      descricao: '🧠 Desafios de programacao em formato de missao',
      detalhes: 'Resolva problemas em Python ou JavaScript e veja como outros devs solucionaram.',
      icone: '🧩',
    },
    {
      nome: 'HackerRank',
      url: 'https://www.hackerrank.com',
      descricao: '🎯 Plataforma de desafios tecnicos',
      detalhes:
        'Gamificacao com ranking, badges e trilhas de aprendizado em varias linguagens.',
      icone: '🏆',
    },
    {
      nome: 'LeetCode',
      url: 'https://leetcode.com',
      descricao: '📈 Treinamento para entrevistas tecnicas',
      detalhes:
        'Sistema de niveis, pontuacao e desafios progressivos focados em algoritmos e estruturas de dados.',
      icone: '🧪',
    },
    {
      nome: 'CodinGame',
      url: 'https://www.codingame.com',
      descricao: '🎮 Programacao em formato de competicao',
      detalhes:
        'Voce resolve problemas para controlar personagens e competir contra outros programadores.',
      icone: '🏗️',
    },
    {
      nome: 'Exercism',
      url: 'https://exercism.org',
      descricao: '📚 Exercicios praticos com mentoria',
      detalhes: 'Sistema de progresso por trilhas, desafios e feedback da comunidade.',
      icone: '🐍',
    },
    {
      nome: 'Codewars',
      url: 'https://www.codewars.com',
      descricao: '🥋 Sistema de ranking estilo artes marciais',
      detalhes: 'Voce sobe de nivel (kyu/dan) conforme resolve desafios.',
      icone: '🧑‍🚀',
    },
    {
      nome: 'Frontend Mentor',
      url: 'https://www.frontendmentor.io',
      descricao: '🎨 Desafios reais de front-end',
      detalhes:
        'Projetos praticos com niveis de dificuldade e sistema de feedback da comunidade.',
      icone: '🌐',
    },
    {
      nome: 'CSSBattle',
      url: 'https://cssbattle.dev',
      descricao: '🎯 Competicao criativa com CSS',
      detalhes:
        'Reproduza layouts usando o menor codigo possivel, com pontuacao baseada em precisao e tamanho.',
      icone: '🏰',
    },
    {
      nome: 'Kaggle',
      url: 'https://www.kaggle.com',
      descricao: '📊 Competicoes de ciencia de dados',
      detalhes: 'Desafios reais com ranking global e datasets publicos.',
      icone: '🧑‍💻',
    },
  ]);

  plataformasFiltradas = computed(() => {
    const filtro = this.filtroAtivo();
    if (filtro === 'todos') return this.listaPlataformas();

    return this.listaPlataformas().filter((item) => {
      const texto = `${item.nome} ${item.descricao} ${item.detalhes}`.toLowerCase();
      if (filtro === 'algoritmos') {
        return (
          texto.includes('desafio') ||
          texto.includes('algoritmo') ||
          texto.includes('entrevista') ||
          texto.includes('ranking')
        );
      }
      if (filtro === 'frontend') {
        return texto.includes('front-end') || texto.includes('css') || texto.includes('web');
      }
      return texto.includes('dados') || texto.includes('kaggle') || texto.includes('ia');
    });
  });

  descricaoIcone(texto: string): string {
    return texto.split(' ')[0] ?? '';
  }

  descricaoTexto(texto: string): string {
    return texto.split(' ').slice(1).join(' ');
  }

  alterarFiltro(filtro: 'todos' | 'algoritmos' | 'frontend' | 'ia-dados') {
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
