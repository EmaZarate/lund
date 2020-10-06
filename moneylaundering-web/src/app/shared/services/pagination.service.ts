import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';

@Injectable({
    providedIn: 'root'
})
export class PaginationService {

    private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;
    
    /**
     *
     */
    constructor(private http: HttpClient) {}

    getLength(filter: any, path: string): Observable<number> {
        console.log('into the service');
        let url = `${this.baseUrl}/${path}`;
        let params = this.getParams(filter);
        return this.http.get<number>(url, { params });
    }

    getParams(data: any): HttpParams {
        if (!data) {
            return;
          }
        let httpParams = new HttpParams();
        Object.keys(data).forEach(param => {
    
            // Set this to empty because HttpParams doesn't accept NULL values
            if (data[param] === null || data[param] === undefined) {
                data[param] = '';
            }
            // If the param is "pagination" it should iterate through their values //
            // And append them to the HttpParams //
            if (param == "pagination") {
                Object.keys(data.pagination).forEach(paginationParam => {
                    if (data.pagination[paginationParam] === null || data.pagination[paginationParam] === undefined) {
                        data.pagination[paginationParam] = '';
                    }
                    // Using template literals 'cause the API is waiting "pagination.'NameOfTheProp'" //
                    httpParams = httpParams.append(`${param}.${paginationParam}`, data.pagination[paginationParam]);
                });
            } else {
                httpParams = httpParams.append(param, data[param]);
            }
        });
        return httpParams;
    }
}

export class PaginationFunctions {

    setActualItemsPerPage(itemsPerPage: number): number {
        let actualItemsPerPage = itemsPerPage;
        return actualItemsPerPage;
    }

    setActualPage(page: number): number {
        let actualPage = page;
        return actualPage;
    }
}