import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./paginas/inicio/canais').then((m) => m.Canais),
  },
  { path: 'comunidade', pathMatch: 'full', redirectTo: 'inicio' },
  {
    path: 'galeria',
    loadComponent: () =>
      import('./paginas/galeria/galeria').then((m) => m.Galeria),
  },
  {
    path: 'mural-dos-devs',
    loadComponent: () =>
      import('./paginas/mural-dos-devs/mural-dos-devs').then((m) => m.MuralDosDevs),
  },
  {
    path: 'trajetoria',
    loadComponent: () =>
      import('./paginas/trajetoria/trajetoria').then((m) => m.Trajetoria),
  },
  {
    path: 'sistemas-operacionais',
    loadComponent: () =>
      import('./paginas/sistemas-operacionais/sistemas-operacionais').then(
        (m) => m.SistemasOperacionais
      ),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'linux' },
      {
        path: 'linux',
        loadComponent: () =>
          import(
            './paginas/sistemas-operacionais/linux/sistemas-operacionais-linux'
          ).then((m) => m.SistemasOperacionaisLinux),
      },
      {
        path: 'freebsd',
        loadComponent: () =>
          import(
            './paginas/sistemas-operacionais/freebsd/sistemas-operacionais-freebsd'
          ).then((m) => m.SistemasOperacionaisFreebsd),
      },
      {
        path: 'raspberry',
        loadComponent: () =>
          import(
            './paginas/sistemas-operacionais/raspberry/sistemas-operacionais-raspberry'
          ).then((m) => m.SistemasOperacionaisRaspberry),
      },
      {
        path: 'macos',
        loadComponent: () =>
          import(
            './paginas/sistemas-operacionais/macos/sistemas-operacionais-macos'
          ).then((m) => m.SistemasOperacionaisMacos),
      },
      {
        path: 'windows',
        loadComponent: () =>
          import(
            './paginas/sistemas-operacionais/windows/sistemas-operacionais-windows'
          ).then((m) => m.SistemasOperacionaisWindows),
      },
    ],
  },
  {
    path: 'canais-tecnologia',
    loadComponent: () =>
      import('./paginas/canais-tecnologia/canais-tecnologia').then(
        (m) => m.CanaisTecnologia
      ),
  },
  {
    path: 'referencias-tecnologia',
    loadComponent: () =>
      import('./paginas/referencias/referencias-tecnologia').then(
        (m) => m.ReferenciasTecnologia
      ),
  },
  {
    path: 'plataformas-ensino-jogo',
    pathMatch: 'full',
    redirectTo: 'sites-aprendizado',
  },
  {
    path: 'sites-aprendizado',
    loadComponent: () =>
      import('./paginas/sites-aprendizado/sites-aprendizado').then(
        (m) => m.SitesAprendizado
      ),
  },
  {
    path: 'podcasts',
    loadComponent: () =>
      import('./paginas/podcasts/podcasts').then((m) => m.Podcasts),
  },
  {
    path: 'repositorios',
    loadComponent: () =>
      import('./paginas/repositorios/repositorios').then((m) => m.Repositorios),
  },
  { path: '**', redirectTo: 'inicio' },
];
