import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectBusinessuinitService {

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  constructor(
    private http: HttpClient
  ) { }

  getBusinessUnit(): Observable<any[]> {
    const url = `${this.baseUrl}/${apiRoutes.businessunit.base}`;
    return this.http.get<any[]>(url);
  }
}
