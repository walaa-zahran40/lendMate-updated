import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, Observable, of } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { confirmLeave, leaveConfirmed, leaveCanceled } from './ui.actions';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ConfirmLeaveEffects {
  confirmLeave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmLeave),
      concatMap(
        () =>
          new Observable<Action>((observer) => {
            this.confirmation.confirm({
              message: this.translate.instant('CONFIRM_LEAVE_MESSAGE'),
              acceptLabel: this.translate.instant('CONFIRM_LEAVE_ACCEPT'),
              rejectLabel: this.translate.instant('CONFIRM_LEAVE_REJECT'),
              accept: () => {
                observer.next(leaveConfirmed());
                observer.complete();
              },
              reject: () => {
                observer.next(leaveCanceled());
                observer.complete();
              },
            });
          })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private confirmation: ConfirmationService,
    private translate: TranslateService
  ) {}
}
