import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  notAllowed$ = new Subject<string>();

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate() {
    return this.checkUserLogin()
      
  }
  checkUserLogin(): boolean {
    this.notAllowed$.next('Necesitas poner tu teléfono para poder entrar en esa sección.');
    
    this.auth.currentUser$.subscribe(user => {
      if ( user ) return true;
    })
    this.router.navigate(['/']);
    return false;
  }
}
