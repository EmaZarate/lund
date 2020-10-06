import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AppConfig {
  public BASE_URL: string = null;
  public APP_ID: string = null;

  constructor(private http: HttpClient) {

  }

  public load() {
    return this.http.get('../../assets/config.json').toPromise().then(x => {
      this.BASE_URL = x['BASE_URL'];
      this.APP_ID = x['APP_ID'];
    });
  }
}