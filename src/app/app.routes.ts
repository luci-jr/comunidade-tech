import { Routes } from '@angular/router';
import { Canais } from './componentes/canais/canais';
import { SistemasOperacionais } from './componentes/sistemas-operacionais/sistemas-operacionais';
import { SistemasOperacionaisFreebsd } from './componentes/sistemas-operacionais-freebsd/sistemas-operacionais-freebsd';
import { SistemasOperacionaisLinux } from './componentes/sistemas-operacionais-linux/sistemas-operacionais-linux';
import { SistemasOperacionaisMacos } from './componentes/sistemas-operacionais-macos/sistemas-operacionais-macos';
import { SistemasOperacionaisRaspberry } from './componentes/sistemas-operacionais-raspberry/sistemas-operacionais-raspberry';
import { SistemasOperacionaisWindows } from './componentes/sistemas-operacionais-windows/sistemas-operacionais-windows';
import { SitesAprendizado } from './componentes/sites-aprendizado/sites-aprendizado';
import { CanaisTecnologia } from './componentes/canais-tecnologia/canais-tecnologia';
import { PlataformasEnsinoJogo } from './componentes/plataformas-ensino-jogo/plataformas-ensino-jogo';
import { Podcasts } from './componentes/podcasts/podcasts';
import { Repositorios } from './componentes/repositorios/repositorios';
import { ReferenciasTecnologia } from './componentes/referencias/referencias-tecnologia';
import { Galeria } from './componentes/paginas/galeria/galeria';
import { MuralDosDevs } from './componentes/paginas/mural-dos-devs/mural-dos-devs';
import { ComoComecamos } from './componentes/paginas/como-comecamos/como-comecamos';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'inicio', component: Canais },
  { path: 'comunidade', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'galeria', component: Galeria },
  { path: 'mural-dos-devs', component: MuralDosDevs },
  { path: 'como-comecamos', component: ComoComecamos },
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
