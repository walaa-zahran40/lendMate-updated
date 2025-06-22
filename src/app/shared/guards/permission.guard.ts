import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { PermissionService } from '../../pages/login/store/permissions/permission.service';
import { ConfirmationService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(
    private perms: PermissionService,
    private router: Router,
    private confirmation: ConfirmationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const required = route.data['permission'] as string;
    if (this.perms.hasPermission(required)) {
      return true;
    }
    // show an “access denied” dialog
    this.confirmation.confirm({
      header: 'Access Denied',
      message: 'You are not permitted to enter this page.',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'OK',
      rejectVisible: false,
    });

    // optionally navigate to “access-denied” or home
    this.router.navigate(['/not-found']);
    return false;
  }
}
