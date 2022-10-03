import { Injectable } from '@angular/core';
import firebase from 'firebase/app'
import 'firebase/storage'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { environment } from 'src/environments/environment.prod'

firebase.initializeApp(environment.firebaseConfig)

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storageRef = firebase.app().storage().ref();
  imageDetailList: AngularFireList<any>;

  constructor(private firedatabase: AngularFireDatabase) { }
  async uploadImage(nombre: string, imgBase64: any){
    try{
      let respuesta = await this.storageRef.child("users/"+nombre).putString(imgBase64, 'data_url')
      return await respuesta.ref.getDownloadURL();
    }
    catch(error){
      console.log(error)
      return null;
    }
  }

  getImageDetailList() {
    this.imageDetailList = this.firedatabase.list('imageDetails')
  }

  insertImageDetail(imageDetails){
    this.imageDetailList.push(imageDetails)
  }
}
