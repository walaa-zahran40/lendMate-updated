import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { CanComponentDeactivate } from './can-component-deactivate';

@Injectable({ providedIn: 'root' })
export class PendingChangesGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  constructor(private confirmation: ConfirmationService) {}

  canDeactivate(
    component: CanComponentDeactivate,
    _currentRoute: ActivatedRouteSnapshot,
    _currentState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const safe = component.canDeactivate();
    // if safe (no pending edits), allow immediately
    if (safe === true) {
      return true;
    }
    // else (safe === false or Observable<false>), show confirm dialog
    return new Promise<boolean>((resolve) => {
      this.confirmation.confirm({
        message: 'You have unsaved changes. Discard and leave?',
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        accept: () => resolve(true),
        reject: () => resolve(false),
      });
    });
  }
}
