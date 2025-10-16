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
      const backendToken = sessionStorage.getItem('authToken');
      let backendClaims = {};

      if (backendToken) {
        try {
          backendClaims = jwtDecode(backendToken) as any;
        } catch (error) {}
      } else {
      }

      const account = this.msal.instance.getAllAccounts()[0];
      const aadClaims = (account?.idTokenClaims as any) || {};

      const topLevelPerms = [
        '/Clients/GetAll',
        '/Meetings/GetAll',
        '/LeasingMandates/GetAll',
        '/ApplicationRoles/GetAll',
      ];

      const needFallback = topLevelPerms.some(
        (k) => !(backendClaims as any)[k]
      );

      // Merge logic: backendClaims take priority
      this.permissions = {
        ...(needFallback ? aadClaims : {}),
        ...backendClaims,
      };

      sessionStorage.setItem('permissions', JSON.stringify(this.permissions));
    }

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
