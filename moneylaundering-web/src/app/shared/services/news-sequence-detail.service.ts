import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';
import { News } from 'src/app/main/case-management/models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsSequenceDetailService {
  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  constructor(private http: HttpClient) { }
  getNewsById(id: number) {
    const url = `${this.baseUrl}/${apiRoutes.news.base}/${id}`;
    return this.http.get<News>(url);
  }
}
