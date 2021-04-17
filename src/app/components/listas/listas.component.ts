import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { Lista } from 'src/app/models/lista.models';
import { Router } from '@angular/router';
import { AlertController, IonItem, IonList } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @Input() terminada = true;
  @ViewChild(IonList) btn: IonList;

  btncomplete = Array();
  lista: Lista[] = [];

  constructor( public DataServices: DataService, private router: Router, private alertControl: AlertController) {
  }
  ngOnInit() {
     this.DataServices.getlistas().subscribe( list => {
       this.lista = list;
     });
    // this.btncomplete = this.DataServices.listas.filter(i => i.terminada === false);

    // console.log('complete ', this.btncomplete);
   }

  listaSeleccionada(item: Lista){

    if (this.terminada){

      this.router.navigateByUrl(`/terminadas/agregar/${item.id}`);
    }else
    {
      this.router.navigateByUrl(`/pendientes/agregar/${item.id}`);
    }
  }

   borrar(list: Lista){
    // tslint:disable-next-line: deprecation
    this.DataServices.borrarLista(list);
  }

  async agregarLista(lista: Lista){

    const alert = await this.alertControl.create({
      header: 'Modificar',
      inputs: [
        {
          name: 'item',
          type: 'text',
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          handler: () => {console.log('cancelado'); this.btn.closeSlidingItems(); }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            if (data.item.length === 0){
              return;
            }else{
              lista.titulo = data.item;
              this.DataServices.actualizarLista(lista).subscribe();
              this.btn.closeSlidingItems();
            }

          }
        }
    ]
    });

    alert.present();


  }

doRefresh(event) {

    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

}
