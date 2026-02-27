import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css'
})
export class Cabecalho {
  private router = inject(Router);

  navegarPara(rota: string): void {
    this.router.navigate([rota]);
  }

  estaAtivo(rota: string): boolean {
    return this.normalizarRotaAtual() === rota;
  }

  mostrarBanner(): boolean {
    return this.normalizarRotaAtual() === '/inicio';
  }

  estaNaPaginaInicial(): boolean {
    return this.normalizarRotaAtual() === '/inicio';
  }

  private normalizarRotaAtual(): string {
    return this.router.url.split('?')[0].split('#')[0];
  }
}
