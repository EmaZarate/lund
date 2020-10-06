import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AppConfig } from './appconfig.service';
import { TokenService } from './token.service';
import { AuthSuccessResponse } from '../models/auth-succes-response.model';
import { AuthSuccess } from '../models/auth-success.model';
import { DecodedAuthToken } from 'src/app/shared/models/decoded-auth-token.model';
import { User } from 'src/app/shared/models/user.model';
import { isArray } from 'util';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginAD } from '../models/loginAD';
import { LoadingService } from './loading.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private static errorInLogin = new Subject();
  errorInLogin$ = AuthService.errorInLogin.asObservable();
  private user: User = this.generateUser(this.tokenService.getDecodedAuthToken());
  private userSource$ = new BehaviorSubject<User>(this.user);
  user$ = this.userSource$.asObservable();
  private isLogging = new Subject<boolean>();
  isLogging$ = this.isLogging.asObservable();
  private urlAuth = environment.server.api.auth+ "/api/auth/login-ad";
  private authWindow: Window;
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  private loggedIn = false;
  failed: boolean;
  error: string;
  errorDescription: string;

  constructor(
    private router: Router,
    private _config: AppConfig,
    private tokenService: TokenService,
    private _httpService: HttpClient,
    private loadingService: LoadingService
  ) { 
    this.loggedIn = !!localStorage.getItem('auth_token');
    this._authNavStatusSource.next(this.loggedIn);
  }




  handleMessage(event: Event) {
    event.preventDefault();
    const message = event as MessageEvent;

    // Only trust messages from the below origin.
    //
    if ((message.origin !== environment.server.web.home)) return;

    const result = JSON.parse(message.data);

    if (!result.status) {
      this.failed = true;
      this.error = result.error;
      this.errorDescription = result.errorDescription;
      this.loadingService.setLoading(false);
      this.router.navigate(['/error-login']);
    }
    else {
      this.isLogging.next(true);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let loginAD: LoginAD = {
      applicationToken: environment.applicationToken,
      accessToken: result.accessToken,
      appId: environment.activeDirectory.appId,
      appSecret: environment.activeDirectory.appSecret,
      redirectUri: environment.activeDirectory.redirectUri
    }
      this.failed = false;
      return this._httpService
      .post<AuthSuccessResponse>(
        this.urlAuth,loginAD, httpOptions).subscribe(
          response => {
            this.loadingService.setLoading(false);
            if (response) {
              AuthService.errorInLogin.next(null);
              this.executeAuthentication(response);
              this.router.navigate(['/home-page']);
            }
          },
          error => {
            AuthService.errorInLogin.next(error);
            this.failed = true;
            this.error = error;
            this.loadingService.setLoading(false);
            localStorage.removeItem('businessUnitId');
            this.router.navigate(['/error-login']);
          });
    }
  }
  
  
  isLoggedIn(){
    return this.loggedIn;
  }

  public executeAuthentication(response: AuthSuccessResponse) {
    this.saveTokens(new AuthSuccess(response)),
    this.updateUser(this.generateUser(this.tokenService.getDecodedAuthToken()));
  }

  private generateUser(decodedToken: DecodedAuthToken) {
    return !!decodedToken
      ? new User({
          userId: decodedToken.nameid,
          cuitCuil: decodedToken.CuitCuil,
          email: decodedToken.email,
          firstName: decodedToken.FirstName,
          gender: decodedToken.gender,
          idType: decodedToken.OfficialIdType,
          lastName: decodedToken.LastName,
          // roles: isArray(decodedToken.role) ? decodedToken.role : [],
          roles: decodedToken.role,
          taxId: decodedToken.TaxId,
        })
      : null;
  }

  private saveTokens(response: AuthSuccess) {
    this.tokenService.setAuthToken(response.authToken);
    this.tokenService.setRefreshToken(response.refreshToken);
  }

  private updateUser(user: User) {
    this.user = user;
    this.userSource$.next(user);
  }

  cleanUpUser() {
    this.tokenService.clean();
    this.updateUser(null);
  }

  isAuthorized(): boolean {
    const hasAuthToken = !!this.tokenService.getAuthToken();
    if (!hasAuthToken) {
      return false;
    }
    if (this.tokenService.isAuthTokenExpired()) {
      this.updateUser(null);
      return false;
    }
    if (!this.user) {
      return false;
    }
    return true;
  }

  
  logout() {
    var url = 'https://login.microsoftonline.com/common/oauth2/logout';
    var w = 600;
    var h = 400;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    this.authWindow = window.open(url, null, 'width=' + w + ',height=' + h + ',top=' + top + ',left=' + left);
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
    this.cleanUpUser();
    setTimeout(()=>{
      this.router.navigate(['login']);
    },4*1000);
    
  }
}




