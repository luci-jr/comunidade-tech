import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container">
      <header class="header-pagina">
          <h1>Sites de Aprendizado</h1>
      </header>
      <p>Plataformas recomendadas:</p>
      <ul>
        <li><strong>Alura:</strong> Cursos completos com trilhas guiadas.</li>
        <li><strong>MDN Web Docs:</strong> A bíblia do desenvolvimento web.</li>
        <li><strong>FreeCodeCamp:</strong> Prática gratuita e certificações.</li>
      </ul>
      <a routerLink="/" class="btn-voltar">⬅ Voltar</a>
    </div>
  `
})
export class SitesAprendizado {}
