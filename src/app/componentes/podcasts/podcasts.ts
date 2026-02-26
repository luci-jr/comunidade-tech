import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../../servicos/loading.service';

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      <header class="header-pagina">
        <h1>Podcasts de Tecnologia</h1>
      </header>
      <p>Áudios para aprender enquanto você se desloca ou relaxa:</p>
      <ul>
        <li>
          <strong>Hipsters Ponto Tech:</strong> Discussões profundas sobre tecnologia pela Alura.
        </li>
        <li><strong>Dev sem Fronteiras:</strong> Histórias de devs brasileiros pelo mundo.</li>
        <li><strong>Lambda3 Podcast:</strong> Agilidade, tecnologia e diversidade.</li>
        <li><strong>Layer by Layer:</strong> Design e desenvolvimento web.</li>
      </ul>
      <button
        (click)="voltar()"
        class="btn-voltar"
        style="background: none; border: 1px solid var(--color-accent); color: var(--color-accent); padding: 0.5rem 1rem; cursor: pointer; font-family: inherit; margin-top: 2rem;"
      >
        ⬅ Voltar
      </button>
    </div>
  `,
})
export class Podcasts {
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  voltar() {
    console.log('Botão Voltar clicado em Podcasts');
    this.loadingService.showReturning();
    setTimeout(() => {
      this.router.navigate(['/']);
      this.loadingService.hide();
    }, 2000);
  }
}
