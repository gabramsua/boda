import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import constants from 'src/app/constants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _service: AuthService) { }
  users: any[] = [];
  loggedUser: any;

  ngOnInit(): void {
    // this.getAll()
    // this.get('645303663')
  }

  post() {
    this._service.save({item2: 'val'})
    .then(()=>{
      console.log('todo ok')
    }, error => {
      console.log(error)
    })
  }

  getAll() {
    this._service.getAll(constants.END_POINTS.USERS).subscribe(data => {
      data.forEach((element: any) => {
        console.log(element.payload.doc.data())
        this.users.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  get(id) {
    this._service.get(constants.END_POINTS.USERS, id).subscribe(data => {
      // console.log(data.data())
      this.loggedUser = data.data()
    })
  }

}
