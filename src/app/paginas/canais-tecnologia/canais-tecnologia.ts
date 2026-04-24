import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CanalYT } from '../../models/canal-yt.model';
import { LoadingService } from '../../servicos/loading.service';

@Component({
  selector: 'app-canais-tecnologia',
  standalone: true,
  imports: [],
  templateUrl: './canais-tecnologia.html',
  styleUrl: './canais-tecnologia.css',
  styles: [
    `
      .canais-layout {
        --sidebar-width: 380px;
        width: 100%;
        min-height: calc(100vh - 1px);
      }

      .sidebar-canais {
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

      .sidebar-canais h2 {
        color: var(--color-text);
        margin: 0 0 18px;
        font-size: 1.8rem;
        font-family: 'Press Start 2P', var(--font-montserrat);
        line-height: 1.25;
        text-shadow: 0 0 6px rgba(77, 163, 255, 0.6), 0 0 14px rgba(77, 163, 255, 0.35);
      }

      .sidebar-canais p {
        margin: 0 0 36px;
        color: #d4d8e3;
        line-height: 1.65;
        font-size: 1.16rem;
        font-weight: 600;
      }

      .menu-canais {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: auto;
      }

      .menu-canais button {
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

      .menu-canais button:hover {
        border-color: var(--color-accent);
      }

      .menu-canais button.ativo {
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

      .conteudo-canais {
        min-width: 0;
        margin-left: calc(var(--sidebar-width) + 26px);
        padding: 34px 24px 60px 0;
      }

      @media (max-width: 900px) {
        .sidebar-canais {
          position: static;
          width: 100%;
          border-right: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: none;
          padding: 22px 16px;
        }

        .menu-canais {
          margin-bottom: 18px;
        }

        .conteudo-canais {
          margin-left: 0;
          padding: 24px 16px 40px;
        }
      }
    `,
  ],
})
export class CanaisTecnologia {
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  filtroAtivo = signal<'todos' | 'backend' | 'devops' | 'carreira'>('todos');

  listaCanais = signal<CanalYT[]>([
    {
      nome: 'Curso em Vídeo',
      url: 'https://www.youtube.com/c/CursoemVídeo',
      description: '🎓 Gustavo Guanabara',
      detalhes:
        'Ideal para quem está iniciando em programação. Ensina lógica, Python, HTML, CSS e algoritmos de forma didática.',
    },
    {
      nome: 'Alura',
      url: 'https://www.youtube.com/c/Alura',
      description: '📊 Tendências e Mercado',
      detalhes:
        'Foco em mercado e tendências. Conteúdos sobre programação, DevOps, cloud, dados e carreira em TI.',
    },
    {
      nome: 'Fernanda Kipper',
      url: 'https://www.youtube.com/c/FernandaKipper',
      description: '☕ Backend na Prática',
      detalhes:
        'Java, Spring Boot, arquitetura de software e boas práticas de desenvolvimento backend.',
    },
    {
      nome: 'Código Fonte TV',
      url: 'https://www.youtube.com/c/CodigoFonteTV',
      description: '⚙️ Ecossistema Tech',
      detalhes: 'DevOps, cloud, Kubernetes e atualizações constantes do mercado de tecnologia.',
    },
    {
      nome: 'LinuxTips',
      url: 'https://www.youtube.com/c/LinuxTips',
      description: '🐳 Infra e DevOps',
      detalhes: 'Docker, Kubernetes, Linux e aplicações reais com foco em infraestrutura moderna.',
    },
    {
      nome: 'Rocketseat',
      url: 'https://www.youtube.com/c/Rocketseat',
      description: '💻 Web Moderno',
      detalhes: 'Desenvolvimento web moderno com React, Node.js, TypeScript e projetos práticos.',
    },
    {
      nome: 'Filipe Deschamps',
      url: 'https://www.youtube.com/c/FilipeDeschamps',
      description: '🧩 Tecnologia Profunda',
      detalhes:
        'Arquitetura, sistemas e fundamentos da internet explicados de forma clara e profunda.',
    },
    {
      nome: 'Diolinux',
      url: 'https://www.youtube.com/c/Diolinux',
      description: '🐧 Linux e Open Source',
      detalhes:
        'Foco em Linux, software livre, tutoriais de distribuições e produtividade open source.',
    },
    {
      nome: 'Mano Deyvin',
      url: 'https://www.youtube.com/c/ManoDeyvin',
      description: '🛣️ Carreira e Realidade',
      detalhes: 'Transição de carreira, rotina de dev e crescimento profissional sem filtros.',
    },
    {
      nome: 'Cod3r',
      url: 'https://www.youtube.com/c/Cod3rCursos',
      description: '🧑‍💻 Desenvolvimento Completo',
      detalhes: 'JavaScript, React, Angular, Node.js, banco de dados e fundamentos sólidos.',
    },
  ]);

  canaisFiltrados = computed(() => {
    const filtro = this.filtroAtivo();
    if (filtro === 'todos') return this.listaCanais();

    return this.listaCanais().filter((canal) => {
      const texto = `${canal.description} ${canal.detalhes}`.toLowerCase();
      if (filtro === 'backend') {
        return texto.includes('backend') || texto.includes('spring') || texto.includes('arquitetura');
      }
      if (filtro === 'devops') {
        return texto.includes('devops') || texto.includes('docker') || texto.includes('kubernetes');
      }
      return texto.includes('carreira') || texto.includes('mercado') || texto.includes('transição');
    });
  });

  descricaoIcone(texto: string): string {
    return texto.split(' ')[0] ?? '';
  }

  descricaoTexto(texto: string): string {
    return texto.split(' ').slice(1).join(' ');
  }

  alterarFiltro(filtro: 'todos' | 'backend' | 'devops' | 'carreira') {
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
