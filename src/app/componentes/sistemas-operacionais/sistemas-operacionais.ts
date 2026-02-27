import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../../servicos/loading.service';
import { SistemaOperacional } from '../../models/sistema-operacional.model';

@Component({
  selector: 'app-so',
  standalone: true,
  imports: [],
  template: `
    <div class="container-so">
      <header class="header-pagina">
        <h1>🐧 SISTEMAS OPERACIONAIS & FERRAMENTAS</h1>
      </header>

      <div class="grid-so">
        @for (so of listaSistemas(); track so.nome) {
          <a [href]="so.url" target="_blank" class="card-so">
            <div class="card-header">
              <span class="so-icon">{{ so.icone }}</span>
              <h2>{{ so.nome }}</h2>
              <span class="so-icon flipped">{{ so.icone }}</span>
            </div>
            <div class="card-body">
              <p class="description">{{ so.descricaoCurta }}</p>
              <p class="detalhes">{{ so.detalhes }}</p>
            </div>
            <div class="card-footer">
              <span class="link-texto">Explorar Sistema 🔗</span>
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
      .container-so {
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

      .grid-so {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 30px;
      }

      .card-so {
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

      .card-so:hover {
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

      .so-icon {
        font-size: 1.5rem;
        display: inline-block;
      }

      .so-icon.flipped {
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
export class SistemasOperacionais {
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  listaSistemas = signal<SistemaOperacional[]>([
    {
      nome: 'DistroWatch',
      url: 'https://distrowatch.com/?language=PT',
      icone: '🧭',
      descricaoCurta: '📊 Portal de informações sobre distribuições Linux e BSD',
      detalhes:
        'Permite comparar, ver rankings de popularidade, notícias e detalhes técnicos de centenas de sistemas operacionais open-source.',
    },
    {
      nome: 'Ubuntu (Canonical)',
      url: 'https://ubuntu.com/',
      icone: '🟠',
      descricaoCurta: '📦 Distribuição Linux popular e estável',
      detalhes:
        'Foco em facilidade de uso, comunidade grande e suporte corporativo. Ideal tanto para desktop quanto servidores.',
    },
    {
      nome: 'Fedora Project',
      url: 'https://fedoraproject.org/pt-br/',
      icone: '🐻',
      descricaoCurta: '🧪 Linux com tecnologia de ponta',
      detalhes:
        'Distribuição patrocinada pela Red Hat, voltada para inovação e testes de novas tecnologias antes de chegarem ao enterprise.',
    },
    {
      nome: 'Pop!_OS (System76)',
      url: 'https://system76.com/pop/',
      icone: '🚀',
      descricaoCurta: '💻 Linux otimizado para produtividade e desenvolvimento',
      detalhes:
        'Baseado no Ubuntu, com foco em performance, suporte a hardware moderno e fluxo de trabalho para devs.',
    },
    {
      nome: 'Windows (Microsoft)',
      url: 'https://www.microsoft.com/pt-br/windows/?r=1',
      icone: '🪟',
      descricaoCurta: '💼 Sistema operacional comercial mais usado no mundo',
      detalhes:
        'Versátil para uso pessoal, corporativo e gaming, com ampla compatibilidade de software e hardware.',
    },
    {
      nome: 'Raspberry Pi OS',
      url: 'https://www.raspberrypi.com/',
      icone: '🍓',
      descricaoCurta: '🛠️ Soluções para computadores embarcados e educação',
      detalhes:
        'Sistema leve e otimizado para Raspberry Pi — ideal para aprendizado, projetos IoT e prototipação.',
    },
    {
      nome: 'BigLinux',
      url: 'https://www.biglinux.com.br/',
      icone: '🐧',
      descricaoCurta: '🇧🇷 Distribuição Linux com foco em usuários brasileiros',
      detalhes:
        'Interface amigável e pacotes configurados para facilitar a vida de quem está migrando para Linux.',
    },
  ]);

  voltar() {
    console.log('Botão Voltar clicado em SistemasOperacionais');
    this.loadingService.showReturning();
    setTimeout(() => {
      this.router.navigate(['/']);
      this.loadingService.hide();
    }, 2000);
  }
}
