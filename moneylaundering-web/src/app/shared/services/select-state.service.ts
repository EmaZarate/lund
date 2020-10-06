import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';
import { StateModel } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})

export class SelectStateService {

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;
  
  constructor(private http: HttpClient) { }

  getStates() {
    const url = `${this.baseUrl}/${apiRoutes.state.base}`;
    return this.http.get<StateModel[]>(url);
  }

  getState(id: number) {
    const url = `${this.baseUrl}/${apiRoutes.state.base}/${id}`;
    return this.http.get<StateModel>(url);
  }
}
