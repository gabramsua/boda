import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit, OnDestroy {

  users: any[] = [];
  loggedUser: any;
  loginForm: FormGroup
  adminForm: FormGroup
  telefono = new FormControl('', [this.validateInput, Validators.required]);
  user: User;
  isAdmin = false;

  constructor(
    public _service: AuthService,
    public _guard: AuthGuardService,
    private _formBuilder: FormBuilder, ) {}

  ngOnInit(): void {
    this.isAdmin = false;
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
    
    this.adminForm = this._formBuilder.group({
      pass: ['', Validators.required]
    });
  }
  ngOnDestroy(): void {
      this.loginForm = null
      this.adminForm = null
      this.isAdmin = false
  }
  validateInput(c: FormControl) {
    let first = /[6-7]{1}[0-9]{8}$/;
    let second = /[3]{1}[0-9]{9}$/;
    return (first.test(c.value) || second.test(c.value)) ? null : {
      validateInput: {
        valid: false
      }
    }
  }
  login(phone:string = this.user?.telefono) {
    if(!phone) phone = JSON.stringify(this.loginForm.value.telefono); // this.telefono.value // 

    // Is Administración
    if(phone === constants.ADMIN_NOVIOS.MARIA || phone === constants.ADMIN_NOVIOS.NENO) {
      this.isAdmin = true;
    } else { 
      this._service.login(constants.END_POINTS.USERS, phone)
    }
  }
  disableLogin() {
    return this.loginForm.value.telefono === '' || 
           (JSON.stringify(this.loginForm.value.telefono).charAt(0) != '3' && JSON.stringify(this.loginForm.value.telefono).length !== 9) ||
           (JSON.stringify(this.loginForm.value.telefono).charAt(0) == '3' && JSON.stringify(this.loginForm.value.telefono).length !== 10)
  }
  disableAdminLogin() {
    return this.adminForm.value.pass === ''; // || JSON.stringify(this.adminForm.value.pass).length !== 9
  }
  adminLogin() {
    this._service.adminLogin(this.adminForm.value.pass, this.loginForm.value.telefono)
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
