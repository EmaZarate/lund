import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';

@Injectable({
  providedIn: 'root'
})
export class DocketService {

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  constructor() { }

  getDocketInfo(data) {
    let url = `${this.baseUrl}/${apiRoutes.user.base}/${data}`;
  }
}
