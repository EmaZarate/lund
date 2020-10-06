import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from './models/status';
import { CaseGroup } from './models/caseGroup';
import { CaseType } from './models/caseType';

@Injectable({
  providedIn: 'root'
})
export class CaseManagementService {

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  constructor(private http: HttpClient) { }

  getStatus(): Observable<Status[]>{
    const url = `${this.baseUrl}/${apiRoutes.status.base}`;
    return this.http.get<Status[]>(url);
  }

  getCaseGroup(): Observable<CaseGroup[]>{
    const url = `${this.baseUrl}/${apiRoutes.caseGroup.base}`;
    return this.http.get<CaseGroup[]>(url);
  }

  getCaseType(): Observable<CaseType[]>{
    const url = `${this.baseUrl}/${apiRoutes.caseType.base}`;
    return this.http.get<CaseType[]>(url);
  }

}
