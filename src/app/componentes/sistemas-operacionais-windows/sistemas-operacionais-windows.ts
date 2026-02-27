import { Component, signal } from '@angular/core';
import { SistemaOperacional } from '../../models/sistema-operacional.model';

@Component({
  selector: 'app-sistemas-operacionais-windows',
  standalone: true,
  imports: [],
  template: `
    <section class="secao-so">
      <header class="header-pagina">
        <h1><span class="icone-titulo">🪟</span> Trilha Windows</h1>
        <p>Recursos essenciais para produtividade, desenvolvimento e ambiente profissional.</p>
      </header>

      <div class="grid-so">
        @for (so of listaWindows(); track so.nome) {
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
export class SistemasOperacionaisWindows {
  listaWindows = signal<SistemaOperacional[]>([
    {
      nome: 'Windows (Microsoft)',
      url: 'https://www.microsoft.com/pt-br/windows/?r=1',
      icone: '🪟',
      descricaoCurta: 'Sistema operacional comercial amplamente usado',
      detalhes: 'Base para trabalho corporativo, desenvolvimento, jogos e uso pessoal no dia a dia.',
    },
    {
      nome: 'Documentacao Windows',
      url: 'https://learn.microsoft.com/pt-br/windows/',
      icone: '📚',
      descricaoCurta: 'Guias oficiais e boas praticas',
      detalhes: 'Referencia oficial com arquitetura, configuracoes, administracao e desenvolvimento no ecossistema Windows.',
    },
    {
      nome: 'WSL (Windows Subsystem for Linux)',
      url: 'https://learn.microsoft.com/pt-br/windows/wsl/',
      icone: '🐧',
      descricaoCurta: 'Linux integrado ao Windows para devs',
      detalhes: 'Permite executar ferramentas Linux no Windows, acelerando fluxos de Node, Python, Docker e Git.',
    },
    {
      nome: 'Windows Server',
      url: 'https://learn.microsoft.com/pt-br/windows-server/',
      icone: '🖥️',
      descricaoCurta: 'Configuracao e administracao de servidores Windows',
      detalhes:
        'Guias oficiais para Active Directory, DNS, politicas de grupo, seguranca e operacao de ambientes corporativos.',
    },
    {
      nome: 'IIS (Internet Information Services)',
      url: 'https://learn.microsoft.com/pt-br/iis/',
      icone: '🌐',
      descricaoCurta: 'Hospedagem de aplicacoes web no Windows',
      detalhes:
        'Conteudo para instalar, configurar sites, publicar APIs e ajustar performance e seguranca no servidor web da Microsoft.',
    },
  ]);
}
