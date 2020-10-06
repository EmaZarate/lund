import { Observable } from 'rxjs';
import { DocumentAttached } from '../../models/document-attached.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';

@Injectable({
  providedIn: 'root'
})
export class DocumentAttachedService {

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  constructor(private http: HttpClient) { }

  getDocumentsByPersonId(id: number): Observable<DocumentAttached[]> {
    const url = `${this.baseUrl}/${apiRoutes.document.base}/${id}`;
    return this.http.get<DocumentAttached[]>(url);
  }

  delete(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/${apiRoutes.document.base}/${id}`;
    return this.http.delete<boolean>(url);
  }

  getbase64(fileName: string) :Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${apiRoutes.file.base}/${fileName}`)
  }
}
