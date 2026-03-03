import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../servicos/auth.service';
import { LoginModalService } from '../../../servicos/login-modal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  modalService = inject(LoginModalService);

  async loginGoogle() {
    try {
      await this.authService.loginComGoogle();
      this.fecharModal();
      // Não navegamos mais para /inicio necessariamente, pois já estamos em uma página
    } catch (error) {
      console.error(error);
    }
  }

  fecharModal() {
    this.modalService.fechar();
  }
}
