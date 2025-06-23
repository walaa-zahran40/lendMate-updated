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
    const saved = sessionStorage.getItem('decodedToken');
    if (saved) {
      this.permissions = JSON.parse(saved);
      return;
    }

    const token = sessionStorage.getItem('authToken');
    if (!token) {
      this.permissions = {};
      return;
    }

    const decoded: any = jwtDecode(token);
    // Lower‐case all the claim keys
    this.permissions = Object.entries(decoded).reduce((acc, [k, v]) => {
      acc[k.toLowerCase()] = String(v);
      return acc;
    }, {} as Record<string, string>);

    sessionStorage.setItem('decodedToken', JSON.stringify(this.permissions));
  }

  private savePermissionsToSession() {
    sessionStorage.setItem('decodedToken', JSON.stringify(this.permissions));
  }

  // hasPermission(permission: string): boolean {
  //   return this.permissions[permission] === 'true';
  // }
  public hasPermission(input: string): boolean {
    // normalize & split if they passed "a,b,c"
    const keys = input
      .split(',')
      .map((k) => k.trim().toLowerCase())
      .filter((k) => !!k);

    // return true only if every key is present & === 'true'
    return keys.length > 0 && keys.every((k) => this.permissions[k] === 'true');
  }

  public clearPermissions() {
    this.permissions = {};
    sessionStorage.removeItem('decodedToken');
    sessionStorage.removeItem('decodedToken');
  }
}
