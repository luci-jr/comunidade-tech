import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../../servicos/loading.service';
import { RepositorioGit } from '../../models/repositorio-git.model';

@Component({
  selector: 'app-repositorios',
  standalone: true,
  imports: [],
  template: `
    <div class="repos-layout">
      <aside class="sidebar-repos">
        <h2>Repositórios</h2>
        <p>Filtre por tipo de conteúdo para acelerar sua trilha de estudo.</p>

        <nav class="menu-repos">
          <button [class.ativo]="filtroAtivo() === 'python'" (click)="alterarFiltro('python')">
            Python
          </button>
          <button
            [class.ativo]="filtroAtivo() === 'javascript'"
            (click)="alterarFiltro('javascript')"
          >
            JavaScript
          </button>
          <button [class.ativo]="filtroAtivo() === 'trilhas'" (click)="alterarFiltro('trilhas')">
            Trilhas
          </button>
          <button [class.ativo]="filtroAtivo() === 'todos'" (click)="alterarFiltro('todos')">
            Todos
          </button>
        </nav>

        <button (click)="voltar()" class="btn-voltar-estilizado">⬅ Voltar</button>
      </aside>

      <main class="conteudo-repos">
        <header class="header-pagina">
          <h1>💻 REPOSITÓRIOS PARA ESTUDO 💻</h1>
        </header>

        <div class="grid-repos">
          @for (repo of reposFiltrados(); track repo.nome) {
            <a [href]="repo.url" target="_blank" class="card-repo">
              <div class="card-header">
                <span class="lang-tag">{{ repo.linguagem }}</span>
                <h2>{{ repo.nome }}</h2>
              </div>
              <div class="card-body">
                <p class="description">
                  <span class="desc-icon">{{ descricaoIcone(repo.descricaoCurta) }}</span>
                  <span>{{ descricaoTexto(repo.descricaoCurta) }}</span>
                </p>
                <p class="detalhes">{{ repo.detalhes }}</p>
              </div>
              <div class="card-footer">
                <span class="link-texto">Ver no GitHub 🐙</span>
              </div>
            </a>
          }
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      .repos-layout {
        --sidebar-width: 380px;
        width: 100%;
        min-height: calc(100vh - 1px);
      }

      .sidebar-repos {
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

      .sidebar-repos h2 {
        color: var(--color-text);
        margin: 0 0 18px;
        font-size: 1.8rem;
        font-family: 'Press Start 2P', var(--font-montserrat);
        line-height: 1.25;
        text-shadow:
          0 0 6px rgba(77, 163, 255, 0.6),
          0 0 14px rgba(77, 163, 255, 0.35);
      }

      .sidebar-repos p {
        margin: 0 0 36px;
        color: #d4d8e3;
        line-height: 1.65;
        font-size: 1.16rem;
        font-weight: 600;
      }

      .menu-repos {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: auto;
      }

      .menu-repos button {
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

      .menu-repos button.ativo {
        border-color: var(--color-accent);
        background: rgba(227, 112, 47, 0.15);
        box-shadow: var(--neon-sepia);
      }

      .btn-voltar-estilizado {
        width: 100%;
        padding: 13px 18px;
        font-size: 1rem;
        background-color: transparent;
        color: var(--color-text);
        border: 2px solid var(--color-accent);
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: bold;
      }

      .btn-voltar-estilizado:hover {
        background-color: var(--color-accent);
        color: white;
      }

      .conteudo-repos {
        min-width: 0;
        margin-left: calc(var(--sidebar-width) + 26px);
        padding: 34px 24px 60px 0;
      }

      .header-pagina {
        width: 100%;
        text-align: center;
        margin-bottom: 46px;
      }

      .header-pagina h1 {
        font-size: 2.5rem;
        color: var(--color-text);
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 2px;
      }

      .grid-repos {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 30px;
      }

      .card-repo {
        background-color: var(--color-surface);
        border-radius: 16px;
        padding: 24px;
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-content: space-between;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border: 2px solid transparent;
        box-shadow: var(--shadow);
        min-height: 320px;
      }

      .card-repo:hover {
        transform: translateY(-8px);
        box-shadow: var(--neon-sepia);
        border-color: var(--color-accent);
      }

      .card-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        width: 100%;
      }

      .lang-tag {
        font-size: 0.75rem;
        background: var(--color-accent);
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-weight: bold;
        text-transform: uppercase;
      }

      .card-header h2 {
        font-size: 1.3rem;
        margin: 10px 0 0;
        color: var(--color-text);
        font-weight: bold;
      }

      .card-body {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .description {
        font-weight: 700;
        color: var(--color-text);
        margin-bottom: 12px;
        font-size: 1rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
      }

      .desc-icon {
        width: 34px;
        height: 34px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 1.35rem;
        line-height: 1;
        flex-shrink: 0;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 9px;
        background: rgba(255, 255, 255, 0.04);
      }

      .detalhes {
        color: var(--color-muted);
        font-size: 0.9rem;
        line-height: 1.6;
        margin-bottom: 16px;
      }

      .link-texto {
        font-weight: 600;
        color: var(--color-primary);
        font-size: 0.95rem;
      }

      @media (max-width: 900px) {
        .sidebar-repos {
          position: static;
          width: 100%;
          border-right: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: none;
          padding: 22px 16px;
        }

        .menu-repos {
          margin-bottom: 18px;
        }

        .conteudo-repos {
          margin-left: 0;
          padding: 24px 16px 40px;
        }
      }
    `,
  ],
})
export class Repositorios {
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  filtroAtivo = signal<'todos' | 'python' | 'javascript' | 'trilhas'>('todos');

