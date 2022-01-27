import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  items: Observable<any[]>;
  currentUser$ = new Subject<User>();
  loginFailed$ = new Subject<string>();
  
  constructor(private firebase: AngularFirestore,
    private router: Router) { 
  }
  
  save(collection, id, item) {
    // return this.firebase.collection(collection).add(item); // PARA INSERTAR
    return this.firebase.collection(collection).doc(id).set(item); // PARA INSERTAR CON ID PROPIO

  }

  getAll(collection): Observable<any> {
    return this.firebase.collection(collection).snapshotChanges();
  }
  
  get(collection, id: string) {
    return this.firebase.collection(collection).doc(id).get()
  }

  update(collection, id:string, data:any) {
    return this.firebase.collection(collection).doc(id).update(data);
  }

  delete(collection, id) {
    return this.firebase.collection(collection).doc(id).delete();
  }
  
  deleteField(collection, id, field) {
    // console.log('borrando el campo:', field, 'de la tabla:', id)
    return this.firebase.collection(collection).doc(id).update({
      // [field]: this.firebase.FieldValue.delete()
      [field]: null//this.firebase.firestore.doc(id).delete
      // [field]: this.firebase.firestore.doc(field).delete
  });
  }

  login(collection, phone: string) {
    // // this.firebase.collection(collection).doc(phone).get().subscribe( data => {
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
          acompananteDe: data.data()['acompananteDe'],
          acompanantes: data.data()['acompanantes']
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser$.next(user);
        this.router.navigate(['/home']);
      })
      .catch( err => {
        this.loginFailed$.next('Necesitas poner tu teléfono para entrar. Sentimos las molestias.')
    })
  }
  fakeLogin(collection, phone) {
  const user = {
            nombre:'Gabriel',
            apellidos: 'Ramos Suan',
            telefono: phone, //data.data()['telefono'],
            asistencia:'true',
            tipoBus:'bus_vuelta',
            alergias:'nope',
            bebidas:null,
            cancion:'cancion_3',
            puntuacionQuizz:null,
            acompananteDe: null,
            acompanantes: [
              {
                nombre: 'Cai',
                apellidos: 'Ramos Gallardo',
                telefono: '123321'}
            ]
          }
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser$.next(user);
          this.router.navigate(['/home']);
  }

  getCurrentUser$(): Observable<any> {
    return this.currentUser$.asObservable();
  }
}
