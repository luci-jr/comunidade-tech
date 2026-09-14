import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoadingService } from '../../servicos/loading.service';

@Component({
  selector: 'app-so',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="so-layout">
      <aside class="sidebar-so">
        <h2>Sistemas Operacionais</h2>
        <p>Escolha uma trilha para ver recursos mais direcionados.</p>

        <nav class="menu-so">
          <a routerLink="linux" routerLinkActive="ativo">Linux</a>
          <a routerLink="macos" routerLinkActive="ativo">MacOS</a>
          <a routerLink="windows" routerLinkActive="ativo">Windows</a>
          <a routerLink="freebsd" routerLinkActive="ativo">FreeBSD</a>
          <a routerLink="raspberry" routerLinkActive="ativo">Raspberry Pi</a>
        </nav>

        <button (click)="voltar()" class="btn-voltar-estilizado">⬅ Voltar</button>
      </aside>

      <main class="conteudo-so">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .so-layout {
        --sidebar-width: 380px;
        width: 100%;
        min-height: calc(100vh - 1px);
      }

      .sidebar-so {
        position: fixed;
        inset: 0 auto 0 0;
        width: var(--sidebar-width);
        background: rgba(14, 18, 32, 0.78);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-right: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 8px 0 28px rgba(0, 0, 0, 0.4);
        padding: 34px 24px;
        display: flex;
        flex-direction: column;
      }

      .sidebar-so h2 {
        color: var(--color-text);
        margin: 0 0 18px;
        font-size: 1.8rem;
        font-family: 'Press Start 2P', var(--font-montserrat);
        line-height: 1.25;
        text-shadow:
          0 0 6px rgba(77, 163, 255, 0.6),
          0 0 14px rgba(77, 163, 255, 0.35);
      }

      .sidebar-so p {
        margin: 0 0 36px;
        color: #d4d8e3;
        line-height: 1.65;
        font-size: 1.16rem;
        font-weight: 600;
      }

      .menu-so {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: auto;
      }

      .menu-so a {
        text-decoration: none;
        padding: 14px 15px;
        border-radius: 12px;
        color: var(--color-text);
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.04);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        transition: all 0.2s ease;
        font-weight: 600;
      }

      .menu-so a:hover {
        border-color: var(--color-accent);
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

      .conteudo-so {
        min-width: 0;
        margin-left: calc(var(--sidebar-width) + 26px);
        padding: 34px 24px 60px 0;
      }

      @media (max-width: 900px) {
        .sidebar-so {
          position: static;
          width: 100%;
          border-right: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: none;
          padding: 22px 16px;
        }

        .menu-so {
          margin-bottom: 18px;
        }

        .conteudo-so {
          margin-left: 0;
          padding: 24px 16px 40px;
        }
      }
    `,
  ],
})
export class SistemasOperacionais {
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  voltar() {
    this.loadingService.showReturning();
    setTimeout(() => {
      this.router.navigate(['/']);
      this.loadingService.hide();
    }, 800);
  }
}
