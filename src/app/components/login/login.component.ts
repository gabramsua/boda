import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import constants from 'src/app/constants';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users: any[] = [];
  loggedUser: any;
  loginForm: FormGroup
  telefono = new FormControl('', [Validators.pattern("[6-7]{1}[0-9]{8}$"),Validators.required]);
  user: User;

  constructor(
    public _service: AuthService,
    public _guard: AuthGuardService,
    private _formBuilder: FormBuilder, ) {}

  ngOnInit(): void {
    // this.getAll()
    // this.get('645303663')
    this._service.currentUser$.subscribe( user => {
      this.user = user;
    })
    this.user = JSON.parse(localStorage.getItem('currentUser'))
    if(this.user)this.login();
    
    this.loginForm = this._formBuilder.group({
      telefono: ['', Validators.required]
    });
  }
  login(phone:string = this.user?.telefono) {
    if(!phone) phone = JSON.stringify(this.loginForm.value.telefono); // this.telefono.value // 
    this._service.login(constants.END_POINTS.USERS, phone)
    // this._service.login(constants.END_POINTS.USERS, phone)
  }
  disableLogin() {
    return this.loginForm.value.telefono === '' || JSON.stringify(this.loginForm.value.telefono).length !== 9
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
