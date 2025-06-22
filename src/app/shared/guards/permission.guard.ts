import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { PermissionService } from '../../pages/login/store/permissions/permission.service';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(private perms: PermissionService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const required = route.data['permission'] as string;
    if (this.perms.hasPermission(required)) {
      return true;
    }
    // optionally navigate to “access-denied” or home
    this.router.navigate(['/not-found']);
    return false;
  }
}
