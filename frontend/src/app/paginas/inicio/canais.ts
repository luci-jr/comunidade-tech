import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../../models/categoria.model';
import { LoadingService } from '../../servicos/loading.service';

@Component({
  selector: 'app-canais',
  standalone: true,
  templateUrl: './canais.html',
  styleUrl: './canais.css',
})
export class Canais {
  private router = inject(Router);
  private loadingService = inject(LoadingService);

  listaCategorias = signal<Categoria[]>([
    {
      titulo: 'Sistemas Operacionais',
      descricao: 'Dicas de SO para devs.',
      rota: '/sistemas-operacionais/linux',
      icone: '💻',
    },
    {
      titulo: 'Plataformas de Ensino',
      descricao: 'Onde aprender e evoluir.',
      rota: '/sites-aprendizado',
      icone: '🎓',
    },
    {
      titulo: 'Frameworks',
      descricao: 'Ferramentas e tecnologias para backend, frontend e mobile.',
      rota: '/referencias-tecnologia',
      icone: '📚',
    },
    {
      titulo: 'Repositórios para estudo',
      descricao: 'Códigos e referências.',
      rota: '/repositorios',
      icone: '🐙',
    },
    {
      titulo: 'Canais de Tecnologia',
      descricao: 'Os melhores influenciadores.',
      rota: '/canais-tecnologia',
      icone: '📺',
    },
    {
      titulo: 'Podcasts',
      descricao: 'Ouça e aprenda.',
      rota: '/podcasts',
      icone: '🎙️',
    },
  ]);

  navegar(rota: string) {
    this.loadingService.show();
    setTimeout(() => {
      this.router.navigate([rota]);
      this.loadingService.hide();
    }, 2000);
  }
}
