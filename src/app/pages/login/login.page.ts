import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { NavController } from '@ionic/angular';


import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = {
    email: '',
    password: ''
  };
messageErr: string;

  constructor(private alertCtrl: AlertController, private dataService: DataService, private navCtrl: NavController,
              private platform: Platform, private googlePlus: GooglePlus) { }

  ngOnInit() {
      this.dataService.getlistas();
  }

  onSubmit(formulario: NgForm) {
    console.log('submit');
    console.log(this.usuario);
    console.log(formulario);

    this.dataService.loginUser(this.usuario.email, this.usuario.password ).then((user) => {
      this.dataService.getlistas().subscribe(datata =>
        {
        this.dataService.listas = datata;
        console.log(datata);
        }
        );
      this.navCtrl.navigateRoot('/home');
        }
      )
       .catch( async err => {

        if (err.code === 'auth/user-not-found') {
          this.messageErr = 'Este usuario no existe';
        } else {
          this.messageErr = 'Esta contraseña es incorrecta';
        }
        const alert = await this.alertCtrl.create({
          header: 'Error',
          subHeader: this.messageErr,
          buttons: ['Aceptar']
        });
        await alert.present();
      });

    
  }

  login(proveedor: string): any {

    this.dataService.login(proveedor).then((user) => {
            this.navCtrl.navigateRoot('/home');

    });
  }
  loginGoogle() {
    if (this.platform.is('android')) {
      this.dataService.loginGoogleAndroid();
      console.log("Soy android");

    } else {
      this.login('google');
    }
  }
}
