import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PlataformaEnsino } from '../../models/plataforma-ensino.model';
import { FirestoreService } from '../../servicos/firestore.service';
import { LoadingService } from '../../servicos/loading.service';

@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [],
  templateUrl: './sites-aprendizado.html',
  styleUrl: './sites-aprendizado.css',
})
export class SitesAprendizado {
  private firestoreService = inject(FirestoreService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  filtroAtivo = signal<
    'todos' | 'fundamentos' | 'fullstack' | 'cloud-devops' | 'ensino-gamificado'
  >('todos');
  private nomesGamificados = new Set([
    'codecombat',
    'checkio',
    'hackerrank',
    'leetcode',
    'codewars',
    'codingame',
    'exercism',
    'frontend mentor',
    'cssbattle',
    'kaggle',
  ]);

  listaPlataformas = signal<PlataformaEnsino[]>([
    {
      nome: 'Curso em Vídeo',
      url: 'https://www.youtube.com/c/CursoemVídeo',
      descricao: '📚 Ideal para iniciantes',
      detalhes:
        'Lógica de programação, Python, HTML, CSS e algoritmos com didática clara e progressiva.',
      icone: '🎓',
    },
    {
      nome: 'Alura',
      url: 'https://www.alura.com.br',
      descricao: '💼 Trilhas completas e foco em mercado',
      detalhes: 'Dev, DevOps, Cloud, Data, UX e carreira em tecnologia.',
      icone: '📊',
    },
    {
      nome: 'Udemy',
      url: 'https://www.udemy.com',
      descricao: '🌍 Marketplace com cursos específicos',
      detalhes: 'Ótimo para aprender tecnologias pontuais (AWS, Docker, React, Kubernetes).',
      icone: '💻',
    },
    {
      nome: 'Cod3r',
      url: 'https://www.cod3r.com.br',
      descricao: '📘 Formação sólida em fundamentos',
      detalhes: 'JavaScript, React, Angular, Node.js e arquitetura.',
      icone: '🧑‍💻',
    },
    {
      nome: 'Rocketseat',
      url: 'https://www.rocketseat.com.br',
      descricao: '⚡ Desenvolvimento moderno com projetos reais',
      detalhes: 'React, Node.js, TypeScript e ecossistema full stack.',
      icone: '🚀',
    },
    {
      nome: 'Fundação Bradesco',
      url: 'https://www.ev.org.br',
      descricao: '🎓 Cursos gratuitos com certificado',
      detalhes: 'Lógica, segurança da informação e fundamentos de TI.',
      icone: '🏦',
    },
    {
      nome: 'Coursera',
      url: 'https://www.coursera.org',
      descricao: '🏛️ Cursos de universidades internacionais',
      detalhes: 'Cloud computing, IA, ciência de dados e arquitetura.',
      icone: '🌎',
    },
    {
      nome: 'DIO',
      url: 'https://www.dio.me',
      descricao: '🎯 Bootcamps e desafios práticos',
      detalhes: 'Foco forte em empregabilidade e portfólio.',
      icone: '🖥️',
    },
    {
      nome: 'AWS Skill Builder',
      url: 'https://skillbuilder.aws',
      descricao: '🌩️ Plataforma oficial da AWS',
      detalhes: 'Trilhas para certificação e laboratórios práticos.',
      icone: '☁️',
    },
    {
      nome: 'LinuxTips',
      url: 'https://linuxtips.io',
      descricao: '⚙️ Infraestrutura moderna e DevOps',
      detalhes: 'Docker, Kubernetes, observabilidade e cloud nativa.',
      icone: '🐳',
    },
    {
      nome: 'W3Schools',
      url: 'https://www.w3schools.com',
      descricao: '🧪 Aprendizado rápido e prático',
      detalhes: 'Testes interativos de HTML, CSS, JS, SQL e outras linguagens.',
      icone: '🌐',
    },
    {
      nome: 'MDN Web Docs',
      url: 'https://developer.mozilla.org',
      descricao: '📚 Referência oficial da Web',
      detalhes: 'Documentação profunda de HTML, CSS, JavaScript e APIs.',
      icone: '📘',
    },
    {
      nome: 'CodeCombat',
      url: 'https://codecombat.com',
      descricao: '🎮 Aprenda programacao jogando',
      detalhes: 'Plataforma gamificada com desafios de logica, Python e JavaScript por fases.',
      icone: '🕹️',
    },
    {
      nome: 'CheckiO',
      url: 'https://checkio.org',
      descricao: '🧩 Desafios de programacao em formato de missao',
      detalhes: 'Resolva problemas em Python ou JavaScript e veja como outros devs solucionaram.',
      icone: '🧩',
    },
    {
      nome: 'HackerRank',
      url: 'https://www.hackerrank.com',
      descricao: '🏆 Desafios e ranking tecnico',
      detalhes: 'Problemas de programacao com sistema de ranking, trilhas e badges.',
      icone: '🏆',
    },
    {
      nome: 'LeetCode',
      url: 'https://leetcode.com',
      descricao: '🧠 Treino para entrevistas',
      detalhes: 'Exercicios de algoritmos com progresso por niveis e comunidade ativa.',
      icone: '🧪',
    },
    {
      nome: 'Codewars',
      url: 'https://www.codewars.com',
      descricao: '🥋 Progressao estilo jogo',
      detalhes: 'Sistema de niveis kyu/dan que gamifica o aprendizado de codigo.',
      icone: '🥋',
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
      nome: 'Frontend Mentor',
      url: 'https://www.frontendmentor.io',
      descricao: '🎨 Desafios reais de front-end',
      detalhes: 'Projetos praticos com niveis de dificuldade e sistema de feedback da comunidade.',
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
      if (filtro === 'fundamentos') {
        return (
          texto.includes('iniciante') ||
          texto.includes('fundamento') ||
          texto.includes('lógica') ||
          texto.includes('certificado')
        );
      }
      if (filtro === 'fullstack') {
        return (
          texto.includes('react') ||
          texto.includes('javascript') ||
          texto.includes('node') ||
          texto.includes('web')
        );
      }
      if (filtro === 'ensino-gamificado') {
        return this.nomesGamificados.has(item.nome.toLowerCase());
      }
      return (
        texto.includes('devops') ||
        texto.includes('cloud') ||
        texto.includes('aws') ||
        texto.includes('kubernetes')
      );
    });
  });

