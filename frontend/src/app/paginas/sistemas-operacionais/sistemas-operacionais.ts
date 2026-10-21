import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoadingService } from '../../servicos/loading.service';

@Component({
  selector: 'app-so',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="so-layout" [class.sidebar-fechada]="sidebarRecolhida()">
      <!-- Botão Flutuante (3 traços neon) com animação retrô suave de entrada e saída -->
      <button 
        type="button" 
        class="btn-flutuante-abrir"
        [class.visivel]="sidebarRecolhida()"
        (click)="alternarSidebar()"
        title="Expandir menu de trilhas"
        aria-label="Expandir menu de trilhas">
        <div class="hamburguer-retro">
          <span class="linha"></span>
          <span class="linha"></span>
          <span class="linha"></span>
        </div>
      </button>

      <aside class="sidebar-so" [class.recolhida]="sidebarRecolhida()" aria-label="Menu lateral de Sistemas Operacionais">
        <div class="sidebar-header">
          <h2>Sistemas Operacionais</h2>
          <!-- Botão nos 3 traços neon substitui completamente o ícone antigo de triângulo -->
          <button 
            type="button" 
            class="btn-toggle-sidebar" 
            (click)="alternarSidebar()"
            title="Recolher menu lateral"
            aria-label="Recolher menu lateral">
            <div class="hamburguer-retro">
              <span class="linha"></span>
              <span class="linha"></span>
              <span class="linha"></span>
            </div>
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
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* ========================================================
         BOTÃO DOS 3 TRAÇOS RETRÔ (Design Unificado e Minimalista)
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
          background-color 0.25s ease,
          box-shadow 0.25s ease,
          transform 0.25s ease;
      }

      /* 1. Botão de 3 traços no cabeçalho da Sidebar */
      .btn-toggle-sidebar {
        flex-shrink: 0;
        width: 52px;
        height: 40px;
        border-radius: 9999px;
        background: rgba(14, 18, 32, 0.92);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border: 1.5px solid rgba(77, 163, 255, 0.5);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        box-shadow: 0 0 12px rgba(77, 163, 255, 0.25);
        transition: all 0.25s cubic-bezier(0.34, 1.4, 0.64, 1);
      }

      .btn-toggle-sidebar:hover {
        border-color: #4DA3FF;
        transform: scale(1.08);
        box-shadow: 0 0 20px rgba(77, 163, 255, 0.6);
      }

      .btn-toggle-sidebar:hover .hamburguer-retro .linha {
        background: #ffffff;
        box-shadow:
          0 0 8px #ffffff,
          0 0 14px #4DA3FF,
          0 0 22px #4DA3FF;
      }

      /* 2. Botão Flutuante (quando recolhida) com animação retrô suave */
      .btn-flutuante-abrir {
        position: fixed;
        top: 86px;
        left: 20px;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        height: 40px;
        background: rgba(14, 18, 32, 0.92);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border: 1.5px solid rgba(77, 163, 255, 0.5);
        border-radius: 9999px;
        cursor: pointer;
        padding: 0;

        /* Transição Suave Retrô de Entrada e Saída */
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateX(-35px) scale(0.7);
        transition:
          opacity 0.4s cubic-bezier(0.34, 1.4, 0.64, 1),
          transform 0.4s cubic-bezier(0.34, 1.4, 0.64, 1),
          visibility 0.4s ease,
          border-color 0.25s ease,
          box-shadow 0.25s ease;
      }

      /* Estado Visível com pulso neon contínuo */
      .btn-flutuante-abrir.visivel {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateX(0) scale(1);
        animation: retroPulse 3.5s infinite ease-in-out;
      }

      .btn-flutuante-abrir:hover {
        border-color: #4DA3FF;
        transform: translateX(0) scale(1.08);
        box-shadow:
          0 6px 26px rgba(77, 163, 255, 0.6),
          0 0 20px rgba(77, 163, 255, 0.4);
      }

      .btn-flutuante-abrir:hover .hamburguer-retro .linha {
        background: #ffffff;
        box-shadow:
          0 0 8px #ffffff,
          0 0 14px #4DA3FF,
          0 0 22px #4DA3FF;
      }

      /* Pulso Neon Retrô Suave */
      @keyframes retroPulse {
        0%,
        100% {
          box-shadow:
            0 4px 20px rgba(0, 0, 0, 0.5),
            0 0 12px rgba(77, 163, 255, 0.35);
        }
        50% {
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.65),
            0 0 22px rgba(77, 163, 255, 0.65);
        }
      }

      /* ========================================================
         SIDEBAR & LAYOUT
         ======================================================== */
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
        transition:
          transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
          opacity 0.35s ease;
      }

      .sidebar-so.recolhida {
        transform: translateX(-100%);
        pointer-events: none;
        opacity: 0;
      }

      .sidebar-header {
        display: flex;
        align-items: center;
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
        transition:
          margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1),
          padding 0.35s ease;
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
