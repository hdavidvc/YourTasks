import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ListasComponent } from './listas/listas.component';
import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [HeaderComponent, ListasComponent, FooterComponent],
  imports: [IonicModule, PipesModule, CommonModule],
  exports: [
    HeaderComponent,
    ListasComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
