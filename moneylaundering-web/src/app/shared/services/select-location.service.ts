import { StateModel } from './../models/state.model';
import { LocationModel } from './../models/location.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';

@Injectable({
  providedIn: 'root'
})
export class SelectLocationService {

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;
  
  constructor(private http: HttpClient) { }

  getLocationById(id: number) {
    const url = `${this.baseUrl}/${apiRoutes.location.base}/${id}`;
    return this.http.get<LocationModel>(url);
  }

  getLocations(stateObject: StateModel) {
    let params = this.getParams({id: stateObject.stateId });
    const url = `${this.baseUrl}/${apiRoutes.location.getByFilter}`;
    return this.http.get<LocationModel[]>(url, {params: params});
  }
  
  getParams(data: any)
  {
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
       httpParams = httpParams.append(key, data[key]);
    });
    return httpParams;
  }
  getLocationByStateId(id: number){
    const url = `${this.baseUrl}/${apiRoutes.location.getByFilter}?id=${id}`;
    return this.http.get<any>(url);
  }
}
