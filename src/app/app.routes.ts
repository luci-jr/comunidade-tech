import { Routes } from '@angular/router';
import { Canais } from './componentes/canais/canais';
import { SistemasOperacionais } from './componentes/sistemas-operacionais/sistemas-operacionais';
import { SitesAprendizado } from './componentes/sites-aprendizado/sites-aprendizado';
import { CanaisTecnologia } from './componentes/canais-tecnologia/canais-tecnologia';
import { Podcasts } from './componentes/podcasts/podcasts';
import { Repositorios } from './componentes/repositorios/repositorios';

export const routes: Routes = [
  { path: '', component: Canais },
  { path: 'sistemas-operacionais', component: SistemasOperacionais },
  { path: 'sites-aprendizado', component: SitesAprendizado },
  { path: 'canais-tecnologia', component: CanaisTecnologia },
  { path: 'podcasts', component: Podcasts },
  { path: 'repositorios', component: Repositorios },
];
;
