import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService, User } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import constants from 'src/app/constants';
@Component({
  selector: 'confirmacion',
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
  currentUser: User;
  
  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);

  constructor(private _formBuilder: FormBuilder, 
    private _service: AuthService) {}

  ngOnInit() {
    
    this._service.getCurrentUser$().subscribe(user => {
      // this.loggedUser = user;
      console.log(user)
      // this.users.push(user)
    })
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let nombre, apellidos, asistencia, bebidas, tipoBus, alergias;

    if(this.currentUser){
      nombre = this.currentUser.nombre
      apellidos = this.currentUser.apellidos
      asistencia = this.currentUser.asistencia
      bebidas = this.currentUser.bebidas
      tipoBus = this.currentUser.tipoBus
      alergias = this.currentUser.alergias
    } else {
      nombre = '';
      apellidos = '';
      asistencia = '';
      bebidas = '';
      tipoBus = '';
      alergias = '';
    }

    this.quien_eres = this._formBuilder.group({
      nombre: [nombre, Validators.required],
      apellidos: [apellidos, Validators.required],
    });
    this.asistencia = this._formBuilder.group({
      vienes_o_que: ['', Validators.required]
    });
    this.buses = this._formBuilder.group({
      traslado: [tipoBus, Validators.required]
    });
    this.alergias = this._formBuilder.group({
      intolerancias: [alergias, Validators.required]
    });
    this.bebidas = this._formBuilder.group({
      drinks: [bebidas, Validators.required]
    });
  }
  guardar() {
    // CHECK SI SE PUEDE USAR EL OPERADOR SPREAD
    const formulario: User = {
      nombre: this.quien_eres.value.nombre,
      apellidos: this.quien_eres.value.apellidos,
      telefono: this.currentUser.telefono,
      asistencia: this.asistencia.value.vienes_o_que,
      tipoBus: this.buses.value.traslado,
      alergias: this.alergias.value.intolerancias,
      bebidas: this.bebidas.value.drinks,
      cancion: this.currentUser.cancion,
      puntuacionQuizz: this.currentUser.puntuacionQuizz
    } 
    //  ACTUALIZAR EL CURRENT USER
    localStorage.setItem('currentUser', JSON.stringify(formulario));

    this._service.update(constants.END_POINTS.USERS, this.currentUser.telefono, formulario)
      .then(()=>{
        Swal.fire(
          '¡Gracias!',
          'Hemos registrado tu respuesta y lo tendremos en cuenta. =)',
          'success'
        )
      }, error => {
        console.log(error)
      })
  }
}
