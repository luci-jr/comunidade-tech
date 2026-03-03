import { Component, inject } from '@angular/core';
import { LoadingService } from '../../servicos/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  template: `
    @if (loadingService.isLoading()) {
      <div class="loading-overlay" role="status" aria-live="polite" aria-label="Carregando conteúdo">
        <div class="loading-content">
          <div class="pixel-box">
            <div class="pixel-header">
              <span class="pixel-led"></span>
              <span>PAINEL RETRO</span>
              <span class="pixel-led"></span>
            </div>
            <div class="game-title">LOADING...</div>
            <div class="progress-bar">
              <div class="progress-fill"></div>
            </div>
            <div class="loading-msg">{{ loadingService.message() }}</div>
            <div class="build-tag">Build: v2.0.4</div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(6, 8, 14, 0.36);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        font-family: 'Press Start 2P', cursive, Arial;
      }

      .loading-content {
        text-align: center;
      }

      .pixel-box {
        border: 3px solid rgba(160, 82, 45, 0.95);
        border-radius: 4px;
        padding: 18px 22px 20px;
        background:
          linear-gradient(180deg, rgba(17, 21, 31, 0.94), rgba(8, 10, 16, 0.96));
        box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.05) inset,
          0 0 16px rgba(160, 82, 45, 0.45),
          0 10px 40px rgba(0, 0, 0, 0.5);
        position: relative;
        min-width: min(92vw, 420px);
      }

      .pixel-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 0.52rem;
        color: rgba(224, 224, 224, 0.76);
        letter-spacing: 0.1em;
        margin-bottom: 12px;
      }

      .pixel-led {
        width: 8px;
        height: 8px;
        background: #a0522d;
        box-shadow: 0 0 8px rgba(160, 82, 45, 0.7);
      }

      .game-title {
        color: #fff;
        font-size: clamp(1.1rem, 3.8vw, 1.7rem);
        margin-bottom: 16px;
        letter-spacing: 0.22em;
        animation: blink 0.8s infinite;
      }

      .progress-bar {
        width: min(100%, 320px);
        height: 18px;
        border: 2px solid rgba(208, 214, 228, 0.9);
        margin: 14px auto 0;
        padding: 2px;
        background: rgba(8, 10, 16, 0.8);
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #1b7fe3, #4da3ff);
        width: 0%;
        animation: fillProgress 0.8s linear forwards;
      }

      .loading-msg {
        color: var(--color-muted);
        font-size: 0.74rem;
        margin-top: 16px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      .build-tag {
        font-size: 0.52rem;
        color: rgba(176, 176, 176, 0.85);
        margin-top: 10px;
        letter-spacing: 0.06em;
      }

      @keyframes blink {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.3;
        }
      }

      @keyframes fillProgress {
        0% {
          width: 0%;
        }
        100% {
          width: 100%;
        }
      }
    `,
  ],
})
export class LoadingComponent {
  loadingService = inject(LoadingService);
}
