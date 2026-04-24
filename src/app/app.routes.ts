import { Routes } from '@angular/router';
import { Canais } from './paginas/inicio/canais';
import { SistemasOperacionais } from './paginas/sistemas-operacionais/sistemas-operacionais';
import { SistemasOperacionaisFreebsd } from './paginas/sistemas-operacionais/freebsd/sistemas-operacionais-freebsd';
import { SistemasOperacionaisLinux } from './paginas/sistemas-operacionais/linux/sistemas-operacionais-linux';
import { SistemasOperacionaisMacos } from './paginas/sistemas-operacionais/macos/sistemas-operacionais-macos';
import { SistemasOperacionaisRaspberry } from './paginas/sistemas-operacionais/raspberry/sistemas-operacionais-raspberry';
import { SistemasOperacionaisWindows } from './paginas/sistemas-operacionais/windows/sistemas-operacionais-windows';
import { SitesAprendizado } from './paginas/sites-aprendizado/sites-aprendizado';
import { CanaisTecnologia } from './paginas/canais-tecnologia/canais-tecnologia';
import { PlataformasEnsinoJogo } from './paginas/plataformas-ensino-jogo/plataformas-ensino-jogo';
import { Podcasts } from './paginas/podcasts/podcasts';
import { Repositorios } from './paginas/repositorios/repositorios';
import { ReferenciasTecnologia } from './paginas/referencias/referencias-tecnologia';
import { Galeria } from './paginas/galeria/galeria';
import { MuralDosDevs } from './paginas/mural-dos-devs/mural-dos-devs';
import { Trajetoria } from './paginas/trajetoria/trajetoria';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'inicio', component: Canais },
  { path: 'comunidade', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'galeria', component: Galeria },
  { path: 'mural-dos-devs', component: MuralDosDevs },
  { path: 'trajetoria', component: Trajetoria },
  {
    path: 'sistemas-operacionais',
    component: SistemasOperacionais,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'linux' },
      { path: 'linux', component: SistemasOperacionaisLinux },
      { path: 'freebsd', component: SistemasOperacionaisFreebsd },
      { path: 'raspberry', component: SistemasOperacionaisRaspberry },
      { path: 'macos', component: SistemasOperacionaisMacos },
      { path: 'windows', component: SistemasOperacionaisWindows },
    ],
  },
  { path: 'canais-tecnologia', component: CanaisTecnologia },
  { path: 'referencias-tecnologia', component: ReferenciasTecnologia },
  { path: 'plataformas-ensino-jogo', pathMatch: 'full', redirectTo: 'sites-aprendizado' },
  { path: 'sites-aprendizado', component: SitesAprendizado },
  { path: 'podcasts', component: Podcasts },
  { path: 'repositorios', component: Repositorios },
  { path: '**', redirectTo: 'inicio' },
];
