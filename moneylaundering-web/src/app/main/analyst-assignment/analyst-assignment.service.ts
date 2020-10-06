import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Case } from 'src/app/main/analyst-assignment/models/case.model';
import { FilterTableCaseManagement } from '../case-management/models/filterTableCaseManagement';
import { map, finalize } from 'rxjs/operators';
import { IAnalystAssignment } from './models/analyst.model';

@Injectable({
  providedIn: 'root'
})
export class AnalystAssignmentService {

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;
  
  constructor(
    private http: HttpClient
  ) { }

  getCase(id: number) {
    const url = `${this.baseUrl}/${apiRoutes.case.base}/${id}`;
    return this.http.get<Case>(url);
  }

  getCases(filter: FilterTableCaseManagement): Observable<Case[]>{
    let params = this.getParams(filter);
    const url = `${this.baseUrl}/${apiRoutes.case.getByFilter}`;
    return this.http.get<Case[]>(url,{params: params});
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

  analystAssignment(analystArray: IAnalystAssignment) 
  {
    
    const url = `${this.baseUrl}/${apiRoutes.case.base}/analystAssignment`;
    return this.http.post<boolean>(url, analystArray)
                    // .pipe(map(res => {
                    //   let count = 0;
                    //   if(res) {
                    //     count ++;
                    //   }
                    //   console.log(count);
                    //   return count;
                    // }), finalize(() => {
                    //   console.log('FINAL');
                    // }));
  }
}