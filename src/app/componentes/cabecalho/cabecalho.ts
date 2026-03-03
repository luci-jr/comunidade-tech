import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../servicos/auth.service';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css',
})
export class Cabecalho {
  private router = inject(Router);
  private authService = inject(AuthService);
  usuario$ = this.authService.user$;

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/inicio']);
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  }

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
