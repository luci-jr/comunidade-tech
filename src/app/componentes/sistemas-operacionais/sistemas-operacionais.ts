import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-so',
  standalone: true,
  imports: [RouterLink],
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
      <a routerLink="/" class="btn-voltar">⬅ Voltar</a>
    </div>
  `
})
export class SistemasOperacionais {}
