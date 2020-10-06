import { NewsReason } from '../models/newsReason.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';

@Injectable({
  providedIn: 'root'
})
export class SelectNewsReasonTypeService {

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`; 

  constructor(private http: HttpClient) { }

  getNewsReasonTypes(id: number) {
    const url = `${this.baseUrl}/${apiRoutes.newsReason.base}/${id}`;
    return this.http.get<NewsReason[]>(url);
  }
}
