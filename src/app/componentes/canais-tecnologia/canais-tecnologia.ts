import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CanalYT } from '../../models/canal-yt.model';

@Component({
  selector: 'app-canais-tecnologia',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './canais-tecnologia.html',
  styleUrl: './canais-tecnologia.css'
})
export class CanaisTecnologia {
  listaCanais = signal<CanalYT[]>([
    {
      nome: 'Curso em Vídeo',
      url: 'https://www.youtube.com/c/CursoemVídeo',
      description: '🎓 Gustavo Guanabara',
      detalhes: 'Ideal para quem está iniciando em programação. Ensina lógica, Python, HTML, CSS e algoritmos de forma didática.'
    },
    {
      nome: 'Alura',
      url: 'https://www.youtube.com/c/Alura',
      description: '📊 Tendências e Mercado',
      detalhes: 'Foco em mercado e tendências. Conteúdos sobre programação, DevOps, cloud, dados e carreira em TI.'
    },
    {
      nome: 'Fernanda Kipper',
      url: 'https://www.youtube.com/c/FernandaKipper',
      description: '☕ Backend na Prática',
      detalhes: 'Java, Spring Boot, arquitetura de software e boas práticas de desenvolvimento backend.'
    },
    {
      nome: 'Código Fonte TV',
      url: 'https://www.youtube.com/c/CodigoFonteTV',
      description: '⚙️ Ecossistema Tech',
      detalhes: 'DevOps, cloud, Kubernetes e atualizações constantes do mercado de tecnologia.'
    },
    {
      nome: 'LinuxTips',
      url: 'https://www.youtube.com/c/LinuxTips',
      description: '🐳 Infra e DevOps',
      detalhes: 'Docker, Kubernetes, Linux e aplicações reais com foco em infraestrutura moderna.'
    },
    {
      nome: 'Rocketseat',
      url: 'https://www.youtube.com/c/Rocketseat',
      description: '💻 Web Moderno',
      detalhes: 'Desenvolvimento web moderno com React, Node.js, TypeScript e projetos práticos.'
    },
    {
      nome: 'Filipe Deschamps',
      url: 'https://www.youtube.com/c/FilipeDeschamps',
      description: '🧩 Tecnologia Profunda',
      detalhes: 'Arquitetura, sistemas e fundamentos da internet explicados de forma clara e profunda.'
    },
    {
      nome: 'Diolinux',
      url: 'https://www.youtube.com/c/Diolinux',
      description: '🐧 Linux e Open Source',
      detalhes: 'Foco em Linux, software livre, tutoriais de distribuições e produtividade open source.'
    },
    {
      nome: 'Mano Deyvin',
      url: 'https://www.youtube.com/c/ManoDeyvin',
      description: '🛣️ Carreira e Realidade',
      detalhes: 'Transição de carreira, rotina de dev e crescimento profissional sem filtros.'
    },
    {
      nome: 'Cod3r',
      url: 'https://www.youtube.com/c/Cod3rCursos',
      description: '🧑‍💻 Desenvolvimento Completo',
      detalhes: 'JavaScript, React, Angular, Node.js, banco de dados e fundamentos sólidos.'
    }
  ]);
}
