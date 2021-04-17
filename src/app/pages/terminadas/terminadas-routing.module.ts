import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerminadasPage } from './terminadas.page';

const routes: Routes = [
  {
    path: '',
    component: TerminadasPage
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
export class TerminadasPageRoutingModule {}
