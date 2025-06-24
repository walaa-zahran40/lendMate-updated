import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private permissions: { [key: string]: string } = {};

  constructor() {
    this.loadPermissions();
  }

  public loadPermissions() {
    const permissionsFromSession = sessionStorage.getItem('permissions');
    console.log(permissionsFromSession);
    if (permissionsFromSession) {
      this.permissions = JSON.parse(permissionsFromSession);
    } else {
      const token = sessionStorage.getItem('authToken');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        this.permissions = decodedToken || {};
        this.savePermissionsToSession();
      }
    }
  }

  private savePermissionsToSession() {
    sessionStorage.setItem('permissions', JSON.stringify(this.permissions));
  }

  // hasPermission(permission: string): boolean {
  //   return this.permissions[permission] === 'true';
  // }
  public hasPermission(permission: string): boolean {
    return this.permissions[permission] === 'true' ? true : false;
  }

  clearPermissions() {
    this.permissions = {};
    sessionStorage.removeItem('permissions');
  }
}
