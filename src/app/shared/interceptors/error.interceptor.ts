import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status >= 400 && err.status < 600) {
          const detail = err.error?.message || err.message || 'Unknown error';
          this.messageService.add({
            severity: 'error',
            summary: `Error ${err.status}`,
            detail: detail,
            life: 6000,
          });
        }
        return throwError(() => err);
      })
    );
  }
}
