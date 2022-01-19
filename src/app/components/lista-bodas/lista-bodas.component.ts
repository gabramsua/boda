import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackBarComponent } from 'shared/SnackBarComponent.component';

@Component({
  selector: 'app-lista-bodas',
  templateUrl: './lista-bodas.component.html',
  styleUrls: ['./lista-bodas.component.scss']
})
export class ListaBodasComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  copiar() {
    // this._snackBar.open('¡Copiado!', null, {
    //   duration: 2000,
    //   panelClass: ['mat-secondary']
    // });
    this._snackBar.openFromComponent(CustomSnackBarComponent, {data: '¡Copiado!', duration: 2000});
  }
}
// @Component({
//     selector: 'snackbar',
//     template: `<span style="color: white">¡Copiado!</span>`
//   })
// export class CustomSnackBarComponent {}
  