import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  notAllowed$ = new Subject<string>();

  constructor(
    private router: Router
  ) { }


  canActivate() {
    return this.checkUserLogin()
      
  }
  checkUserLogin(): boolean {
    this.notAllowed$.next('Necesitas poner tu teléfono para poder entrar en esa sección.');

    if ( localStorage.getItem('currentUser') ) return true;
    
    this.router.navigate(['/']);
    return false;
  }
}
