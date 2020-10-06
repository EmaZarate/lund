import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FilterTableProduceManagement } from './models/filterTableProducerManagement';
import { Producer } from './models/Producer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';

@Injectable({
  providedIn: 'root'
})
export class ProducerManagementService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  getProducers(filter: FilterTableProduceManagement): Observable<Producer[]>{
    let params = this.getParams(filter);
    const url = `${this.baseUrl}/${apiRoutes.producer.base}`;
    return this.http.get<Producer[]>(url,{params: params});
  }

  getById(id: number): Observable<Producer>{
    const url = `${this.baseUrl}/${apiRoutes.producer.base}/${id}`;
    return this.http.get<Producer>(url);
  }

  getParams(query) {
    
    let params: HttpParams = new HttpParams();
    for (const key of Object.keys(query))  {
        if (query[key]) {
            if (query[key] instanceof Array)  
            {
                for (var i=0;i<=query[key].length-1;i++)
                  params = params.append(key.toString()+'['+i.toString()+']',query[key][i]);
                // evita que rompa la api porque espera arrays
                if (query[key].length==0)
                  params = params.append(key.toString()+'[]', undefined);
            } 
            else {
                params = params.append(key.toString(), query[key]);
            }
        }
    }
    return params;
  }
}
