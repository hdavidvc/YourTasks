import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Lista } from '../../models/lista.models';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  logeado = true;
  tareaHoy: ListaItem[] = [];
  lista: Lista[] = [];
   constructor(public DataServices: DataService, private alertControl: AlertController, private router: Router,
              ) {
                this.tareasHoy();
              }

  tareasHoy() {
    this.DataServices.getlistas().subscribe( list => {
      console.log(list);
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < list.length ; i++ ) {
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < list[i].items.length ; j++ ) {
          if (list[i].items[j].fechaFin === new Date().toISOString().split('T')[0]) {
            this.lista.push(list[i]);
            this.tareaHoy.push(list[i].items[j]);
          }
          console.log(list[i].items[j].fechaFin);
        }
      }
      //  list.forEach((lista, index) => {
      //   //  if ( lista.items[index].fechaFin.equals(new Date().toISOString().split('T')[0])) {
      //   //      this.tareaHoy.push(list);
      //   //   }

      //    console.log(lista);
      //   });

      console.log(this.tareaHoy);
      console.log(this.lista);
      //  console.log(ista.items[index].fechaFin);
    });
  }

  ngOnInit() {
    // tslint:disable-next-line: deprecation
    this.DataServices.Session.subscribe(session => {
      if (session){
        this.logeado = true;
        this.DataServices.getlistas().subscribe();
      }
        else{
          this.logeado = false;
        }
    });
    // console.log(new Date().toDateString());
    // console.log(new Date().toLocaleDateString());
    // console.log(new Date().toLocaleString());
    // console.log(new Date().toLocaleTimeString());
    // console.log(new Date().toUTCString());
    // console.log(new Date().toString());
    // console.log(new Date().toTimeString());
  }
  async agregarLista(){

    const alert = await this.alertControl.create({
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'item',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          handler: () => {console.log('cancelado'); }
        },
        {
          text: 'Crear',
          handler: (data) => {
            if (data.item.length === 0){
              return;
            }else{
              // tslint:disable-next-line: deprecation
              this.DataServices.crearListaFire(data.item).subscribe( fire => {
                console.log(fire);
                this.router.navigateByUrl(`/pendientes/agregar/${fire.id}`);
              });
            }

          }
        }
    ]
    });

    alert.present();


  }


  cambioCheck(item: ListaItem){
    console.log(this.lista);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.lista.length ; i++ ) {
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < this.lista[i].items.length ; j++ ) {
        console.log(this.lista[i].items);
        const pendiente = this.lista[i].items.filter(data => !data.completado).length;

        if ( pendiente === 0){
          this.lista[i].terminadaEn = new Date();
          this.lista[i].terminada = true;
    }else
    {
      this.lista[i].terminadaEn = null;
      this.lista[i].terminada = false;
    }
    // tslint:disable-next-line: deprecation
  }
      this.DataServices.actualizarLista(this.lista[i]).subscribe();
    }
    // tslint:disable-next-line: deprecation

    console.log(this.lista);
  }

doRefresh(event) {
  this.tareaHoy = [];
  setTimeout(() => {
      this.tareasHoy();
      event.target.complete();
    }, 100);
  }
}
