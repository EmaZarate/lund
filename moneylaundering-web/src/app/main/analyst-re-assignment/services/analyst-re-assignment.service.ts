import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';

@Injectable({
  providedIn: 'root'
})
export class AnalystReAssignmentService {

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  constructor(private http: HttpClient) { }

  analystReAssignmentNews(caseId: number, 
                          businessUnitId: number, 
                          analystId: string, 
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
      caseId,
      businessUnitId,
      analystId,
      comments: observation,
      newsReasonTypeId,
      updateFile,
      email,
      address,
      zipCode,
      provinceName,
      cityName,
      stateId
    }
    const url = `${this.baseUrl}/${apiRoutes.case.base}/analystReAssignment`;
    return this.http.post<boolean>(url, body);
  }
}
