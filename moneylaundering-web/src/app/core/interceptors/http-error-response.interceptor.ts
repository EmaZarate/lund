import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private toastr: ToastrService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap(evt => {
        }, (err: any) => {

            if (err instanceof HttpErrorResponse) {

                if (err.status == 401) {
                    // Unauthorized
                    localStorage.removeItem('auth_tokenn');
                    this.router.navigate(['/login']);
                }

                if (err.status == 500) {
                    this.toastr.error(err.error.error[0]);
                }

                if (err.status == 403) {
                    this.toastr.error(err.error.error[0]);
                }

                if (err.status == 400) {
                    this.toastr.error(err.error.error[0]);
                }
            }
        }));
    }
}
