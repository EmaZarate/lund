import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CaseHigherInstanceDerivationService {

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  constructor(private http: HttpClient) { }

  caseDerivation(caseId: number, 
                 businessUnitId: number, 
                 observation: string, 
                 newsReasonTypeId: number,
                 updateFile: boolean | null,
                 email: string,
                 address: string,
                 zipCode: number | null,
                 provinceName: string,
                 cityName: string,
                 stateId: number | null) {
    const body = {
      CaseId: caseId,
      BusinessUnitId: businessUnitId,
      Comments: observation,
      NewsReasonTypeId: newsReasonTypeId,
      updateFile,
      email,
      address,
      zipCode,
      provinceName,
      cityName,
      stateId
    }
    const url = `${this.baseUrl}/${apiRoutes.news.base}/caseDerivation`;
    return this.http.post<boolean>(url, body);
  }}
