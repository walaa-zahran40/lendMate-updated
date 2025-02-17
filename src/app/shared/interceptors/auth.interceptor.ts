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
    // Retrieve the tokenKey from sessionStorage
    const tokenKey = sessionStorage.getItem('tokenKey');

    // Define the URLs that should bypass the interceptor (e.g., login endpoint)
    const bypassUrls = ['api/auth/Login', '/api/authentication'];

    // Check if the request URL should bypass the interceptor
    const shouldBypass = bypassUrls.some((url) => req.url.includes(url));

    // If no tokenKey is available or request should bypass, continue without modifying the request
    if (shouldBypass || !tokenKey) {
      return next.handle(req);
    }

    // Clone the request and add the tokenKey in the Authorization header
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${tokenKey}`), // Use tokenKey in Authorization header
    });

    return next.handle(clonedRequest);
  }
}
