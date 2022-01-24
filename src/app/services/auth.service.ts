import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import constants from '../constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  items: Observable<any[]>;
  
  constructor(private firebase: AngularFirestore) { }
  
  // login(): Promise<any>{
  //   this.items = this.firebase.collection('items').valueChanges();
  //   // return this.firebase.collection('users').add(credentials)
  //   console.log('items', this.items)
  //   return;
  // }

  save(item) {
    return this.firebase.collection(constants.END_POINTS.USERS).add(item);
  }

  getAll(collection): Observable<any> {
    // console.log('LOGIN', this.firebase.collection(constants.END_POINTS.USERS).get())
    return this.firebase.collection(collection).snapshotChanges();
  }
  
  get(collection, phone): Observable<any> {
    // return this.firebase.collection(collection).get(phone);
    return this.firebase.collection(collection).doc(phone).get()
  }
}
