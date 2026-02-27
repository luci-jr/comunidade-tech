import { Routes } from '@angular/router';
import { Canais } from './componentes/canais/canais';
import { SistemasOperacionais } from './componentes/sistemas-operacionais/sistemas-operacionais';
import { SitesAprendizado } from './componentes/sites-aprendizado/sites-aprendizado';
import { CanaisTecnologia } from './componentes/canais-tecnologia/canais-tecnologia';
import { PlataformasEnsinoJogo } from './componentes/plataformas-ensino-jogo/plataformas-ensino-jogo';
import { Podcasts } from './componentes/podcasts/podcasts';
import { Repositorios } from './componentes/repositorios/repositorios';

export const routes: Routes = [
  { path: '', component: Canais },
  { path: 'sistemas-operacionais', component: SistemasOperacionais },
  { path: 'canais-tecnologia', component: CanaisTecnologia },
  { path: 'plataformas-ensino-jogo', component: PlataformasEnsinoJogo },
  { path: 'sites-aprendizado', component: SitesAprendizado },
  { path: 'podcasts', component: Podcasts },
  { path: 'repositorios', component: Repositorios },
];
;
