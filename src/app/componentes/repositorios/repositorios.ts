import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../../servicos/loading.service';
import { RepositorioGit } from '../../models/repositorio-git.model';

@Component({
  selector: 'app-repositorios',
  standalone: true,
  imports: [],
  template: `
    <div class="container-repos">
      <header class="header-pagina">
        <h1>💻 REPOSITÓRIOS PARA ESTUDO</h1>
      </header>

      <div class="grid-repos">
        @for (repo of listaRepositorios(); track repo.nome) {
          <a [href]="repo.url" target="_blank" class="card-repo">
            <div class="card-header">
              <span class="lang-tag">{{ repo.linguagem }}</span>
              <h2>{{ repo.nome }}</h2>
            </div>
            <div class="card-body">
              <p class="description">{{ repo.descricaoCurta }}</p>
              <p class="detalhes">{{ repo.detalhes }}</p>
            </div>
            <div class="card-footer">
              <span class="link-texto">Ver no GitHub 🐙</span>
            </div>
          </a>
        }
      </div>

      <div class="footer-controles">
        <button (click)="voltar()" class="btn-voltar-estilizado">⬅ Voltar</button>
      </div>
    </div>
  `,
  styles: [
    `
      .container-repos {
        padding: 60px 20px;
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
      }

      .header-pagina {
        width: 100%;
        text-align: center;
        margin-bottom: 60px;
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
      }

      .detalhes {
        color: var(--color-muted);
        font-size: 0.9rem;
        line-height: 1.6;
        margin-bottom: 16px;
      }

      .footer-controles {
        margin-top: 50px;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding-bottom: 40px;
      }

      .btn-voltar-estilizado {
        padding: 12px 35px;
        font-size: 1.1rem;
        background-color: var(--color-surface);
        color: var(--color-text);
        border: 2px solid var(--color-accent);
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        font-weight: bold;
        font-family: var(--font-montserrat);
        box-shadow: var(--shadow);
      }

      .btn-voltar-estilizado:hover {
        background-color: var(--color-accent);
        color: white;
        box-shadow: var(--neon-sepia);
        transform: scale(1.05);
      }

      .link-texto {
        font-weight: 600;
        color: var(--color-primary);
        font-size: 0.95rem;
      }
    `,
  ],
})
export class Repositorios {
  private loadingService = inject(LoadingService);
  private router = inject(Router);

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

  voltar() {
    this.loadingService.showReturning();
    setTimeout(() => {
      this.router.navigate(['/']);
      this.loadingService.hide();
    }, 800);
  }
}
