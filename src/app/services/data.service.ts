import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Componente } from '../interfaces/interfaces';
import { Lista } from '../models/lista.models';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  listas: Lista[] = [];
  // lista: Lista[] = [];
  uid: string;

  url = 'https://your-tasks-9ae65-default-rtdb.firebaseio.com/';
  constructor( private http: HttpClient, private Auth: AngularFireAuth, private afs: AngularFirestore, 
    private platform: Platform, private googlePlus: GooglePlus) {
     this.getlistas().subscribe( list => {
      //  console.log('soy el del constructor', list);
      //  if (!list.items) {
      //     list.items = [];
      //     console.log('entre para el length');
      //   }
       this.listas = list;
     });

     this.uid = localStorage.getItem('uid');
    //  console.log(this.uid);
     }

  getOpt() {
    return this.http.get<Componente[]>('/assets/data/menu-opt.json');
  }

   borrarLista(lista: Lista){

    // const temList = this.listas.filter( data => data.id !== lista.id);
    //   this.listas = this.listas.filter( data => data.id !== lista.id);
      // return this.http.put(`${this.url}/listas.json`, this.listas);

    // tslint:disable-next-line: deprecation
    this.http.delete(`${this.url}/listas/${lista.id}.json`).subscribe( data => {
        // console.log('soy despues de eliminar', data);
        this.getlistas().subscribe( list => {
          // console.log('soy el de obtener depues de borrar', list);
          this.listas = list;
        });
    });

   }

   obtenerItem(id: string | number){
    // id = Number(id);
    // console.log('Estoy buscando por id');
    return this.listas.find(data => data.id === id);
   }

    crearListaFire(titulo: string): Observable<any> {
      const listaFire = new Lista(titulo, localStorage.getItem('uid'));
      this.listas.push(listaFire);
      return  this.http.post(`${this.url}/listas.json`, listaFire)
                  .pipe(
                    map( (res: any) => {
                      listaFire.id = res.name;
                      return listaFire;
                    } )
                  );
    }

    getlistas(): any {
     return this.http.get(`${this.url}/listas.json`)
                .pipe(
                  map( this.crearArreglo),
                  delay(1000)
                );
    }

    crearArreglo( listaObj: object): any {
      const Listas: Lista[] = [];

      if (listaObj === null) { return []; }

      Object.keys(listaObj).forEach( key => {
        const lista: Lista = listaObj[key];
        // console.log('UID FUERA DEL IF', localStorage.getItem('uid'));
        if (lista.uid === localStorage.getItem('uid')) {
          lista.id = key;
          // console.log('UID DENTRO DEL IF', localStorage.getItem('uid'));
          Listas.push(lista);
        }
      });

      return Listas;
    }

    agregartarea(lista: Lista) {
      const listTem = {
      ...lista
    };

      delete listTem.id;
      // console.log(lista.id);
      // console.log(listTem);
      return this.http.put(`${this.url}/listas/${lista.id}.json`, listTem);
    }

    actualizarLista(list: Lista) {
      const listTem = {
        ...list
      };
      delete listTem.id;
      // console.log('Actuzalizar', listTem);
      return this.http.put(`${this.url}/listas/${list.id}.json`, listTem);
    }


    // Registro de usuario
    registerUser(email: string, password: string){
      return this.Auth.createUserWithEmailAndPassword( email, password)
      .then((res) => {
      //  console.log('El usuario se ha creado correctamente');
      })
      .catch( err => Promise.reject(err));
   }

    // Login de usuario
 loginUser(email: string, password: string){
  return this.Auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      Promise.resolve(user);
      // console.log(user.user.uid);
      localStorage.setItem('uid',  user.user.uid);
    }
      )
    .catch(err => Promise.reject(err));
}

// Devuelve la session
get Session(){
  return this.Auth.authState;
 }

  // Logout de usuario
  logout(){
    this.Auth.signOut().then(() => {
      // console.log('hemos salido');
      localStorage.removeItem('uid');
    });
  }

  login(proveedor: string){

    if (proveedor === 'google') {
       return this.Auth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider()).then (user => {
        Promise.resolve(user);
          localStorage.setItem('uid',  user.user.uid);
        }).catch(err => Promise.reject(err));
    } else {
      return this.Auth.signInWithPopup(new firebase.default.auth.TwitterAuthProvider()).then (user => {
        Promise.resolve(user);
          localStorage.setItem('uid',  user.user.providerData[0].uid);
        }).catch(err => Promise.reject(err));

    }
  }


  async loginGoogleAndroid() {
    const res = await this.googlePlus.login({
      'webClientId': '853806287700-66jig01q66n41aikl36fflodb50lajfl.apps.googleusercontent.com' ,
      'offline': true
    });
    const resConfirmed = await this.Auth.signInWithCredential(firebase.default.auth.GoogleAuthProvider.credential(res.idToken));
    const user = resConfirmed.user;
    localStorage.setItem('uid',  user.uid);
    // this.picture = user.photoURL;
    // this.name = user.displayName;
    // this.email = user.email;
  }

}

