import { ListaItem } from './lista-item.model';


export class Lista {

    id: string;
    titulo: string;
    creadaEn: Date;
    terminadaEn: Date;
    terminada: boolean;
    items: ListaItem[];
    uid: string;

    constructor(titulo: string, uid: string ) {
    this.titulo = titulo;
    this.creadaEn = new Date();
    this.terminada = false;
    this.items = [];
    this.uid = uid;

    // this.id = new Date().getTime();

    }
}
