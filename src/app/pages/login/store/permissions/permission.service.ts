import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { ReplaySubject, Subject } from 'rxjs';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private permissions: Record<string, string> = {};
  /** Emit whenever we (re)load from sessionStorage */
  public permissionsLoaded$ = new ReplaySubject<void>(1);

  constructor(private msal: MsalService) {
    this.loadPermissions();
  }

  public loadPermissions(): void {
    const stored = sessionStorage.getItem('permissions');
    if (stored) {
      this.permissions = JSON.parse(stored);
    } else {
      // 2) decode the backend token (from auth/Login)
      const backendToken = sessionStorage.getItem('authToken');
      let backendClaims = {};
      if (backendToken) {
        try {
          backendClaims = jwtDecode(backendToken) as any;
        } catch {
          /* ignore */
        }
      }
      // 3) if any of our four top-level perms are missing, fall back to idTokenClaims
      const account = this.msal.instance.getAllAccounts()[0];
      const aadClaims = (account?.idTokenClaims as any) || {};
      const needFallback = [
        '/Clients/GetAll',
        '/Meetings/GetAll',
        '/LeasingMandates/GetAll',
        '/ApplicationRoles/GetAll',
      ].some((k) => !(backendClaims as any)[k]);

      // 4) merge: backendClaims wins, then fallback to aadClaims
      this.permissions = {
        ...(needFallback ? aadClaims : {}),
        ...backendClaims,
      };
      sessionStorage.setItem('permissions', JSON.stringify(this.permissions));
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
