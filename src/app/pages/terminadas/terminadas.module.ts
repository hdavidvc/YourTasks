import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerminadasPageRoutingModule } from './terminadas-routing.module';

import { TerminadasPage } from './terminadas.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerminadasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TerminadasPage]
})
export class TerminadasPageModule {}
