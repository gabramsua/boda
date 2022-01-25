import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'La Boda del 2022';
  user: User;
  
  constructor(public _service: AuthService, public guardService: AuthGuardService){}

  ngOnInit(): void {
    this._service.currentUser$.subscribe( user => {
      this.user = user;
    })
    if(!this.user) {
      console.log('no hay user => redirigir')
      this.guardService.checkUserLogin()
    }
  }
}
