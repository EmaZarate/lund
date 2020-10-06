import { IUser } from './../models/userSelect.interface';
import { User } from 'src/app/shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;
  mappedResp: IUser[];
  constructor(private http: HttpClient) { }

  getUserByRoleList(roleId: string) {
    const url = `${this.baseUrl}/${apiRoutes.user.base}/${roleId}`
    return this.http.get(url)
  }
}
