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
        <!-- Topo da Sidebar com o botão dos 3 traços perfeitamente emoldurado e alinhado -->
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

        <button (click)="voltar()" class="btn-voltar-estilizado">⬅ Voltar</button>
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
         BOTÃO DOS 3 TRAÇOS RETRÔ (Design Harmonioso e Minimalista)
         ======================================================== */
      .hamburguer-retro {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 20px;
        height: 13px;
      }

      .hamburguer-retro .linha {
        display: block;
        width: 100%;
        height: 2.5px;
        background: #4DA3FF;
        border-radius: 2px;
        box-shadow:
          0 0 6px rgba(77, 163, 255, 0.85),
          0 0 10px rgba(77, 163, 255, 0.45);
        transition:
          background-color 0.2s ease,
          box-shadow 0.2s ease;
      }

      .btn-toggle-hamburguer {
        flex-shrink: 0;
        width: 48px;
        height: 38px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(77, 163, 255, 0.4);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        box-shadow: 0 0 10px rgba(77, 163, 255, 0.2);
        transition: all 0.25s ease;
      }

      .btn-toggle-hamburguer:hover {
        background: rgba(77, 163, 255, 0.18);
        border-color: #4DA3FF;
        transform: scale(1.05);
        box-shadow: 0 0 16px rgba(77, 163, 255, 0.55);
      }

      .btn-toggle-hamburguer:hover .hamburguer-retro .linha {
        background: #ffffff;
        box-shadow:
          0 0 8px #ffffff,
          0 0 14px #4DA3FF;
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

      /* Barra de Topo Interna da Sidebar */
      .sidebar-top-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 22px;
        padding-bottom: 14px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }

      .badge-painel {
        font-family: 'Press Start 2P', var(--font-montserrat);
        font-size: 0.65rem;
        color: #7e8b9b;
        letter-spacing: 1px;
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
        gap: 16px;
        margin-bottom: 24px;
        padding: 8px 18px 8px 10px;
        background: rgba(14, 18, 32, 0.82);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border: 1px solid rgba(77, 163, 255, 0.35);
        border-radius: 14px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45), 0 0 12px rgba(77, 163, 255, 0.2);
        animation: deslizarTopBar 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      .badge-trilhas {
        font-family: 'Press Start 2P', var(--font-montserrat);
        font-size: 0.68rem;
        color: #4DA3FF;
        letter-spacing: 1px;
        text-shadow: 0 0 8px rgba(77, 163, 255, 0.4);
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
