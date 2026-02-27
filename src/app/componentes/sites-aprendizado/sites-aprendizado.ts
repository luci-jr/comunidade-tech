import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PlataformaEnsino } from '../../models/plataforma-ensino.model';
import { FirestoreService } from '../../servicos/firestore.service';
import { LoadingService } from '../../servicos/loading.service';

@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [],
  template: `
    <div class="container-plataformas">
      <header class="header-pagina">
        <h1>🎓 PLATAFORMAS DE ENSINO RECOMENDADAS</h1>
        <button (click)="sugerirPlataforma()" class="btn-sugerir">
          ➕ Sugerir Nova Plataforma
        </button>
      </header>

      <div class="grid-plataformas">
        @for (item of listaPlataformas(); track item.nome) {
          <a [href]="item.url" target="_blank" class="card-plataforma">
            <div class="card-header">
              <span class="site-icon">{{ item.icone }}</span>
              <h2>{{ item.nome }}</h2>
              <span class="site-icon flipped">{{ item.icone }}</span>
            </div>
            <div class="card-body">
              <p class="description">{{ item.descricao }}</p>
              <p class="detalhes">{{ item.detalhes }}</p>
            </div>
            <div class="card-footer">
              <span class="link-texto">Acessar Plataforma 🔗</span>
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
      .container-plataformas {
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
        margin: 0 0 20px 0;
        text-transform: uppercase;
        letter-spacing: 2px;
      }

      .btn-sugerir {
        padding: 10px 25px;
        background: transparent;
        color: var(--color-accent);
        border: 2px solid var(--color-accent);
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s;
        font-family: var(--font-montserrat);
      }

      .btn-sugerir:hover {
        background: var(--color-accent);
        color: #fff;
        box-shadow: var(--neon-sepia);
        transform: scale(1.05);
      }

      .grid-plataformas {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 30px;
      }

      .card-plataforma {
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

      .card-plataforma:hover {
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

      .site-icon {
        font-size: 1.2rem;
        display: inline-block;
      }

      .site-icon.flipped {
        transform: scaleX(-1);
      }

      .card-header h2 {
        font-size: 1.4rem;
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
        font-size: 1.1rem;
      }

      .detalhes {
        color: var(--color-muted);
        font-size: 0.95rem;
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
        font-size: 1rem;
      }
    `,
  ],
})
export class SitesAprendizado {
  private firestoreService = inject(FirestoreService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);

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
    console.log('Botão Voltar clicado em SitesAprendizado');
    this.loadingService.showReturning();
    setTimeout(() => {
      this.router.navigate(['/']);
      this.loadingService.hide();
    }, 800);
  }
}
