import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componente } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { NavController } from '@ionic/angular';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  opts: Observable<Componente[]>;
    nombre: string;
    img: string;
    logeado: boolean;

   constructor(private dataservice: DataService, public menu: MenuController, private navCtrl: NavController) {
    this.opts = this.dataservice.getOpt();
  }

  async ngOnInit() {
    // tslint:disable-next-line: deprecation
    await this.dataservice.Session.subscribe(session => {
      if (session){
        this.logeado = true;
        console.log('Estoy en el if', this.logeado);
        if(session.displayName){
          this.nombre = session.displayName;
          this.img = session.photoURL;
        }else {
          this.nombre = session.email;          
          this.img = '/assets/stan-lee.jpg';
        }
      }
        else{
          this.logeado = false;
          console.log('Estoy en el else');
          this.nombre = "";
        }

        console.log(session);
    });

    console.log(this.logeado);
  }


  hideMenu() {
    this.dataservice.logout();
    this.menu.close();
  }
  
}
