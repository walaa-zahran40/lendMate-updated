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
    console.log('[Permissions] Starting to load permissions...');

    const stored = sessionStorage.getItem('permissions');
    if (stored) {
      console.log('[Permissions] Found cached permissions in sessionStorage');
      this.permissions = JSON.parse(stored);
      console.log('[Permissions] Loaded from session:', this.permissions);
    } else {
      console.log(
        '[Permissions] No cached permissions found. Decoding tokens...'
      );

      const backendToken = sessionStorage.getItem('authToken');
      let backendClaims = {};

      if (backendToken) {
        try {
          backendClaims = jwtDecode(backendToken) as any;
          console.log('[Permissions] Decoded backend token:', backendClaims);
        } catch (error) {
          console.warn('[Permissions] Failed to decode backend token:', error);
        }
      } else {
        console.warn('[Permissions] No backend token found in sessionStorage');
      }

      const account = this.msal.instance.getAllAccounts()[0];
      const aadClaims = (account?.idTokenClaims as any) || {};
      console.log('[Permissions] AAD Claims:', aadClaims);

      const topLevelPerms = [
        '/Clients/GetAll',
        '/Meetings/GetAll',
        '/LeasingMandates/GetAll',
        '/ApplicationRoles/GetAll',
      ];

      const needFallback = topLevelPerms.some(
        (k) => !(backendClaims as any)[k]
      );
      console.log(`[Permissions] Need fallback to AAD claims? ${needFallback}`);

      // Merge logic: backendClaims take priority
      this.permissions = {
        ...(needFallback ? aadClaims : {}),
        ...backendClaims,
      };

      console.log('[Permissions] Final merged permissions:', this.permissions);

      sessionStorage.setItem('permissions', JSON.stringify(this.permissions));
      console.log('[Permissions] Saved to sessionStorage');
    }

    this.permissionsLoaded$.next();
    console.log('[Permissions] permissionsLoaded$ emitted');
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
