import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private permissions: Record<string, string> = {};
  /** Emit whenever we (re)load from sessionStorage */
  public permissionsLoaded$ = new ReplaySubject<void>(1);

  constructor() {
    this.loadPermissions();
  }

  public loadPermissions(): void {
    const stored = sessionStorage.getItem('permissions');
    if (stored) {
      this.permissions = JSON.parse(stored);
    } else {
      const token = sessionStorage.getItem('authToken');
      if (token) {
        this.permissions = jwtDecode(token) as any;
        sessionStorage.setItem('permissions', JSON.stringify(this.permissions));
      }
    }
    // this.next() will now replay to *any* subscriber, new or old
    this.permissionsLoaded$.next();
  }

  public hasPermission(key: string): boolean {
    return this.permissions[key] === 'true';
  }

  clearPermissions() {
    this.permissions = {};
    sessionStorage.removeItem('permissions');
    this.permissionsLoaded$.next();
  }
}
