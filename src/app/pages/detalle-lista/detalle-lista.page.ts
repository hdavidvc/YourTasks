import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item.model';
import { Lista } from 'src/app/models/lista.models';
import { DataService } from 'src/app/services/data.service';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-detalle-lista',
  templateUrl: './detalle-lista.page.html',
  styleUrls: ['./detalle-lista.page.scss'],
})
export class DetalleListaPage implements OnInit {
  @ViewChild(IonList) btn: IonList;
  lista: Lista;
  nombreitem = '';

  constructor(private dataServices: DataService, private route: ActivatedRoute, private alertControl: AlertController) {

    const listaId = this.route.snapshot.paramMap.get('listaId');

    this.lista = dataServices.obtenerItem(listaId);

    console.log(this.lista.items);
   }

  ngOnInit() {
  }

  // agregarItem(){
  //   if (this.nombreitem.length === 0){
  //     return;
  //   }else
  //   {
  //     const nuevoItem = new ListaItem(this.nombreitem);
  //     this.lista.items.push(nuevoItem);
  //     this.nombreitem = '';

  //     // tslint:disable-next-line: deprecation
  //     this.dataServices.agregartarea(this.lista).subscribe();
  //   }
  // }

  cambioCheck(item: ListaItem){

    const pendiente = this.lista.items.filter(data => !data.completado).length;

    if ( pendiente === 0){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }else
    {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    // tslint:disable-next-line: deprecation
    this.dataServices.actualizarLista(this.lista).subscribe();

    console.log(this.lista);
  }

  borrar(i: number){
    this.lista.items.splice(i, 1);
  //   this.lista.items.unshift({
  //     desc: '',
  //     completado: false
  // });
    // tslint:disable-next-line: deprecation
    this.dataServices.agregartarea(this.lista).subscribe();
  }
  async agregarTarea(){

    const alert = await this.alertControl.create({
      header: 'Nueva Tarea',
      inputs: [
        {
          label: 'Nombre de la tarea',
          name: 'tarea',
          type: 'text',
          placeholder: 'Nombre de la tarea'
        },
        {
          label: 'Fecha de finalizacion',
          name: 'fecha',
          type: 'date',
          min: new Date().toISOString().split('T')[0],
          max: '2025-01-12'
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
            if (data.tarea.length === 0 && data.fecha.length === 0){
              return;
            }else{
              const nuevoItem = new ListaItem(data.tarea, data.fecha);
              console.log(data.fecha);
              this.lista.items.push(nuevoItem);
              // this.nombreitem = '';

              // tslint:disable-next-line: deprecation
              this.dataServices.agregartarea(this.lista).subscribe( d => {

                console.log(this.lista);
              });



              // // tslint:disable-next-line: deprecation
              // this.dataServices.crearListaFire(data.item).subscribe( fire => {
              //   // this.router.navigateByUrl(`/pendientes/agregar/${fire.id}`);
              // });
            }

          }
        }
    ]
    });

    alert.present();


  }

  async editarTarea(lista, index) {
    const alert = await this.alertControl.create({
      header: 'Editar Tarea',
      inputs: [
        {
          label: 'Nombre de la tarea',
          name: 'tarea',
          type: 'text',
          value: lista.items[index].desc,
          placeholder: 'Nombre de la tarea'
        },
        {
          label: 'Fecha de finalizacion',
          name: 'fecha',
          type: 'date',
          value: lista.items[index].fechaFin,
          min: new Date().toISOString().split('T')[0],
          max: '2025-01-12'
        }
      ],
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          handler: () => {console.log('cancelado'); this.btn.closeSlidingItems();}
        },
        {
          text: 'Editar',
          handler: (data) => {
            if (data.tarea.length === 0 && data.fecha.length === 0){
              return;
            }else{
              const nuevoItem = new ListaItem(data.tarea, data.fecha);
              lista.items[index].desc = data.tarea;
              lista.items[index].fechaFin = data.fecha;
              // this.nombreitem = '';

              // tslint:disable-next-line: deprecation
              this.dataServices.actualizarLista(lista).subscribe( d => {

                console.log(this.lista);
              });
              this.btn.closeSlidingItems();
            }

          }
        }
    ]
    });

    alert.present();
  }
}
