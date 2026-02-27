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
  styles: [
    `
      .sites-layout {
        --sidebar-width: 380px;
        width: 100%;
        min-height: calc(100vh - 1px);
      }

      .sidebar-sites {
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

      .sidebar-sites h2 {
        color: var(--color-text);
        margin: 0 0 18px;
        font-size: 1.8rem;
        font-family: 'Press Start 2P', var(--font-montserrat);
        line-height: 1.25;
        text-shadow: 0 0 6px rgba(77, 163, 255, 0.6), 0 0 14px rgba(77, 163, 255, 0.35);
      }

      .sidebar-sites p {
        margin: 0 0 36px;
        color: #d4d8e3;
        line-height: 1.65;
        font-size: 1.16rem;
        font-weight: 600;
      }

      .menu-sites {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: auto;
      }

      .menu-sites button {
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

      .menu-sites button.ativo {
        border-color: var(--color-accent);
        background: rgba(227, 112, 47, 0.15);
        box-shadow: var(--neon-sepia);
      }

      .conteudo-sites {
        min-width: 0;
        margin-left: calc(var(--sidebar-width) + 26px);
        padding: 34px 24px 60px 0;
      }

      @media (max-width: 900px) {
        .sidebar-sites {
          position: static;
          width: 100%;
          border-right: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: none;
          padding: 22px 16px;
        }

        .menu-sites {
          margin-bottom: 18px;
        }

        .conteudo-sites {
          margin-left: 0;
          padding: 24px 16px 40px;
        }
      }
    `,
  ],
})
export class SitesAprendizado {
  private firestoreService = inject(FirestoreService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  filtroAtivo = signal<'todos' | 'fundamentos' | 'fullstack' | 'cloud-devops'>('todos');

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

  alterarFiltro(filtro: 'todos' | 'fundamentos' | 'fullstack' | 'cloud-devops') {
    this.filtroAtivo.set(filtro);
  }

  async sugerirPlataforma() {
    const nome = window.prompt('Qual o nome da plataforma?');
    const url = window.prompt('Qual a URL da plataforma?');

    if (nome && url) {
      try {
        await this.firestoreService.enviarSugestao({
          nome,
          url,
          dataSugerida: new Date(),
        });
        alert('Obrigado! Sua sugestão foi enviada com sucesso para o banco de dados. 🚀');
      } catch (error) {
        console.error('Erro ao enviar para o Firestore:', error);
        alert('Ops! Ocorreu um erro ao enviar. Verifique o console.');
      }
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
