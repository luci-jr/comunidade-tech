import { Component, signal } from '@angular/core';
import { SistemaOperacional } from '../../models/sistema-operacional.model';

@Component({
  selector: 'app-sistemas-operacionais-linux',
  standalone: true,
  imports: [],
  template: `
    <section class="secao-so">
      <header class="header-pagina">
        <h1><span class="icone-titulo">🐧</span> Trilha Linux</h1>
        <p>Distribuicoes, comparadores e ambientes para evoluir no ecossistema open-source.</p>
      </header>

      <div class="grid-so">
        @for (so of listaLinux(); track so.nome) {
          <a [href]="so.url" target="_blank" rel="noopener noreferrer" class="card-so">
            <div class="card-header">
              <span class="so-icon">{{ so.icone }}</span>
              <h2>{{ so.nome }}</h2>
            </div>
            <div class="card-body">
              <p class="description">{{ so.descricaoCurta }}</p>
              <p class="detalhes">{{ so.detalhes }}</p>
            </div>
            <div class="card-footer">
              <span class="link-texto">Explorar recurso 🔗</span>
            </div>
          </a>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .secao-so {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .header-pagina h1 {
        margin: 0 0 18px;
        color: var(--color-text);
        font-family: 'Press Start 2P', var(--font-montserrat);
        font-size: 2.25rem;
        line-height: 1.2;
        text-shadow:
          0 0 6px rgba(77, 163, 255, 0.75),
          0 0 18px rgba(77, 163, 255, 0.45),
          0 0 30px rgba(77, 163, 255, 0.3);
      }

      .icone-titulo {
        font-size: 1.35em;
      }

      .header-pagina p {
        margin: 0;
        color: var(--color-muted);
        font-size: 1.18rem;
        line-height: 1.55;
      }

      .grid-so {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 18px;
      }

      .card-so {
        background-color: var(--color-surface);
        border-radius: 16px;
        padding: 18px;
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: column;
        gap: 12px;
        border: 1px solid transparent;
        transition: transform 0.2s ease, border-color 0.2s ease;
        text-align: center;
      }

      .card-so:hover {
        transform: translateY(-4px);
        border-color: var(--color-accent);
      }

      .card-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }

      .so-icon {
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

      .card-header h2 {
        margin: 0;
        font-size: 1.28rem;
      }

      .description {
        margin: 0 0 6px;
        color: var(--color-text);
        font-weight: 700;
        font-size: 1.08rem;
      }

      .detalhes {
        margin: 0;
        color: var(--color-muted);
        line-height: 1.55;
        font-size: 1.02rem;
      }

      .link-texto {
        color: var(--color-primary);
        font-weight: 600;
        font-size: 1.03rem;
      }
    `,
  ],
})
export class SistemasOperacionaisLinux {
  listaLinux = signal<SistemaOperacional[]>([
    {
      nome: 'DistroWatch',
      url: 'https://distrowatch.com/?language=PT',
      icone: '🧭',
      descricaoCurta: 'Comparador de distribuicoes Linux e BSD',
      detalhes: 'Rankings, novidades e detalhes tecnicos para escolher uma distro com mais seguranca.',
    },
    {
      nome: 'Ubuntu',
      url: 'https://ubuntu.com/',
      icone: '🟠',
      descricaoCurta: 'Distribuicao Linux popular e estavel',
      detalhes: 'Muito usada em desktop e servidor, com grande comunidade e excelente documentacao.',
    },
    {
      nome: 'Fedora Project',
      url: 'https://fedoraproject.org/pt-br/',
      icone: '🐻',
      descricaoCurta: 'Linux com tecnologias recentes',
      detalhes: 'Boa opcao para devs que querem recursos modernos e integracao forte com ecossistema open-source.',
    },
    {
      nome: 'Pop!_OS',
      url: 'https://system76.com/pop/',
      icone: '🚀',
      descricaoCurta: 'Linux focado em produtividade',
      detalhes: 'Distribuicao baseada em Ubuntu, otimizada para desenvolvimento e multitarefa.',
    },
    {
      nome: 'BigLinux',
      url: 'https://www.biglinux.com.br/',
      icone: '🇧🇷',
      descricaoCurta: 'Linux amigavel para usuarios brasileiros',
      detalhes: 'Interface acessivel e ferramentas prontas para facilitar a migracao de iniciantes.',
    },
  ]);
}
