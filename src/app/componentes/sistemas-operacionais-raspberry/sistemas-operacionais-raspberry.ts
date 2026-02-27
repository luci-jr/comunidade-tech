import { Component } from '@angular/core';
import { SistemaOperacional } from '../../models/sistema-operacional.model';
import { SistemasOperacionaisTrilha } from '../sistemas-operacionais-trilha/sistemas-operacionais-trilha';

@Component({
  selector: 'app-sistemas-operacionais-raspberry',
  standalone: true,
  imports: [SistemasOperacionaisTrilha],
  template: `
    <app-sistemas-operacionais-trilha
      [titulo]="'Trilha Raspberry Pi'"
      [descricao]="'Recursos para montar projetos com Raspberry Pi, aprender Linux embarcado e automacao.'"
      [iconeTitulo]="'🍓'"
      [recursos]="listaRaspberry"
    />
  `,
})
export class SistemasOperacionaisRaspberry {
  listaRaspberry: SistemaOperacional[] = [
    {
      nome: 'Raspberry Pi',
      url: 'https://www.raspberrypi.com/',
      icone: '🍓',
      descricaoCurta: 'Portal oficial da plataforma Raspberry Pi',
      detalhes: 'Hardware, sistema operacional, acessorios e novidades para projetos educacionais e profissionais.',
    },
    {
      nome: 'Raspberry Pi OS',
      url: 'https://www.raspberrypi.com/software/',
      icone: '💽',
      descricaoCurta: 'Sistema oficial para Raspberry Pi',
      detalhes: 'Baixe imagens, use o Raspberry Pi Imager e configure o ambiente para estudo e automacao.',
    },
    {
      nome: 'Documentacao Oficial',
      url: 'https://www.raspberrypi.com/documentation/',
      icone: '📚',
      descricaoCurta: 'Guias tecnicos de setup e uso',
      detalhes: 'Tutoriais de GPIO, rede, camera, sensores e administracao do sistema no dia a dia.',
    },
    {
      nome: 'MagPi Magazine',
      url: 'https://magpi.raspberrypi.com/',
      icone: '📰',
      descricaoCurta: 'Revista com projetos e ideias praticas',
      detalhes: 'Conteudo com passo a passo para IoT, robotica e desenvolvimento com Python e Linux.',
    },
    {
      nome: 'Pi-hole',
      url: 'https://pi-hole.net/',
      icone: '🛡️',
      descricaoCurta: 'Projeto popular para bloqueio de anuncios em rede',
      detalhes: 'Excelente caso real para aprender deploy, DNS e administracao de servicos no Raspberry Pi.',
    },
  ];
}
