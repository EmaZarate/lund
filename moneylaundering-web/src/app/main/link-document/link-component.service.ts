import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';
import { Observable } from 'rxjs';
import { DocumentAttached } from 'src/app/shared/models/document-attached.model';
import { CaseDocument } from './models/caseDocument';

@Injectable({
  providedIn: 'root'
})
export class LinkComponentService {

  constructor(private httpClient: HttpClient) { }

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  getDocumentsWithoutCase(personId:number): Observable<DocumentAttached[]>{
    const url = `${this.baseUrl}/${apiRoutes.document.byPersonIdWithoutCase}/${personId}`;
    return this.httpClient.get<DocumentAttached[]>(url);
  }

  linkDocument(caseDocument:CaseDocument): Observable<CaseDocument>{
    const url = `${this.baseUrl}/${apiRoutes.caseDocument.base}`;
    return this.httpClient.post<CaseDocument>(url, caseDocument);
  }
}
