import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecalho } from './componentes/cabecalho/cabecalho';
import { Rodape } from "./componentes/rodape/rodape";

@Component({
  selector: 'app-root',
  imports: [Cabecalho, Rodape, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
