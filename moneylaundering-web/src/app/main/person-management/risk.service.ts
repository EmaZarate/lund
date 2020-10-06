import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { apiRoutes } from "src/constants/api-routes";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Risk } from './models/risk.model';

@Injectable({
  providedIn: "root",
})

export class RiskService {
  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Risk[]>{
    const url = `${this.baseUrl}/${apiRoutes.risk.base}`;
    return this.http.get<Risk[]>(url);
  }
}