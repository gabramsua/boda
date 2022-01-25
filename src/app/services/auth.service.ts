import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import constants from '../constants';
import { Router } from '@angular/router';

export interface User {
  nombre: string;
  apellidos: string;
  telefono: string;
  asistencia: boolean;
  tipoBus: string;
  alergias: string;
  bebidas: string;
  cancion: string;
  puntuacionQuizz: Number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  items: Observable<any[]>;
  currentUser$ = new Subject<User>();
  loginFailed$ = new Subject<string>();
  
  constructor(private firebase: AngularFirestore,
    // private authGuardService: AuthGuardService,
    private router: Router) { 
  }
  
  save(item) {
    return this.firebase.collection(constants.END_POINTS.USERS).add(item);
  }

  getAll(collection): Observable<any> {
    return this.firebase.collection(collection).snapshotChanges();
  }
  
  get(collection, id: string) {
    return this.firebase.collection(collection).doc(id).get()
  }

  login(collection, phone: string) {
    // this.firebase.collection(collection).doc(phone).get().subscribe( data => {
    this.firebase.collection(collection).doc(phone).get().toPromise()
    .then( data => {
        const user = {
          nombre: data.data()['nombre'],
          apellidos: data.data()['apellidos'],
          telefono: phone, //data.data()['telefono'],
          asistencia: data.data()['asistencia'],
          tipoBus: data.data()['tipoBus'],
          alergias: data.data()['alergias'],
          bebidas: data.data()['bebida'],
          cancion: data.data()['cancion'],
          puntuacionQuizz: data.data()['puntuacionQuizz'],
        }
        this.currentUser$.next(user);
        this.router.navigate(['/home']);
      })
      .catch( err => {
        this.loginFailed$.next('Necesitas poner tu teléfono para entrar. Sentimos las molestias.')
    })
  }

  getCurrentUser$(): Observable<any> {
    return this.currentUser$.asObservable();
  }
}
