import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';
import { HttpClient } from '@angular/common/http';
import { CommentStmt } from '@angular/compiler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestInformationService {

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  constructor(
    private http: HttpClient
  ) { }

  requestInformationCase(CaseID: number, 
                        BussinesUnitID: number, 
                        Comments: string,
                        updateFile: boolean | null,
                        email: string,
                        address: string,
                        zipCode: number | null,
                        provinceName: string,
                        cityName: string,
                        stateId: number | null): Observable<boolean> {
    const body = {
      BusinessUnitId: BussinesUnitID,
      CaseId: CaseID,
      Comments: Comments,
      updateFile,
      email,
      address,
      zipCode,
      provinceName,
      cityName,
      stateId
    }
    const url = `${this.baseUrl}/${apiRoutes.news.base}/requestInformation`;
    return this.http.post<boolean>(url, body);
  }

}
