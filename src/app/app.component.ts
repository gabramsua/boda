import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'boda2022';
  user: User;
  
  constructor(public _service: AuthService){}

  ngOnInit(): void {
    this._service.currentUser$.subscribe( user => {
      console.log('app copmponent', user)
      this.user = user;
    })
  }
}
