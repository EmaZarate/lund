import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CaseInfoRequirementService {

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  constructor(private http: HttpClient) { }
  getEmailType() {
    const url = `${this.baseUrl}/${apiRoutes.mailType.base}`;
    return this.http.get<any>(url);
  }
  getDocumentLetterType() {
    const url = `${this.baseUrl}/${apiRoutes.documentLetterType.base}`;
    return this.http.get<any>(url);
  }
  getDuplicates(id: number){
    const url = `${this.baseUrl}/${apiRoutes.person.groupCode}?id=${id}`;
    return this.http.get<any>(url);
  }
  getVehicle(id: number){
    const url = `${this.baseUrl}/${apiRoutes.vehicle.base}/${id}`;
    return this.http.get<any>(url); 
  }
  infoRequirement(
    caseID: number,
    businessUnitID: number,
    comments: string,
    updateFile: boolean,
    email: string,
    address: string,
    zipCode: number,
    provinceName: string,
    cityName: string,
    stateId: number,
    newsId: number,
    contactMail: string,
    mailTypeId: number,
    subject: string,
    message: string
  ) {
        const body = {
          caseID: caseID,
          businessUnitID: businessUnitID,
          comments: comments,
          updateFile: updateFile,
          email: email,
          address: address,
          zipCode: zipCode,
          provinceName: provinceName,
          cityName: cityName,
          stateId: stateId,
          newsId: newsId,
          contactMail: contactMail,
          mailTypeId: mailTypeId,
          subject: subject,
          message: message
        }
    const url = `${this.baseUrl}/${apiRoutes.news.base}/infoRequirementCommand`;
    return this.http.post<boolean>(url, body);
    }
}