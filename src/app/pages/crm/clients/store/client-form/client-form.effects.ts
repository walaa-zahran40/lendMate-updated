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
  confirmLeave2,
  leaveConfirmed2,
} from './client-form.actions';
import { Action } from '@ngrx/store';
import { selectFormDirty } from './client-form.selectors';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LeaveEffects {
  constructor(
    private actions$: Actions,
    private confirmation: ConfirmationService,
    private router: Router,
    private store: Store,
    private translate: TranslateService
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
            message: this.translate.instant('CONFIRM_LEAVE_MESSAGE'),
            header: this.translate.instant('CONFIRM_LEAVE_HEADER'),
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: this.translate.instant('CONFIRM_LEAVE_ACCEPT'),
            rejectLabel: this.translate.instant('CONFIRM_LEAVE_REJECT'),
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
  confirmLeave2$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmLeave2),
      // now strongly typed & self‑documenting:
      withLatestFrom(this.store.pipe(select(selectFormDirty))),
      concatMap(([_, dirty]) => {
        if (dirty) {
          // this already returns Observable<Action>
          return of(leaveConfirmed2());
        }
        // now we tell TS: this Observable will emit Actions
        return new Observable<Action>((observer) => {
          this.confirmation.confirm({
            message: this.translate.instant('CONFIRM_LEAVE_MESSAGE'),
            header: this.translate.instant('CONFIRM_LEAVE_HEADER'),
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: this.translate.instant('CONFIRM_LEAVE_ACCEPT'),
            rejectLabel: this.translate.instant('CONFIRM_LEAVE_REJECT'),
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
  navigate2$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(leaveConfirmed),
        map(() => {
          this.router.navigate(['/crm/clients/view-clients-onboarding']);
        })
      ),
    { dispatch: false }
  );
}
