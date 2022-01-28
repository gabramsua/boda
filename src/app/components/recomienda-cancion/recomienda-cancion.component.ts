import { Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { AuthService } from 'src/app/services/auth.service';
import constants from 'src/app/constants';
import { User } from 'src/app/models/models';

@Component({
  selector: 'app-recomienda-cancion',
  templateUrl: './recomienda-cancion.component.html',
  styleUrls: ['./recomienda-cancion.component.scss']
})
export class RecomiendaCancionComponent implements OnInit {
  
  @ViewChild('demoYouTubePlayer') demoYouTubePlayer: ElementRef<HTMLDivElement>;
  videoWidth: number | undefined;
  videoHeight: number | undefined;
  canciones: FormGroup;
  currentUser: User;
  constants = constants;

  constructor(
    private _formBuilder: FormBuilder,
    private _service: AuthService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let cancion;

    if(this.currentUser) cancion = this.currentUser.cancion
    else cancion = ''

    this.canciones = this._formBuilder.group({
      cancion: [cancion, Validators.required]
    });
  }

  guardarCancion () {
    // Si hay voto anterior, borrar
    if ( this.currentUser.cancion ) {      
      this._service.delete(this.currentUser.cancion, this.currentUser.telefono)
    }
    // Insertar el voto en la tabla correspondiente de la canción
    this._service.save(this.canciones.value.cancion, this.currentUser.telefono, {})

    // Actualizar el usuario con su voto
    this.updateUser()
  }

  disableResults() {
    return this.currentUser.cancion === null || this.currentUser.cancion === ''
  }

  updateUser(){
    //  ACTUALIZAR EL CURRENT USER
    this.currentUser.cancion = this.canciones.value.cancion;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        
    // Actualizar el registro del current User
    this._service.update(constants.END_POINTS.USERS, this.currentUser.telefono, this.currentUser)
      .then(()=>{
        // this.getResultados()
        Swal.fire(
          '¡Gracias!',
          'Hemos registrado tu respuesta y ya estamos un poco más cerca de saber qué canción pondremos',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            // Swal.fire(
            //   'Deleted!',
            //   'Your file has been deleted.',
            //   'success'
            // )
          }
        })
      }, error => {
        console.log(error)
      })
  }
}
