import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../../servicos/loading.service';

@Component({
  selector: 'app-so',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      <header class="header-pagina">
        <h1>Sistemas Operacionais</h1>
      </header>
      <p>Sugestões de SOs para desenvolvedores iniciantes:</p>
      <ul>
        <li><strong>Linux (Ubuntu/Mint):</strong> Ótimo para aprender a linha de comando.</li>
        <li><strong>Windows + WSL2:</strong> O melhor dos dois mundos.</li>
        <li><strong>macOS:</strong> Excelente para desenvolvimento web e mobile.</li>
      </ul>
      <button
        (click)="voltar()"
        class="btn-voltar"
        style="background: none; border: 1px solid var(--color-primary); color: var(--color-primary); padding: 0.5rem 1rem; cursor: pointer; font-family: inherit; margin-top: 2rem;"
      >
        ⬅ Voltar
      </button>
    </div>
  `,
})
export class SistemasOperacionais {
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  voltar() {
    console.log('Botão Voltar clicado em SistemasOperacionais');
    this.loadingService.showReturning();
    setTimeout(() => {
      this.router.navigate(['/']);
      this.loadingService.hide();
    }, 2000);
  }
}
