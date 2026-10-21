import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Cabecalho } from './componentes/cabecalho/cabecalho';
import { Rodape } from './componentes/rodape/rodape';
import { LoadingComponent } from './componentes/loading/loading.component';
import { LoginModalService } from './servicos/login-modal.service';
import { Login } from './paginas/login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Cabecalho, Rodape, RouterOutlet, LoadingComponent, Login],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private router = inject(Router);
  modalService = inject(LoginModalService);
}
