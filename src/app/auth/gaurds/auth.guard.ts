import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservice : AuthService){
    console.log('started--------')
  }
  canActivate(): boolean {
    console.log('this.authservice.isAuthenticated()==>;',this.authservice.isAuthenticated())
    return this.authservice.isAuthenticated();
  }
  
}
