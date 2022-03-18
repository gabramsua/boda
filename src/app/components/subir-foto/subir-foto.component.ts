import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';
import { StorageService } from 'src/app/services/storage.service';
import constants from 'src/app/constants';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-subir-foto',
  templateUrl: './subir-foto.component.html',
  styleUrls: ['./subir-foto.component.scss']
})
export class SubirFotoComponent implements OnInit {

  currentUser: User;
  imagenes: any[] = [];

  constructor(private storageService: StorageService,
              private _service: AuthService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))

    // Pedir todas las fotos y mostrarlas
    this.getImages()
  }

  getImages(){
    this._service.getAllRanking(constants.END_POINTS.FOTOS).subscribe(data => {
      data.forEach((element: any) => {
        console.log(element.data())
        
        // this.imagenes.push({
        //   ...element.data()
        // })
      });
    })
  }

  loadImage(event){
    let archivo = event.target.files
    let reader = new FileReader()

    reader.readAsDataURL(archivo[0])
    reader.onloadend = () => {
      this.imagenes.push(reader.result)
      this.storageService.uploadImage(this.currentUser.telefono + '_' + Date.now(), reader.result).then(urlImage => {
        console.log(urlImage)
        // Guardar registro en la base de datos con 
        // url, nombre apellidos, telefono, la fecha y hora
        let valor = {
          url: urlImage,
          nombre: this.currentUser.nombre,
          apellidos: this.currentUser.apellidos,
          telefono: this.currentUser.telefono,
          fecha: Date.now()
        }
        
        this._service.guardarPregunta(constants.END_POINTS.FOTOS, /*urlImage,*/ valor)
        .then(()=>{
          Swal.fire(
            '¡Gracias!',
            'Imagen subida correctamente. ¡Ahora a pasarlo bien!',
            'success'
          )
        }, error => {
          Swal.fire(
            'Algo ha salido mal',
            'Si el problema persiste ponte en contacto con nosotros, pero DESPUÉS de la barra libre.',
            'error'
          )
          console.log(error)
        })
      })
    }
  }
}
