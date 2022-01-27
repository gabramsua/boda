import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import constants from 'src/app/constants';
import { User } from 'src/app/models/models';
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
  acompanantes : FormGroup;
  currentUser: User;
  
  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);

  constructor(private _formBuilder: FormBuilder, 
    private _service: AuthService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let nombre, apellidos, asistencia, bebidas, tipoBus, alergias;
    let nombre1, apellido1, telefono1;
    let nombre2, apellido2, telefono2;
    let nombre3, apellido3, telefono3;

    if(this.currentUser){
      nombre = this.currentUser.nombre
      apellidos = this.currentUser.apellidos
      asistencia = this.currentUser.asistencia
      bebidas = this.currentUser.bebidas
      tipoBus = this.currentUser.tipoBus
      alergias = this.currentUser.alergias

      // acom1 = this.currentUser.acompanantes.acom1.nombre
      nombre1 = this.currentUser.acompanantes[0]?.nombre;
      apellido1 = this.currentUser.acompanantes[0]?.apellidos;
      telefono1 = this.currentUser.acompanantes[0]?.telefono;

      nombre2 = this.currentUser.acompanantes[1]?.nombre;
      apellido2 = this.currentUser.acompanantes[1]?.apellidos;
      telefono2 = this.currentUser.acompanantes[1]?.telefono;

      nombre3 = this.currentUser.acompanantes[2]?.nombre;
      apellido3 = this.currentUser.acompanantes[2]?.apellidos;
      telefono3 = this.currentUser.acompanantes[2]?.telefono;

    } else {
      nombre = '';
      apellidos = '';
      asistencia = '';
      bebidas = '';
      tipoBus = '';
      alergias = '';

      nombre1 = '';
      apellido1 = '';
      telefono1 = '';

      nombre2 = '';
      apellido2 = '';
      telefono2 = '';

      nombre3 = '';
      apellido3 = '';
      telefono3 = '';
    }

    this.quien_eres = this._formBuilder.group({
      nombre: [nombre, Validators.required],
      apellidos: [apellidos, Validators.required],
    });
    this.asistencia = this._formBuilder.group({
      vienes_o_que: [asistencia, Validators.required]
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
    this.acompanantes = this._formBuilder.group({
      nombre1: nombre1,
      apellido1:apellido1,
      telefono1: telefono1
    })
  }
  guardar() {
    const formulario: User = {
      nombre: this.quien_eres.value.nombre,
      apellidos: this.quien_eres.value.apellidos,
      telefono: this.currentUser.telefono,
      asistencia: this.asistencia.value.vienes_o_que,
      tipoBus: this.buses.value.traslado,
      alergias: this.alergias.value.intolerancias,
      bebidas: this.bebidas.value.drinks,
      cancion: this.currentUser.cancion,
      puntuacionQuizz: this.currentUser.puntuacionQuizz,
      acompananteDe: this.currentUser.acompananteDe,
      acompanantes: []
    } 

    // VER SI HAY ACOMPAÑANTES
    let acompanante1 = this.acompanantes.value.nombre1 && this.acompanantes.value.telefono1
    let acompanante2 = this.acompanantes.value.nombre2 && this.acompanantes.value.telefono2
    let acompanante3 = this.acompanantes.value.nombre3 && this.acompanantes.value.telefono3

    let formularioAcompanante1,formularioAcompanante2,formularioAcompanante3: User;
    // Hay que ver si es INSERT o bien UPDATE
    // la información está en el currentUser
    if(acompanante1) {
      formularioAcompanante1 = {
        nombre: this.acompanantes.value.nombre1,
        apellidos: this.acompanantes.value.apellido1,
        telefono: this.acompanantes.value.telefono1,
        asistencia: this.asistencia.value.vienes_o_que,
        tipoBus: this.buses.value.traslado,
        alergias: null,
        bebidas: null,
        cancion: null,
        puntuacionQuizz: null,
        acompananteDe: this.currentUser.telefono,
        acompanantes: [{
          nombre: this.quien_eres.value.nombre,
          apellidos: this.quien_eres.value.apellidos,
          telefono: this.currentUser.telefono,
        }]
      }

      formulario.acompanantes.push({
          nombre: this.acompanantes.value.nombre1,
          apellidos: this.acompanantes.value.apellido1,
          telefono: this.acompanantes.value.telefono1})

      if(acompanante2) {
        formularioAcompanante2 = {
          nombre: this.acompanantes.value.nombre2,
          apellidos: this.acompanantes.value.apellido2,
          telefono: this.acompanantes.value.telefono2,
          asistencia: this.asistencia.value.vienes_o_que,
          tipoBus: this.buses.value.traslado,
          alergias: null,
          bebidas: null,
          cancion: null,
          puntuacionQuizz: null,
          acompananteDe: this.currentUser.telefono,
          acompanantes: []
        }
        formulario.acompanantes.push({
            nombre: this.acompanantes.value.nombre2,
            apellidos: this.acompanantes.value.apellido2,
            telefono: this.acompanantes.value.telefono2})
        formularioAcompanante1.acompanantes.push({
            nombre: this.acompanantes.value.nombre2,
            apellidos: this.acompanantes.value.apellido2,
            telefono: this.acompanantes.value.telefono2})

        
        if(acompanante3) {
          formularioAcompanante3 = {
            nombre: this.acompanantes.value.nombre3,
            apellidos: this.acompanantes.value.apellido3,
            telefono: this.acompanantes.value.telefono3,
            asistencia: this.asistencia.value.vienes_o_que,
            tipoBus: this.buses.value.traslado,
            alergias: null,
            bebidas: null,
            cancion: null,
            puntuacionQuizz: null,
            acompananteDe: this.currentUser.telefono,
            acompanantes: []
          }
          formulario.acompanantes.push({
              nombre: this.acompanantes.value.nombre3,
              apellidos: this.acompanantes.value.apellido3,
              telefono: this.acompanantes.value.telefono3})
          formularioAcompanante1.acompanantes.push({
              nombre: this.acompanantes.value.nombre3,
              apellidos: this.acompanantes.value.apellido3,
              telefono: this.acompanantes.value.telefono3})
          formularioAcompanante2.acompanantes.push({
              nombre: this.acompanantes.value.nombre3,
              apellidos: this.acompanantes.value.apellido3,
              telefono: this.acompanantes.value.telefono3})

          // Máximo 3 acompañantes
          // console.log('VER SI USER TIENE A ACOMPANANTE')
          // this.save(this.acompanantes.value.telefono3, formularioAcompanante3)
        }
        // this.save(this.acompanantes.value.telefono2, formularioAcompanante2)
      }
      console.log('VER SI USER TIENE A ACOMPANANTE', this.currentUser.acompanantes)
      // Recorrer los acompañantes y comprobar si los objetos que hay son iguales a los que ha metido
      this.currentUser.acompanantes.map(elem => {
        console.log(elem, elem === {
          nombre: this.acompanantes.value.nombre1,
          apellidos: this.acompanantes.value.apellido1,
          telefono: this.acompanantes.value.telefono1})
      })

      // this.save(this.acompanantes.value.telefono1, formularioAcompanante1)
      // this.update(this.acompanantes.value.telefono1, formularioAcompanante1)
    }
    console.log('FORMULARIO USER', formulario)
    console.log('FORMULARIO ACOMPAÑANTE', formularioAcompanante1)

    //  ACTUALIZAR EL CURRENT USER
    // localStorage.setItem('currentUser', JSON.stringify(formulario));
    // this.update(this.currentUser.telefono, formulario)
  }

  save(clave, valor){
    this._service.save(constants.END_POINTS.USERS, clave, valor)
      .then(()=>{        
        Swal.fire(
          '¡Gracias!',
          'Hemos registrado tu respuesta y lo tendremos en cuenta. =)',
          'info'
        )
      }, error => {
        Swal.fire(
          'Algo ha salido mal',
          'Por favor, revisa los datos y si el problema persiste ponte en contacto con nosotros.',
          'error'
        )
        console.log(error)
      })
  }

  update(clave, valor){
    this._service.update(constants.END_POINTS.USERS, clave, valor)
      .then(()=>{
        Swal.fire(
          '¡Gracias!',
          'Hemos registrado tu respuesta y lo tendremos en cuenta. =)',
          'success'
        )
      }, error => {
        Swal.fire(
          'Algo ha salido mal',
          'Por favor, revisa los datos y si el problema persiste ponte en contacto con nosotros.',
          'error'
        )
        console.log(error)
      })
  }
}
