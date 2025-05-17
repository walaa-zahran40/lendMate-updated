// src/app/store/client‐form.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { of, concatMap, Observable } from 'rxjs';
import { withLatestFrom, map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import {
  confirmLeave,
  leaveConfirmed,
  leaveCanceled,
} from './client-form.actions';
import { Action } from '@ngrx/store';
import { selectFormDirty } from './client-form.selectors';

@Injectable()
export class LeaveEffects {
  constructor(
    private actions$: Actions,
    private confirmation: ConfirmationService,
    private router: Router,
    private store: Store
  ) {}

  confirmLeave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmLeave),
      // now strongly typed & self‑documenting:
      withLatestFrom(this.store.pipe(select(selectFormDirty))),
      concatMap(([_, dirty]) => {
        if (dirty) {
          // this already returns Observable<Action>
          return of(leaveConfirmed());
        }
        // now we tell TS: this Observable will emit Actions
        return new Observable<Action>((observer) => {
          this.confirmation.confirm({
            message: 'You have unsaved changes. Leave without saving?',
            header: '',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Yes, Leave',
            rejectLabel: 'No, Stay',
            acceptIcon: 'pi pi-check',
            rejectIcon: 'pi pi-times',
            acceptButtonStyleClass: 'btn-yes',
            rejectButtonStyleClass: 'btn-no',
            accept: () => {
              observer.next(leaveConfirmed());
              observer.complete();
            },
            reject: () => {
              observer.next(leaveCanceled());
              observer.complete();
            },
          });
        });
      })
    )
  );

  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(leaveConfirmed),
        map(() => {
          this.router.navigate(['/crm/clients/view-clients']);
        })
      ),
    { dispatch: false }
  );
}