  listaRepositorios = signal<RepositorioGit[]>([
    {
      nome: 'Awesome Programming',
      url: 'https://github.com/jackfrued/Python-100-Days',
      descricaoCurta: '🐍 Domine Python em 100 dias.',
      detalhes: 'Um guia completo do zero ao avançado com exemplos práticos e projetos.',
      linguagem: 'Python',
    },
    {
      nome: 'The Algorithm - JS',
      url: 'https://github.com/TheAlgorithms/JavaScript',
      descricaoCurta: '🧠 Algoritmos e Estruturas de Dados.',
      detalhes: 'Implementação de algoritmos fundamentais em JavaScript para estudo e prática.',
      linguagem: 'JavaScript',
    },
    {
      nome: 'Web Dev Roadmap',
      url: 'https://github.com/kamranahmedse/developer-roadmap',
      descricaoCurta: '🗺️ Mapas de estudo para desenvolvedores.',
      detalhes: 'O guia visual definitivo para trilhas Front-end, Back-end e DevOps.',
      linguagem: 'Markdown',
    },
    {
      nome: 'Public APIs',
      url: 'https://github.com/public-apis/public-apis',
      descricaoCurta: '🔌 Lista gigante de APIs gratuitas.',
      detalhes: 'Excelente para encontrar dados para seus projetos pessoais de estudo.',
      linguagem: 'Python',
    },
    {
      nome: '30 seconds of code',
      url: 'https://github.com/30-seconds/30-seconds-of-code',
      descricaoCurta: '⚡ Pílulas de código JavaScript.',
      detalhes: 'Snippets curtos e úteis para entender funções modernas do JS.',
      linguagem: 'JavaScript',
    },
    {
      nome: 'Project Based Learning',
      url: 'https://github.com/practical-tutorials/project-based-learning',
      descricaoCurta: '🛠️ Aprenda construindo projetos.',
      detalhes: 'Lista de tutoriais para criar sistemas reais em diversas linguagens.',
      linguagem: 'Mixed',
    },
  ]);

  reposFiltrados = computed(() => {
    const filtro = this.filtroAtivo();
    if (filtro === 'todos') return this.listaRepositorios();

    return this.listaRepositorios().filter((repo) => {
      const linguagem = repo.linguagem.toLowerCase();
      const texto = `${repo.nome} ${repo.descricaoCurta} ${repo.detalhes}`.toLowerCase();

      if (filtro === 'python') return linguagem.includes('python');
      if (filtro === 'javascript') return linguagem.includes('javascript');
      return (
        linguagem.includes('markdown') || linguagem.includes('mixed') || texto.includes('trilha')
      );
    });
  });

  descricaoIcone(texto: string): string {
    return texto.split(' ')[0] ?? '';
  }

  descricaoTexto(texto: string): string {
    return texto.split(' ').slice(1).join(' ');
  }

  alterarFiltro(filtro: 'todos' | 'python' | 'javascript' | 'trilhas') {
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
