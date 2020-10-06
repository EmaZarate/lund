/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// import { NoopInterceptor } from './noop-interceptor';
import { ErrorInterceptor } from './http-error-response.interceptor';
import { LoadingInterceptor } from './http-loading.interceptor';
/** Http interceptor providers in outside-in order */
export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
];
