import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../../servicos/loading.service';
import { Podcast } from '../../models/podcast.model';

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [],
  template: `
    <div class="podcasts-layout">
      <aside class="sidebar-podcasts">
        <h2>Podcasts Tech</h2>
        <p>Escolha uma trilha para ouvir conteúdos mais direcionados.</p>

        <nav class="menu-podcasts">
          <button [class.ativo]="filtroAtivo() === 'devops'" (click)="alterarFiltro('devops')">
            DevOps
          </button>
          <button [class.ativo]="filtroAtivo() === 'dados-ia'" (click)="alterarFiltro('dados-ia')">
            Dados e IA
          </button>
          <button [class.ativo]="filtroAtivo() === 'carreira'" (click)="alterarFiltro('carreira')">
            Carreira
          </button>
          <button [class.ativo]="filtroAtivo() === 'todos'" (click)="alterarFiltro('todos')">
            Todos
          </button>
        </nav>

        <button (click)="voltar()" class="btn-voltar-estilizado">⬅ Voltar</button>
      </aside>

      <main class="conteudo-podcasts">
        <header class="header-pagina">
          <h1>🎙️ PODCASTS TECH RECOMENDADOS 🎙️</h1>
        </header>

        <div class="grid-podcasts">
          @for (pod of podcastsFiltrados(); track pod.nome) {
            <a [href]="pod.url" target="_blank" class="card-podcast">
              <div class="card-header">
                <span class="pod-icon">{{ pod.icone }}</span>
                <h2>{{ pod.nome }}</h2>
                <span class="pod-icon flipped">{{ pod.icone }}</span>
              </div>
              <div class="card-body">
                <p class="description">
                  <span class="desc-icon">{{ descricaoIcone(pod.descricaoCurta) }}</span>
                  <span>{{ descricaoTexto(pod.descricaoCurta) }}</span>
                </p>
                <p class="detalhes">{{ pod.detalhes }}</p>
              </div>
              <div class="card-footer">
                <span class="link-texto">Ouvir Agora 🎧</span>
              </div>
            </a>
          }
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      .podcasts-layout {
        --sidebar-width: 380px;
        width: 100%;
        min-height: calc(100vh - 1px);
      }

      .sidebar-podcasts {
        position: fixed;
        inset: 0 auto 0 0;
        width: var(--sidebar-width);
        background: rgba(14, 18, 32, 0.78);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-right: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 8px 0 28px rgba(0, 0, 0, 0.4);
        padding: 34px 24px;
        display: flex;
        flex-direction: column;
      }

      .sidebar-podcasts h2 {
        color: var(--color-text);
        margin: 0 0 18px;
        font-size: 1.8rem;
        font-family: 'Press Start 2P', var(--font-montserrat);
        line-height: 1.25;
        text-shadow:
          0 0 6px rgba(77, 163, 255, 0.6),
          0 0 14px rgba(77, 163, 255, 0.35);
      }

      .sidebar-podcasts p {
        margin: 0 0 36px;
        color: #d4d8e3;
        line-height: 1.65;
        font-size: 1.16rem;
        font-weight: 600;
      }

      .menu-podcasts {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: auto;
      }

      .menu-podcasts button {
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

      .menu-podcasts button.ativo {
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

      .conteudo-podcasts {
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

      .grid-podcasts {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 30px;
      }

      .card-podcast {
        background: rgba(18, 22, 38, 0.74);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
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
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.38);
        min-height: 320px;
      }

      .card-podcast:hover {
        transform: translateY(-8px);
        background: rgba(26, 33, 56, 0.88);
        box-shadow: 0 12px 36px rgba(0, 0, 0, 0.55), var(--neon-sepia);
        border-color: var(--color-accent);
      }

      .card-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        margin-bottom: 20px;
        width: 100%;
      }

      .pod-icon {
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

      .pod-icon.flipped {
        transform: scaleX(-1);
      }

      .card-header h2 {
        font-size: 1.3rem;
        margin: 0;
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
        .sidebar-podcasts {
          position: static;
          width: 100%;
          border-right: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: none;
          padding: 22px 16px;
        }

        .menu-podcasts {
          margin-bottom: 18px;
        }

        .conteudo-podcasts {
          margin-left: 0;
          padding: 24px 16px 40px;
        }
      }
    `,
  ],
})
export class Podcasts {
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  filtroAtivo = signal<'todos' | 'devops' | 'dados-ia' | 'carreira'>('todos');

