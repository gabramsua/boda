import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-subir-foto',
  templateUrl: './subir-foto.component.html',
  styleUrls: ['./subir-foto.component.scss']
})
export class SubirFotoComponent implements OnInit {

  currentUser: User;
  imagenes: any[] = [];

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  loadImage(event){
    console.log(event.target.files)

    let archivo = event.target.files
    let reader = new FileReader()

    reader.readAsDataURL(archivo[0])
    reader.onloadend = () => {
      this.imagenes.push(reader.result)
      this.storageService.uploadImage(this.currentUser.telefono + '_' + Date.now(), reader.result).then(urlImage => {
        console.log(urlImage)
      })
    }
  }
}
