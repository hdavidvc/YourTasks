import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'pendientes',
    loadChildren: () => import('./pages/pendientes/pendientes.module').then( m => m.PendientesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'detalle-lista',
    loadChildren: () => import('./pages/detalle-lista/detalle-lista.module').then( m => m.DetalleListaPageModule)
  },
  {
    path: 'detalle-tarea',
    loadChildren: () => import('./pages/detalle-tarea/detalle-tarea.module').then( m => m.DetalleTareaPageModule)
  },
  {
    path: 'terminadas',
    loadChildren: () => import('./pages/terminadas/terminadas.module').then( m => m.TerminadasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
