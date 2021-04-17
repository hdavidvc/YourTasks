


export class ListaItem{

    desc: string;
    completado: boolean;
    fechaFin: string;

    constructor(desc: string, fecha: string){
        this.desc = desc;
        this.completado = false;
        this.fechaFin = fecha;
    }
}
