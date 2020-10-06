import { HttpErrorResponse } from '@angular/common/http';

export interface AuthBase {
  error: HttpErrorResponse;
  message: string;
  getRedirectionRoute(): string[];
}