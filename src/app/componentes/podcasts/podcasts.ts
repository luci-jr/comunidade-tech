import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container">
      <header class="header-pagina">
          <h1>Podcasts de Tecnologia</h1>
      </header>
      <p>Áudios para aprender enquanto você se desloca ou relaxa:</p>
      <ul>
        <li><strong>Hipsters Ponto Tech:</strong> Discussões profundas sobre tecnologia pela Alura.</li>
        <li><strong>Dev sem Fronteiras:</strong> Histórias de devs brasileiros pelo mundo.</li>
        <li><strong>Lambda3 Podcast:</strong> Agilidade, tecnologia e diversidade.</li>
        <li><strong>Layer by Layer:</strong> Design e desenvolvimento web.</li>
      </ul>
      <a routerLink="/" class="btn-voltar">⬅ Voltar</a>
    </div>
  `
})
export class Podcasts {}
