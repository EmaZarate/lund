import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';

@Injectable({
  providedIn: 'root'
})
export class SelectDocumentstypeService {

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;


  constructor(private http: HttpClient) {
   }


  getDocumentsType() : Observable<any[]> {
    const url = `${this.baseUrl}/${apiRoutes.documentType.base}`;
    return this.http.get<any[]>(url);
  }

  // saveDocument(body: NewDocument){
  //   const url = `${this.baseUrl}/${apiRoutes.documentType.base}`;
  //   return this.http.post<NewDocument>(url, body);
  // }
}
