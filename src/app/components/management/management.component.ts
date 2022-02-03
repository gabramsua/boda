import { Component, OnInit } from '@angular/core';
import { Quizz, User } from 'src/app/models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import constants from 'src/app/constants';
import Swal from 'sweetalert2';
import { state } from '@angular/animations';
import { config } from 'process';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  currentUser: User;
  usuariosForm: FormGroup;
  quizzForm: FormGroup;
  invitados: User[];
  invitadosCopy: User[];
  isEdit = false;
  editandoInvitado: User;
  filtrador = '';
  constants = constants;
  canciones = [
    {
    titulo: 'Cancion 1!',
    votos: 41,
    invitadosQueLaVotaron: ['Juan Adolfo Velarde', 'Ángel Fuentes', 'David Palomar']
    },
    {
    titulo: 'Cancion 2!',
    votos: 36,
    invitadosQueLaVotaron: ['Tino Tovar', 'Jose Otero', 'David Catalán']
    },
    {
    titulo: 'Cancion 3!',
    votos: 19,
    invitadosQueLaVotaron: ['Kanouté', 'Rafa Mir', 'Andrés Palop']
    },
  ]
  tituloCancionModal: string = '';
  usuariosCancionModal: string[] = [];


  
  itemsList = [
    {name: 'Todos', value: 'all'},
    {name: 'Sí', value: true},
    {name: 'No', value: false}
  ];
  radioSelected:string;
  alergicos= ''

  constructor(private _formBuilder: FormBuilder, 
    private _service: AuthService) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    // GET ALL INVITADOS
    this.invitados = [];
    this.getAll()
    this.invitadosCopy = [...this.invitados]

    // GET ALL CANCIONES
    this.getCanciones()

    // 
    this.usuariosForm = this._formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required]
    });
    this.quizzForm = this._formBuilder.group({
      pregunta: ['', Validators.required],
      r_correcta: ['', Validators.required],
      r_falsa_1: ['', Validators.required],
      r_falsa_2: ['', Validators.required],
      r_falsa_3: ['', Validators.required],
      dificultad: ['', Validators.required]
    })
    this.editandoInvitado = {
      nombre: null,
      apellidos: null,
      telefono: null,
      asistencia:null,
      tipoBus:null,
      alergias:null,
      bebida:null,
      cancion:null,
      puntuacionQuizz:null,
      acompananteDe:null,
      acompanantes: []
    }
  }

  addInvitado() {    
    const invitado: User = {
      nombre: this.usuariosForm.value.nombre,
      apellidos: this.usuariosForm.value.apellidos,
      telefono: this.usuariosForm.value.telefono,
      asistencia:null,
      tipoBus:null,
      alergias:null,
      bebida:null,
      cancion:null,
      puntuacionQuizz:null,
      acompananteDe:null,
      acompanantes: []
    }
    this.save(invitado.telefono, invitado)
  }

  getAll() {
    this._service.getAll(constants.END_POINTS.USERS).subscribe(data => {
      this.invitados = []
      data.forEach((element: any) => {
        this.invitados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      
      this.invitadosCopy = [...this.invitados]
    })
  }

  disableAdd() {
    return this.usuariosForm.value.nombre == '' ||
           this.usuariosForm.value.apellidos == '' || 
           this.usuariosForm.value.telefono == '';
  }

  save(clave, valor){
    this._service.save(constants.END_POINTS.USERS, clave, valor)
      .then(()=>{
        this.sweetAlert()
      }, error => {
        this.errorAlert(error)
      })
  }

  sweetAlert(){
    Swal.fire(
      'Añadido!',
      'Actualizamos los registros',
      'success'
    )
    this.usuariosForm = this._formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required]
    });
    this.quizzForm = this._formBuilder.group({
      pregunta: ['', Validators.required],
      r_correcta: ['', Validators.required],
      r_falsa_1: ['', Validators.required],
      r_falsa_2: ['', Validators.required],
      r_falsa_3: ['', Validators.required],
      dificultad: ['', Validators.required]
    });
  }
  errorAlert(error){
    Swal.fire(
      'Algo ha salido mal',
      'ERROR: '+error,
      'error'
    )
  }
  editInvitado(item){
    this.editandoInvitado = item
  }
  deleteInvitado(item){
    Swal.fire({
      title: '¿Estás seguro? No habrá vuelta atrás',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._service.delete(constants.END_POINTS.USERS, item.telefono)
        // TODO: Borrar también su voto de la canción y su puntuación del quizz
        if ( item.cancion ) {      
          this._service.delete(item.cancion, item.telefono)
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  translateAsistencia(bool) {
    return bool ? 'Sí' : 'No'
  }
  onRadioAsistenciaChange(item){
    switch(item.value) {
      case true:
        this.invitadosCopy = this.invitados.filter(Item => Item.asistencia === this.radioSelected);
        break;
      case false:
        this.invitadosCopy = this.invitados.filter(x => x.asistencia == null || !x.asistencia);
        break;
      case 'all':
        this.invitadosCopy = this.invitados
        break;
    }
  }
  onChangeAlergicos(){
    console.log('ver alergicos', this.alergicos)
    this.invitadosCopy = this.alergicos ? this.invitados.filter(x => x.alergias !== null) : this.invitados
  }
  addPreguntaQuizz(){
    const pregunta: Quizz = {      
      pregunta: this.quizzForm.value.pregunta,
      respuestaCorrecta: this.quizzForm.value.r_correcta,
      r_falsa_1: this.quizzForm.value.r_falsa_1,
      r_falsa_2: this.quizzForm.value.r_falsa_2,
      r_falsa_3: this.quizzForm.value.r_falsa_3,
      puntuacion: this.quizzForm.value.dificultad,
      // pista: '',
    }

    
    this._service.guardarPregunta(constants.END_POINTS.QUIZZ_PREGUNTAS, pregunta)
      .then(()=>{
        this.sweetAlert()
      }, error => {
        this.errorAlert(error)
      })
  }
  getCanciones(){
    this.canciones = []
    for (let i = 1; i < 7; i++) {
      const song = {
        titulo: '',
        votos: 0,
        invitadosQueLaVotaron: []
      }

      this._service.getAllRanking('cancion_'+i).subscribe(data => {
        song.titulo = constants.VALUES.TITULOS_CANCIONES['CANCION_'+i]
        song.votos = data.length - 1
        data.forEach((element: any) => {
          if(element.id != 0) song.invitadosQueLaVotaron.push(this.getDatosFromPhone(element.id))
        })
      })
      this.canciones.push(song)
    }
  }

  openModalCancion(index){
    this.tituloCancionModal = this.canciones[index].titulo;
    this.usuariosCancionModal = this.canciones[index].invitadosQueLaVotaron;
  }

  getDatosFromPhone(phone){
    const invitado = this.invitados.find(elem => elem.telefono == phone)
    return invitado?.nombre + ' ' + invitado?.apellidos;


  }
}
