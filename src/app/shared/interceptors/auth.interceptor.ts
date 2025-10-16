import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenKey = sessionStorage.getItem('tokenKey');

    const bypassUrls = ['api/auth/Login', '/api/authentication'];

    const shouldBypass = bypassUrls.some((url) => req.url.includes(url));

    if (shouldBypass || !tokenKey) {
      return next.handle(req);
    }

    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${tokenKey}`),
    });

    return next.handle(clonedRequest);
  }
}
