import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { CanComponentDeactivate } from '../directives/can-component-deactivate.directive';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class PendingChangesGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  constructor(
    private confirmation: ConfirmationService,
    private translate: TranslateService
  ) {}

  canDeactivate(
    component: CanComponentDeactivate,
    _currentRoute: ActivatedRouteSnapshot,
    _currentState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const safe = component.canDeactivate();
    if (safe === true) {
      return true;
    }
    return new Promise<boolean>((resolve) => {
      this.confirmation.confirm({
        message: this.translate.instant('CONFIRM_LEAVE_MESSAGE'),
        acceptLabel: this.translate.instant('CONFIRM_LEAVE_ACCEPT'),
        rejectLabel: this.translate.instant('CONFIRM_LEAVE_REJECT'),
        accept: () => resolve(true),
        reject: () => resolve(false),
      });
    });
  }
}
