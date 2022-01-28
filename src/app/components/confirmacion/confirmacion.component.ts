import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { trigger, state, style, animate, transition } from '@angular/animations';
import constants from 'src/app/constants';
import { User } from 'src/app/models/models';
@Component({
  selector: 'confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss'],
  animations: [
    trigger(
      'fadeIn', [
        transition(':enter', [
            style({ height: 0, opacity: 0 }),
            animate('1s ease-out', style({ height: 300, opacity: 1 }))
          ]),
        transition(':leave', [
            style({ height: 300, opacity: 1 }),
            animate('1s ease-in', style({ height: 0, opacity: 0 }))
          ])
      ]
    ),
    trigger(
      'enterAnimationRight', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class ConfirmacionComponent implements OnInit {

  isLinear = false;
  floatLabelControl = new FormControl('auto');
  quien_eres: FormGroup;
  asistencia: FormGroup;
  buses: FormGroup;
  alergias: FormGroup;
  bebida: FormGroup;
  acompanantes : FormGroup;
  currentUser: User;
  addAcompanante2 = false;
  addAcompanante3 = false;
  
  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);

  constructor(private _formBuilder: FormBuilder, 
    private _service: AuthService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let nombre, apellidos, asistencia, bebida, tipoBus, alergias;
    let nombre1, apellido1, telefono1;
    let nombre2, apellido2, telefono2;
    let nombre3, apellido3, telefono3;

    if(this.currentUser){
      nombre = this.currentUser.nombre
      apellidos = this.currentUser.apellidos
      asistencia = this.currentUser.asistencia
      bebida = this.currentUser.bebida
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
      bebida = '';
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
    this.bebida = this._formBuilder.group({
      drinks: [bebida, Validators.required]
    });
    this.acompanantes = this._formBuilder.group({
      nombre1: nombre1,
      apellido1:apellido1,
      telefono1: telefono1,

      nombre2: nombre2,
      apellido2:apellido2,
      telefono2: telefono2,

      nombre3: nombre3,
      apellido3:apellido3,
      telefono3: telefono3
    })
  }
  addAcompanante() {
    if(!this.addAcompanante2) this.addAcompanante2 = true;
    else if(this.addAcompanante2 && !this.addAcompanante3) this.addAcompanante3 = true;
  }
  removeAcompanante() {
    if(this.addAcompanante3) this.addAcompanante3 = false
    else if(this.addAcompanante2 && !this.addAcompanante3) this.addAcompanante2 = false;

  }

  guardar() {
    const formulario: User = {
      nombre: this.quien_eres.value.nombre,
      apellidos: this.quien_eres.value.apellidos,
      telefono: this.currentUser.telefono,
      asistencia: this.asistencia.value.vienes_o_que,
      tipoBus: this.buses.value.traslado,
      alergias: this.alergias.value.intolerancias,
      bebida: this.bebida.value.drinks,
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
    // Info de los acompañanets del formulario
    if(acompanante1) {
      formularioAcompanante1 = {
        nombre: this.acompanantes.value.nombre1,
        apellidos: this.acompanantes.value.apellido1,
        telefono: this.acompanantes.value.telefono1,
        asistencia: this.asistencia.value.vienes_o_que,
        tipoBus: this.buses.value.traslado,
        alergias: null,
        bebida: null,
        cancion: null,
        puntuacionQuizz: null,
        acompananteDe: this.currentUser.telefono,
        acompanantes: [
          {
            nombre: this.quien_eres.value.nombre,
            apellidos: this.quien_eres.value.apellidos,
            telefono: this.currentUser.telefono,
          }
        ]
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
          bebida: null,
          cancion: null,
          puntuacionQuizz: null,
          acompananteDe: this.currentUser.telefono,
          acompanantes: [
            {
              nombre: this.quien_eres.value.nombre,
              apellidos: this.quien_eres.value.apellidos,
              telefono: this.currentUser.telefono,
            },{
              nombre: this.acompanantes.value.nombre1,
              apellidos: this.acompanantes.value.apellido1,
              telefono: this.acompanantes.value.telefono1
            }
          ]
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
            bebida: null,
            cancion: null,
            puntuacionQuizz: null,
            acompananteDe: this.currentUser.telefono,
            acompanantes: [
              {
                nombre: this.quien_eres.value.nombre,
                apellidos: this.quien_eres.value.apellidos,
                telefono: this.currentUser.telefono,
              },{
                nombre: this.acompanantes.value.nombre1,
                apellidos: this.acompanantes.value.apellido1,
                telefono: this.acompanantes.value.telefono1
              },{
                nombre: this.acompanantes.value.nombre2,
                apellidos: this.acompanantes.value.apellido2,
                telefono: this.acompanantes.value.telefono2
              }
            ]
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
          // this.save(this.acompanantes.value.telefono3, formularioAcompanante3)
        }
        // this.save(this.acompanantes.value.telefono2, formularioAcompanante2)
      }
    }

    // Persistencia de los acompañantes    
    // Recorrer los acompañantes y comprobar si los objetos que hay son iguales a los que ha metido => Si no, hacer insert de los nuevos invitados
    // Es al revés, hay que recorrer los que tengo y ver si están en el currentUser$
    let obj1 =  {nombre: this.acompanantes.value.nombre1,apellidos: this.acompanantes.value.apellido1,telefono: this.acompanantes.value.telefono1}
    let obj2 =  {nombre: this.acompanantes.value?.nombre2,apellidos: this.acompanantes.value?.apellido2,telefono: this.acompanantes.value?.telefono2}
    let obj3 =  {nombre: this.acompanantes.value?.nombre3,apellidos: this.acompanantes.value?.apellido3,telefono: this.acompanantes.value?.telefono3}
    const misAcompanantes = [obj1, obj2, obj3];

    misAcompanantes.map((elem, index) => {
      this.currentUser.acompanantes.map(existe => {
        switch(index){
          case 0:
            if(this.addAcompanante && !this.addAcompanante2 && !this.addAcompanante3 && elem != null && JSON.stringify(elem) == JSON.stringify(existe)){
              console.log('0. ya existe', elem.nombre)
            } else if(this.addAcompanante && !this.addAcompanante2 && !this.addAcompanante3 && elem.nombre != null && elem.telefono != null) {
              console.log('0. habría que insertar a ', formularioAcompanante1)
              // this.save(elem.telefono, obj1)
            }
            break;
          case 1:
            if(this.addAcompanante2 && !this.addAcompanante3 && elem != null && JSON.stringify(elem) == JSON.stringify(existe)){
              console.log('1. ya existe ', elem.nombre)
            } else if(this.addAcompanante2 && !this.addAcompanante3 && elem.nombre != null && elem.telefono != null) {
              console.log('1. habría que insertar a ', formularioAcompanante2)
              console.log('1. habría que actualizar a ', formularioAcompanante1)
              // this.save(elem.telefono, obj2)
            }
            break;
          case 2:
            if(this.addAcompanante3 && elem != null && JSON.stringify(elem) == JSON.stringify(existe)){
              console.log('2. ya existe ', elem.nombre)
            } else if(this.addAcompanante3 && elem.nombre != null && elem.telefono != null) {
              console.log('2. habría que insertar a ', formularioAcompanante3)
              console.log('2. habría que actualizar a ', formularioAcompanante1)
              console.log('2. habría que actualizar a ', formularioAcompanante2)
              // this.save(elem.telefono, obj3)
            }
            break;
        }
      })
    })
    console.log('y siempre hay que actualizar a ', formulario)

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
