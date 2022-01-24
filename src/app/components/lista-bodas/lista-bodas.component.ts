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
    this._snackBar.openFromComponent(CustomSnackBarComponent, {data: '¡Copiado!', duration: 2000});
  }
}
  