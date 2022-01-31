import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipeInvitados'
})
export class FilterPipeInvitadosPipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    const invitados = [];
    for (const invitado of value) {
      if(
        invitado.nombre.toLowerCase().indexOf(args) > -1 || 
        this.removerTildes(invitado.nombre).toLowerCase().indexOf(args) > -1 || 
        invitado.apellidos?.toLowerCase().indexOf(args) > -1 || 
        this.removerTildes(invitado.apellidos).toLowerCase().indexOf(args) > -1 || 
        invitado.telefono.indexOf(args) > -1 || 
        invitado.alergias?.toLowerCase().indexOf(args) > -1 ) {
          invitados.push(invitado);
      }
    }
    return invitados;
  }

  removerTildes(cadena) {
    return cadena.replace("Á", "A")
            .replace("É", "E")
            .replace("Í", "I")
            .replace("Ó", "O")
            .replace("Ú", "U")
            .replace("á", "a")
            .replace("é", "e")
            .replace("í", "i")
            .replace("ó", "o")
            .replace("ú", "u");
}
}
