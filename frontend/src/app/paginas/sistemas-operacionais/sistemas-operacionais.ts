import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoadingService } from '../../servicos/loading.service';

@Component({
  selector: 'app-so',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="so-layout" [class.sidebar-fechada]="sidebarRecolhida()">
      <!-- Botão Flutuante para reabrir a barra lateral quando recolhida -->
      @if (sidebarRecolhida()) {
        <button 
          type="button" 
          class="btn-flutuante-abrir" 
          (click)="alternarSidebar()"
          title="Expandir menu de trilhas (Sistemas Operacionais)"
          aria-label="Expandir menu lateral">
          <span class="icone">☰</span>
          <span class="texto">Trilhas</span>
        </button>
      }

      <aside class="sidebar-so" [class.recolhida]="sidebarRecolhida()" aria-label="Menu lateral de Sistemas Operacionais">
        <div class="sidebar-header">
          <h2>Sistemas Operacionais</h2>
          <button 
            type="button" 
            class="btn-recolher" 
            (click)="alternarSidebar()"
            title="Recolher menu lateral"
            aria-label="Recolher menu lateral">
            ◀
          </button>
        </div>

        <p>Escolha uma trilha para ver recursos mais direcionados.</p>

        <nav class="menu-so">
          <a routerLink="linux" routerLinkActive="ativo">
            <span class="icone-os">🐧</span> Linux
          </a>
          <a routerLink="macos" routerLinkActive="ativo">
            <span class="icone-os">🍎</span> MacOS
          </a>
          <a routerLink="windows" routerLinkActive="ativo">
            <span class="icone-os">🪟</span> Windows
          </a>
          <a routerLink="freebsd" routerLinkActive="ativo">
            <span class="icone-os">😈</span> FreeBSD
          </a>
          <a routerLink="raspberry" routerLinkActive="ativo">
            <span class="icone-os">🍓</span> Raspberry Pi
          </a>
        </nav>

        <button (click)="voltar()" class="btn-voltar-estilizado">⬅ Voltar</button>
      </aside>

      <main class="conteudo-so" [class.expandido]="sidebarRecolhida()">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .so-layout {
        --sidebar-width: 360px;
        width: 100%;
        min-height: calc(100vh - 1px);
        position: relative;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Botão flutuante para reabrir a sidebar quando recolhida */
      .btn-flutuante-abrir {
        position: fixed;
        top: 86px;
        left: 20px;
        z-index: 100;
        display: flex;
        align-items: center;
        gap: 10px;
        background: rgba(14, 18, 32, 0.92);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        color: var(--color-primary, #4DA3FF);
        border: 1px solid rgba(77, 163, 255, 0.45);
        border-radius: 30px;
        padding: 10px 18px;
        font-family: 'Press Start 2P', var(--font-montserrat);
        font-size: 0.72rem;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 14px rgba(77, 163, 255, 0.3);
        transition: all 0.25s ease;
        animation: deslizarEntrada 0.25s ease-out;
      }

      .btn-flutuante-abrir:hover {
        background: rgba(77, 163, 255, 0.2);
        border-color: var(--color-primary, #4DA3FF);
        transform: scale(1.05);
        box-shadow: 0 6px 26px rgba(77, 163, 255, 0.5);
      }

      .btn-flutuante-abrir .icone {
        font-size: 1rem;
      }

      @keyframes deslizarEntrada {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      /* Sidebar */
      .sidebar-so {
        position: fixed;
        inset: 0 auto 0 0;
        width: var(--sidebar-width);
        background: rgba(14, 18, 32, 0.85);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-right: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 8px 0 28px rgba(0, 0, 0, 0.4);
        padding: 34px 24px;
        display: flex;
        flex-direction: column;
        z-index: 90;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
      }

      .sidebar-so.recolhida {
        transform: translateX(-100%);
        pointer-events: none;
        opacity: 0;
      }

      /* Header da Sidebar com botão recolher */
      .sidebar-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 16px;
      }

      .sidebar-header h2 {
        color: var(--color-text);
        margin: 0;
        font-size: 1.6rem;
        font-family: 'Press Start 2P', var(--font-montserrat);
        line-height: 1.3;
        text-shadow:
          0 0 6px rgba(77, 163, 255, 0.6),
          0 0 14px rgba(77, 163, 255, 0.35);
      }

      .btn-recolher {
        flex-shrink: 0;
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.14);
        color: #d4d8e3;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        transition: all 0.2s ease;
      }

      .btn-recolher:hover {
        background: rgba(227, 112, 47, 0.25);
        border-color: var(--color-accent, #e3702f);
        color: white;
        transform: scale(1.08);
        box-shadow: 0 0 10px rgba(227, 112, 47, 0.4);
      }

      .sidebar-so p {
        margin: 0 0 32px;
        color: #d4d8e3;
        line-height: 1.6;
        font-size: 1.05rem;
        font-weight: 500;
      }

      .menu-so {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: auto;
      }

      .menu-so a {
        text-decoration: none;
        padding: 13px 16px;
        border-radius: 12px;
        color: var(--color-text);
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.04);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        transition: all 0.2s ease;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .menu-so a .icone-os {
        font-size: 1.2rem;
      }

      .menu-so a:hover {
        border-color: var(--color-accent);
        transform: translateX(4px);
      }

      .menu-so a.ativo {
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

      /* Conteúdo Principal */
      .conteudo-so {
        min-width: 0;
        margin-left: calc(var(--sidebar-width) + 26px);
        padding: 34px 24px 60px 0;
        transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease;
      }

      .conteudo-so.expandido {
        margin-left: 0;
        padding-left: 36px;
        padding-right: 36px;
        max-width: 1280px;
        margin-inline: auto;
      }

      /* Responsividade para Telas Menores (<= 900px) */
      @media (max-width: 900px) {
        .btn-flutuante-abrir {
          top: 76px;
          left: 16px;
        }

        .sidebar-so {
          position: static;
          width: 100%;
          border-right: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: none;
          padding: 22px 16px;
          transform: none !important;
          opacity: 1 !important;
          pointer-events: auto !important;
        }

        .sidebar-so.recolhida {
          display: none;
        }

        .menu-so {
          margin-bottom: 18px;
        }

        .conteudo-so {
          margin-left: 0;
          padding: 24px 16px 40px;
        }

        .conteudo-so.expandido {
          padding-left: 16px;
          padding-right: 16px;
        }
      }
    `,
  ],
})
export class SistemasOperacionais implements OnInit {
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  sidebarRecolhida = signal<boolean>(false);

  ngOnInit() {
    const estadoSalvo = localStorage.getItem('so_sidebar_recolhida');
    if (estadoSalvo !== null) {
      this.sidebarRecolhida.set(estadoSalvo === 'true');
    }
  }

  alternarSidebar() {
    this.sidebarRecolhida.update((v) => {
      const novo = !v;
      localStorage.setItem('so_sidebar_recolhida', String(novo));
      return novo;
    });
  }

  voltar() {
    this.loadingService.showReturning();
    setTimeout(() => {
      this.router.navigate(['/']);
      this.loadingService.hide();
    }, 800);
  }
}
