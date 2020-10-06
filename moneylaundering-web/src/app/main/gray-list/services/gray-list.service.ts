import { GrayListFilter } from './../models/gray-list-filter.model';
import { GrayListUpdateCommand } from './../components/gray-list-detail/gray-list-detail.component';
import { GrayListDocument } from './../models/gray-list-documents.model';
import { GrayList } from './../models/gray-list.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';
import { GrayListCommand } from '../components/gray-list-detail/gray-list-detail.component';
import { PaginationService } from 'src/app/shared/services/pagination.service';

@Injectable({
  providedIn: 'root'
})
export class GrayListService {

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  constructor(
              private http: HttpClient,
              private paginationService: PaginationService) { }

  getGrayListPersons(filter?: any) : Observable<GrayList[]> {
    let url = `${this.baseUrl}/${apiRoutes.grayList.base}`;
    let params = this.paginationService.getParams(filter);
    return this.http.get<GrayList[]>(url, { params });
  }

  getByIdGrayListPerson(id: number): Observable<GrayList> {
    let url = `${this.baseUrl}/${apiRoutes.grayList.base}/${id}`
    return this.http.get<GrayList>(url);
  }

  getGrayListDocumentsById(id: number): Observable<GrayListDocument[]> {
    let url = `${this.baseUrl}/${apiRoutes.grayListDocument.base}/${id}`
    return this.http.get<GrayListDocument[]>(url);
  }

  addNewGrayListPerson(data: GrayListCommand): Observable<boolean> {
    let url = `${this.baseUrl}/${apiRoutes.grayList.base}`;
    return this.http.post<boolean>(url, data);
  }

  updateGrayListPersonAndDocuments(data: GrayListUpdateCommand): Observable<boolean> {
    let url = `${this.baseUrl}/${apiRoutes.grayList.base}`;
    return this.http.put<boolean>(url, data);
  }
}
