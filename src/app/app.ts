import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecalho } from './componentes/cabecalho/cabecalho';
import { Rodape } from "./componentes/rodape/rodape";
import { LoadingComponent } from './componentes/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [Cabecalho, Rodape, RouterOutlet, LoadingComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
