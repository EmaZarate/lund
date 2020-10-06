import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeExpirationService {
  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  constructor(
    private http: HttpClient
  ) { }

  changeExpiration(CaseID: number,
                   BussinesUnitID: number, 
                   Comments: string, 
                   ExpirationDate: Date , 
                   NewsReasonTypeId: number,
                   updateFile: boolean | null,
                   email: string,
                   address: string,
                   zipCode: number | null,
                   provinceName: string,
                   cityName: string,
                   stateId: number | null
    ): Observable<boolean> {
    let body={};
    if (ExpirationDate != null){
      body = {
      BusinessUnitId: BussinesUnitID,
      CaseId: CaseID,
      Comments: Comments,
      ExpirationDate: ExpirationDate,
      NewsReasonTypeId:NewsReasonTypeId,
      updateFile,
      email,
      address,
      zipCode,
      provinceName,
      cityName,
      stateId
      }
    }
    else{
      body = {
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
    }
    const url = `${this.baseUrl}/${apiRoutes.news.base}/changeExpiration`;
    return this.http.post<boolean>(url, body);
  }

}
