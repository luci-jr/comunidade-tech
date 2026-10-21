import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoadingService } from '../../servicos/loading.service';

@Component({
  selector: 'app-so',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="so-layout" [class.sidebar-fechada]="sidebarRecolhida()">
      <!-- Barra Lateral Fixa -->
      <aside class="sidebar-so" [class.recolhida]="sidebarRecolhida()" aria-label="Menu lateral de Sistemas Operacionais">
        <!-- Topo da Sidebar com controles retrô unificados -->
        <div class="sidebar-top-bar">
          <button 
            type="button" 
            class="btn-toggle-hamburguer" 
            (click)="alternarSidebar()"
            title="Recolher menu lateral"
            aria-label="Recolher menu lateral">
            <div class="hamburguer-retro">
              <span class="linha"></span>
              <span class="linha"></span>
              <span class="linha"></span>
            </div>
          </button>

          <button 
            type="button" 
            class="btn-voltar-topbar" 
            (click)="voltar()"
            title="Voltar para a página inicial"
            aria-label="Voltar para a página inicial">
            <svg class="seta-retro" width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 3L1 8l5 5V9h9V7H6V3z"/>
            </svg>
            <span>Voltar</span>
          </button>

          <span class="badge-painel">PAINEL</span>
        </div>

        <h2>Sistemas Operacionais</h2>
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
      </aside>

      <!-- Área de Conteúdo Principal -->
      <main class="conteudo-so" [class.expandido]="sidebarRecolhida()">
        <!-- Toolbar emoldurada que surge suavemente quando a sidebar está recolhida -->
        @if (sidebarRecolhida()) {
          <div class="topbar-conteudo-so">
            <button 
              type="button" 
              class="btn-toggle-hamburguer" 
              (click)="alternarSidebar()"
              title="Expandir menu lateral de trilhas"
              aria-label="Abrir menu de trilhas">
              <div class="hamburguer-retro">
                <span class="linha"></span>
                <span class="linha"></span>
                <span class="linha"></span>
              </div>
            </button>

            <button 
              type="button" 
              class="btn-voltar-topbar" 
              (click)="voltar()"
              title="Voltar para a página inicial"
              aria-label="Voltar para a página inicial">
              <svg class="seta-retro" width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                <path d="M6 3L1 8l5 5V9h9V7H6V3z"/>
              </svg>
              <span>Voltar</span>
            </button>

            <span class="badge-trilhas">TRILHAS DE SISTEMAS OPERACIONAIS</span>
          </div>
        }

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
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* ========================================================
         SIDEBAR (Menu Lateral)
         ======================================================== */
      .sidebar-so {
        position: fixed;
        inset: 0 auto 0 0;
        width: var(--sidebar-width);
        background: rgba(14, 18, 32, 0.88);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-right: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 8px 0 28px rgba(0, 0, 0, 0.45);
        padding: 28px 24px;
        display: flex;
        flex-direction: column;
        z-index: 90;
        transition:
          transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
          opacity 0.35s ease;
      }

      .sidebar-so.recolhida {
        transform: translateX(-100%);
        pointer-events: none;
        opacity: 0;
      }

      .sidebar-so h2 {
        color: var(--color-text);
        margin: 0 0 14px;
        font-size: 1.6rem;
        font-family: 'Press Start 2P', var(--font-montserrat);
        line-height: 1.3;
        text-shadow:
          0 0 6px rgba(77, 163, 255, 0.6),
          0 0 14px rgba(77, 163, 255, 0.35);
      }

      .sidebar-so p {
        margin: 0 0 28px;
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

      /* ========================================================
         CONTEÚDO PRINCIPAL & TOOLBAR QUANDO RECOLHIDA
         ======================================================== */
      .conteudo-so {
        min-width: 0;
        margin-left: calc(var(--sidebar-width) + 28px);
        padding: 34px 28px 60px 0;
        max-width: 1720px;
        transition:
          margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1),
          padding 0.35s ease;
      }

      .conteudo-so.expandido {
        margin-left: 0;
        padding: 34px clamp(20px, 3.5vw, 60px) 60px;
        max-width: 1720px;
        margin-inline: auto;
      }

      /* Barra de Topo na Área de Conteúdo (surge suavemente quando a sidebar recolhe) */
      .topbar-conteudo-so {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 24px;
        padding: 8px 14px;
        background: rgba(14, 18, 32, 0.9);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border: 1px solid rgba(160, 82, 45, 0.88);
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45), 0 0 12px rgba(160, 82, 45, 0.35);
        animation: deslizarTopBar 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      .badge-trilhas {
        height: 38px;
        background: rgba(160, 82, 45, 0.2);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(160, 82, 45, 0.88);
        border-radius: 10px;
        box-shadow: 0 0 12px rgba(160, 82, 45, 0.45), inset 0 0 12px rgba(160, 82, 45, 0.24);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        color: var(--color-primary);
        font-family: var(--font-pixel), 'Press Start 2P', cursive;
        font-size: 0.65rem;
        letter-spacing: 1.2px;
        text-shadow: 0 0 6px rgba(77, 163, 255, 0.5);
        white-space: nowrap;
      }

      @keyframes deslizarTopBar {
        from {
          opacity: 0;
          transform: translateY(-14px) scale(0.96);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      /* Responsividade para Telas Menores (<= 900px) */
      @media (max-width: 900px) {
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

        .topbar-conteudo-so {
          width: 100%;
          justify-content: flex-start;
          border-radius: 12px;
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
