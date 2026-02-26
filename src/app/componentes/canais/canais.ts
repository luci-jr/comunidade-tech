import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-canais',
  imports: [RouterLink],
  templateUrl: './canais.html',
  styleUrl: './canais.css',
})
export class Canais {
  listaCategorias = signal<Categoria[]>([
    {
      titulo: 'Sistemas Operacionais',
      descricao: 'Dicas de SO para devs.',
      rota: '/sistemas-operacionais',
      icone: '💻'
    },
    {
      titulo: 'Canais de Tecnologia',
      descricao: 'Os melhores influenciadores.',
      rota: '/canais-tecnologia',
      icone: '📺'
    },
    {
      titulo: 'Sites de Aprendizado',
      descricao: 'Documentações e cursos.',
      rota: '/sites-aprendizado',
      icone: '📚'
    },
    {
      titulo: 'Podcasts',
      descricao: 'Ouça e aprenda.',
      rota: '/podcasts',
      icone: '🎙️'
    }
  ]);
}