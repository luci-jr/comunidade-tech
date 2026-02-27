import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../../servicos/loading.service';
import { Podcast } from '../../models/podcast.model';

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [],
  template: `
    <div class="container-podcasts">
      <header class="header-pagina">
        <h1>🎙️ PODCASTS TECH RECOMENDADOS</h1>
      </header>

      <div class="grid-podcasts">
        @for (pod of listaPodcasts(); track pod.nome) {
          <a [href]="pod.url" target="_blank" class="card-podcast">
            <div class="card-header">
              <span class="pod-icon">{{ pod.icone }}</span>
              <h2>{{ pod.nome }}</h2>
              <span class="pod-icon flipped">{{ pod.icone }}</span>
            </div>
            <div class="card-body">
              <p class="description">{{ pod.descricaoCurta }}</p>
              <p class="detalhes">{{ pod.detalhes }}</p>
            </div>
            <div class="card-footer">
              <span class="link-texto">Ouvir Agora 🎧</span>
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
      .container-podcasts {
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

      .grid-podcasts {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 30px;
      }

      .card-podcast {
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

      .card-podcast:hover {
        transform: translateY(-8px);
        box-shadow: var(--neon-sepia);
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
        font-size: 1.5rem;
        display: inline-block;
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
        padding: 15px 40px;
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
export class Podcasts {
  private loadingService = inject(LoadingService);
  private router = inject(Router);

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

  voltar() {
    console.log('Botão Voltar clicado em Podcasts');
    this.loadingService.showReturning();
    setTimeout(() => {
      this.router.navigate(['/']);
      this.loadingService.hide();
    }, 2000);
  }
}
