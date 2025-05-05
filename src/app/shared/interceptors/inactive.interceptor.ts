// src/app/inactive.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class InactiveInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // If we’re coming back from a reload, clear the flag on the first GET
    if (req.method === 'GET' && localStorage.getItem('areaPageRefreshed')) {
      localStorage.removeItem('areaPageRefreshed');
    }

    return next.handle(req).pipe(
      tap((event) => {
        if (!(event instanceof HttpResponse)) {
          return;
        }

        // Unwrap envelopes
        const raw = event.body;
        const payload = raw?.result ?? raw?.data ?? raw;

        // Normalize items carrying isActive
        let items: any[] = [];
        if (Array.isArray(payload) && payload.some((i) => 'isActive' in i)) {
          items = payload;
        } else if (payload?.items && Array.isArray(payload.items)) {
          items = payload.items.filter((i: any) => 'isActive' in i);
        } else if (
          payload &&
          typeof payload === 'object' &&
          'isActive' in payload
        ) {
          items = [payload];
        }

        // Log what we saw
        if (items.length) {
          items.forEach((item) => {});
        } else {
        }

        const hasInactiveResponse = items.some((i) => i.isActive === false);

        // Also catch outgoing PUT/PATCH with isActive:false
        const isUpdateCall = req.method === 'PUT' || req.method === 'PATCH';
        const sentInactive = req.body && req.body.isActive === false;
        if (isUpdateCall) {
        }

        // If either path sees an inactive flag, reload once
        if (hasInactiveResponse || (isUpdateCall && sentInactive)) {
          if (!localStorage.getItem('areaPageRefreshed')) {
            localStorage.setItem('areaPageRefreshed', 'true');
            window.location.reload();
          } else {
          }
        }
      })
    );
  }
}