  descricaoIcone(texto: string): string {
    return texto.split(' ')[0] ?? '';
  }

  descricaoTexto(texto: string): string {
    return texto.split(' ').slice(1).join(' ');
  }

  // Estado do Modal Retrô de Sugestão
  modalAberto = signal<boolean>(false);
  nomeSugestao = signal<string>('');
  urlSugestao = signal<string>('');
  enviando = signal<boolean>(false);
  feedback = signal<{ sucesso: boolean; texto: string } | null>(null);

  alterarFiltro(
    filtro: 'todos' | 'fundamentos' | 'fullstack' | 'cloud-devops' | 'ensino-gamificado',
  ) {
    this.filtroAtivo.set(filtro);
  }

  abrirModalSugestao() {
    this.nomeSugestao.set('');
    this.urlSugestao.set('');
    this.feedback.set(null);
    this.enviando.set(false);
    this.modalAberto.set(true);
  }

  fecharModalSugestao() {
    this.modalAberto.set(false);
  }

  async submeterSugestao() {
    const nome = this.nomeSugestao().trim();
    const url = this.urlSugestao().trim();

    if (!nome || !url) {
      this.feedback.set({ sucesso: false, texto: 'Preencha todos os campos obrigatórios.' });
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      this.feedback.set({ sucesso: false, texto: 'A URL deve iniciar com http:// ou https://' });
      return;
    }

    this.enviando.set(true);
    this.feedback.set(null);

    try {
      await this.firestoreService.enviarSugestao({
        nome,
        url,
        dataSugerida: new Date(),
      });
      this.feedback.set({
        sucesso: true,
        texto: 'Sugestão gravada com sucesso no Firestore! Obrigado! 🚀',
      });
      setTimeout(() => {
        this.fecharModalSugestao();
      }, 2000);
    } catch (error) {
      console.error('Erro ao enviar sugestão:', error);
      this.feedback.set({
        sucesso: false,
        texto: 'Erro ao conectar ao banco de dados. Tente novamente.',
      });
    } finally {
      this.enviando.set(false);
    }
  }

  voltar() {
    this.loadingService.showReturning();
    setTimeout(() => {
      this.router.navigate(['/']);
      this.loadingService.hide();
    }, 800);
  }
}
