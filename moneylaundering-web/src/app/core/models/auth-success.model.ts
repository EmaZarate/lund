import { AuthBase } from './auth-base.model';
import { AuthSuccessResponse } from './auth-succes-response.model';
import { HttpErrorResponse } from '@angular/common/http';

export class AuthSuccess implements AuthBase {

  private _redirectionRoute: string[];
  authToken: string;
  error: HttpErrorResponse;
  message: string;
  refreshToken: string;

  constructor(data: AuthSuccessResponse, redirectionRoute?: string) {
    this._redirectionRoute = !!redirectionRoute ? [redirectionRoute] : ['/'];
    this.authToken = data.auth_Token;
    this.refreshToken = data.refresh_Token;
  }

  getRedirectionRoute() {
    return this._redirectionRoute;
  }
}