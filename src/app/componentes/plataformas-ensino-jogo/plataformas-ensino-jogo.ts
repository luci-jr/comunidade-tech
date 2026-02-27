import { Component, inject, signal } from '@angular/core';
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

  voltar() {
    this.loadingService.showReturning();
    setTimeout(() => {
      this.router.navigate(['/']);
      this.loadingService.hide();
    }, 800);
  }
}
