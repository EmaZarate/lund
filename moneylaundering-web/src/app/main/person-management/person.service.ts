import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { apiRoutes } from "src/constants/api-routes";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Person } from "./models/person.model";
import { Risk } from './models/risk.model';
import { FilterTablePersonManagement } from 'src/app/main/person-management/models/filterTablePersonManagement';
import { PaginationService } from 'src/app/shared/services/pagination.service';

@Injectable({
  providedIn: "root",
})

export class PersonService {
  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  constructor(private http: HttpClient,
              private paginationService: PaginationService) {}

  getById(id: number) {
    const url = `${this.baseUrl}/${apiRoutes.person.base}/${id}`;
    return this.http.get<Person>(url);
  }

  getByFilter(filter: FilterTablePersonManagement): Observable<Person[]> {
    let params = this.paginationService.getParams(filter);
    const url = `${this.baseUrl}/${apiRoutes.person.getByFilter}`;
    return this.http.get<Person[]>(url, {params : params});
  }

  getParams(data: any)
  {
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
       httpParams = httpParams.append(key, data[key]);
    });
    return httpParams;
  }

  businessUnitUpdate
  (
    id: number, 
    financialProfile: number, 
    assignedRisk : number
  ) 
  
  {
    const body = {
      id: id,
      financialProfile: financialProfile,
      assignedRisk: assignedRisk
    }

    const url = `${this.baseUrl}/${apiRoutes.person.base}/BusinessUnitUpdate`;
    return this.http.post<boolean>(url, body);
  }
  getActivity() {
    const url = `${this.baseUrl}/${apiRoutes.activity.base}`;
    return this.http.get<any>(url);
  }
}


