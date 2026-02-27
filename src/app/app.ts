import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Cabecalho } from './componentes/cabecalho/cabecalho';
import { Rodape } from "./componentes/rodape/rodape";
import { LoadingComponent } from './componentes/loading/loading.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [Cabecalho, Rodape, RouterOutlet, LoadingComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private router = inject(Router);
  private rotasComLayout = new Set([
    '/inicio',
    '/galeria',
    '/mural-dos-devs',
    '/como-comecamos',
  ]);

  private rotaAtual = toSignal(
    this.router.events.pipe(
      filter((evento): evento is NavigationEnd => evento instanceof NavigationEnd),
      map((evento) => evento.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  mostrarLayoutHome = computed(() => this.rotasComLayout.has(this.rotaAtual()));
}
