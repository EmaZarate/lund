import { Injectable, Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})

export class TokenService {

  JwtHelper = new JwtHelperService();
  private readonly authTokenKey = 'auth_token';
  private readonly refreshTokenKey = 'refresh_token';
  
  constructor(
  ) { }

  decodeToken<T>(token: string): T {
    return this.JwtHelper.decodeToken(token);
  }

  getAuthToken(): string {
    return localStorage.getItem(this.authTokenKey);
  }

  getAuthTokenExpiration(): Date {
    const authToken = this.getAuthToken();
    if (!authToken) {
      return null;
    }
    return this.JwtHelper.getTokenExpirationDate(authToken);
  }

  setAuthToken(token: string) {
    localStorage.setItem(this.authTokenKey, token);
  }

  
  setRefreshToken(token: string) {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  isAuthTokenExpired(): boolean {
    const authToken = this.getAuthToken();
    if (!authToken) {
      return true;
    }
    return this.isTokenExpired(authToken);
  }

  
  isTokenExpired(token: string): boolean {
    return this.JwtHelper.isTokenExpired(token);
  }

  clean() {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  getDecodedAuthToken(): any {
    return this.JwtHelper.decodeToken(this.getAuthToken());
  }
}