  listaPodcasts = signal<Podcast[]>([
    {
      nome: 'Hipsters.tech (Alura)',
      url: 'https://hipsters.tech',
      icone: '🎙️',
      descricaoCurta: '💡 Um dos podcasts tech mais tradicionais do Brasil.',
      detalhes:
        'Discussões sobre desenvolvimento, arquitetura, DevOps, dados, IA e mercado de tecnologia, com convidados experientes.',
    },
    {
      nome: 'Diocast (Diolinux)',
      url: 'https://diolinux.com.br',
      icone: '🐧',
      descricaoCurta: '🐧 Foco em Linux, software livre e comunidade open source.',
      detalhes: 'Ótimo para quem usa Linux no dia a dia ou quer migrar do Windows.',
    },
    {
      nome: 'Código Fonte Café',
      url: 'https://codigofonte.com.br',
      icone: '☕',
      descricaoCurta:
        '⚙️ Conversas sobre mercado, DevOps, cloud, carreira e atualizações do ecossistema tech.',
      detalhes: 'Perspectivas reais sobre o mercado de trabalho e novas tecnologias.',
    },
    {
      nome: 'Curso em Vídeo Podcast',
      url: 'https://www.youtube.com/c/CursoemVídeo',
      icone: '🎓',
      descricaoCurta: '📚 Conteúdo voltado para iniciantes e estudantes de programação.',
      detalhes: 'Explicações acessíveis sobre fundamentos, carreira e aprendizado.',
    },
    {
      nome: 'Data Hackers Podcast',
      url: 'https://datahackers.com.br',
      icone: '📊',
      descricaoCurta: '📈 Ciência de dados, IA e machine learning com profissionais da área.',
      detalhes: 'Tudo sobre o mundo dos dados, desde analytics até deep learning.',
    },
    {
      nome: 'Syntax',
      url: 'https://syntax.fm',
      icone: '🌐',
      descricaoCurta: '🚀 Foco em desenvolvimento web moderno (React, JS, tooling).',
      detalhes: 'Dicas práticas de dois desenvolvedores full stack (Wes Bos e Scott Tolinski).',
    },
    {
      nome: 'Software Engineering Daily',
      url: 'https://softwareengineeringdaily.com',
      icone: '🧠',
      descricaoCurta: '🎓 Engenharia de software, infraestrutura, startups e arquitetura.',
      detalhes: 'Entrevistas técnicas profundas sobre como os grandes sistemas são construídos.',
    },
    {
      nome: 'DevNaEstrada',
      url: 'https://devnaestrada.com.br',
      icone: '🔧',
      descricaoCurta: '🛣️ Carreira, mercado e vivência real de desenvolvedores.',
      detalhes: 'Bate-papo descontraído sobre a realidade da vida de quem trabalha com código.',
    },
  ]);

  podcastsFiltrados = computed(() => {
    const filtro = this.filtroAtivo();
    if (filtro === 'todos') return this.listaPodcasts();

    return this.listaPodcasts().filter((pod) => {
      const texto = `${pod.descricaoCurta} ${pod.detalhes}`.toLowerCase();
      if (filtro === 'devops') {
        return texto.includes('devops') || texto.includes('linux') || texto.includes('cloud');
      }
      if (filtro === 'dados-ia') {
        return (
          texto.includes('dados') || texto.includes('ia') || texto.includes('machine learning')
        );
      }
      return texto.includes('carreira') || texto.includes('mercado') || texto.includes('vivência');
    });
  });

  descricaoIcone(texto: string): string {
    return texto.split(' ')[0] ?? '';
  }

  descricaoTexto(texto: string): string {
    return texto.split(' ').slice(1).join(' ');
  }

  alterarFiltro(filtro: 'todos' | 'devops' | 'dados-ia' | 'carreira') {
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
