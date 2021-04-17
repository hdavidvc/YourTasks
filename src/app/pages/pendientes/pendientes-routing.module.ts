import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendientesPage } from './pendientes.page';

const routes: Routes = [
  {
    path: '',
    component: PendientesPage
  },
  {
    path: 'agregar/:listaId',
    loadChildren: () => import('../detalle-lista/detalle-lista.module').then( m => m.DetalleListaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendientesPageRoutingModule {}
