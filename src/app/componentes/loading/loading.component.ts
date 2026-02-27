import { Component, inject } from '@angular/core';
import { LoadingService } from '../../servicos/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  template: `
    @if (loadingService.isLoading()) {
      <div class="loading-overlay">
        <div class="loading-content">
          <div class="pixel-box">
            <div class="game-title">LOADING...</div>
            <div class="progress-bar">
              <div class="progress-fill"></div>
            </div>
            <div class="loading-msg">{{ loadingService.message() }}</div>
            <div style="font-size: 0.5rem; color: #333; margin-top: 10px;">Build: v2.0.4</div>
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
        background: rgba(18, 18, 18, 0.98);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Press Start 2P', cursive, Arial; /* Fonte gamer retro */
      }

      .loading-content {
        text-align: center;
      }

      .pixel-box {
        border: 4px solid var(--color-accent);
        padding: 40px;
        background: #000;
        box-shadow: 0 0 20px var(--color-accent);
        position: relative;
      }

      .game-title {
        color: #fff;
        font-size: 2rem;
        margin-bottom: 30px;
        letter-spacing: 5px;
        animation: blink 0.8s infinite;
      }

      .progress-bar {
        width: 300px;
        height: 20px;
        border: 2px solid #fff;
        margin: 20px auto;
        padding: 2px;
      }

      .progress-fill {
        height: 100%;
        background: var(--color-primary);
        width: 0%;
        animation: fillProgress 0.8s linear forwards;
      }

      .loading-msg {
        color: var(--color-muted);
        font-size: 0.8rem;
        margin-top: 20px;
        text-transform: uppercase;
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
