import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { apiRoutes } from '../../../constants/api-routes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakePossitiveService {

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  constructor(
    private http: HttpClient
  ) { }

  falsepossitive(CaseID: number, 
                 BussinesUnitID: number, 
                 Comments: string, 
                 NewsReasonTypeId: number,
                 updateFile: boolean | null,
                 email: string,
                 address: string,
                 zipCode: number | null,
                 provinceName: string,
                 cityName: string,
                 stateId: number | null
    ): Observable<boolean> {
    const body = {
      BusinessUnitId: BussinesUnitID,
      CaseId: CaseID,
      Comments: Comments,
      NewsReasonTypeId:NewsReasonTypeId,
      updateFile,
      email,
      address,
      zipCode,
      provinceName,
      cityName,
      stateId
    }
    const url = `${this.baseUrl}/${apiRoutes.news.base}/fakePossitive`;
    return this.http.post<boolean>(url, body);
  }
}
