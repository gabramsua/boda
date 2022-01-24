import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { FormControl, FormGroup } from '@angular/forms';
import constants from 'src/app/constants';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users: any[] = [];
  loggedUser: any;
  formulario: FormGroup = new FormGroup({
    telefono: new FormControl()
  })
  user: User;

  constructor(public _service: AuthService) {}

  ngOnInit(): void {
    // this.getAll()
    // this.get('645303663')
    this._service.currentUser$.subscribe( user => {
      this.user = user;
    })
  }
  login() {
    this._service.login(constants.END_POINTS.USERS, '645303663')
  }

  // post() {
  //   this._service.save({item2: 'val'})
  //   .then(()=>{
  //     console.log('todo ok')
  //   }, error => {
  //     console.log(error)
  //   })
  // }

  // getAll() {
  //   this._service.getAll(constants.END_POINTS.USERS).subscribe(data => {
  //     data.forEach((element: any) => {
  //       console.log(element.payload.doc.data())
  //       this.users.push({
  //         id: element.payload.doc.id,
  //         ...element.payload.doc.data()
  //       })
  //     });
  //   })
  // }

  // get(phone) {
  //   this._service.get(constants.END_POINTS.USERS, phone).subscribe(data => {
  //     this.loggedUser = data.data()
  //   })
  // }
}
