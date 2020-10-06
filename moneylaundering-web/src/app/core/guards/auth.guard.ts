import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthorized = this.isAuthorized();
    if (!isAuthorized) {
      this.router.navigate([`/`]);
      return false;
    }
    return isAuthorized;
  }

  private isAuthorized(): boolean {
    return this.authService.isAuthorized();
  }
}
