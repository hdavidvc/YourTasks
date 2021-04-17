import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.models';

@Pipe({
  name: 'filtroTerminado',
  pure: false
})
export class FiltroTerminadoPipe implements PipeTransform {

  transform(lista: Lista[], terminada = true): Lista[] {
    return lista.filter(data => data.terminada === terminada);
  }

}
