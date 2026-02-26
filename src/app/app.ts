import { Component } from '@angular/core';
import { Cabecalho } from './componentes/cabecalho/cabecalho';
import { Rodape } from "./componentes/rodape/rodape";

@Component({
  selector: 'app-root',
  imports: [
    Cabecalho,
    Rodape
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
