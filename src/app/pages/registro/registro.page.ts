import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario = {
    email: '',
    password: ''
  };
  constructor(public dataService: DataService,  public alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {

  }

   onSubmit(formulario: NgForm) {
    console.log('submit');
    console.log(this.usuario);
    console.log(formulario);

    this.dataService.registerUser(this.usuario.email, this.usuario.password)
    .then((user) => {
      // El usuario se ha creado correctamente
      this.router.navigateByUrl(`/login`);
    })
    .catch(async err => {
       const alert = await this.alertCtrl.create({
        header: 'Error',
        subHeader: err.message,
        buttons: ['Aceptar']
      });
       await alert.present();
    });

  }

}
