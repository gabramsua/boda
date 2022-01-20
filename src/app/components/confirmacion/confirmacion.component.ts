import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {

  isLinear = false;
  floatLabelControl = new FormControl('auto');
  quien_eres: FormGroup;
  asistencia: FormGroup;
  buses: FormGroup;
  alergias: FormGroup;
  bebidas: FormGroup;
  
  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.quien_eres = this._formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
    });
    this.asistencia = this._formBuilder.group({
      vienes_o_que: ['', Validators.required]
    });
    this.buses = this._formBuilder.group({
      traslado: ['', Validators.required]
    });
    this.alergias = this._formBuilder.group({
      intolerancias: ['', Validators.required]
    });
    this.bebidas = this._formBuilder.group({
      drinks: ['', Validators.required]
    });
  }
}
