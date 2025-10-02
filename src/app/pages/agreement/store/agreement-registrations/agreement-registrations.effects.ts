// src/app/features/leasing-agreement-registrations/state/leasing-agreement-registrations.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LeasingAgreementRegistrationsService } from './agreement-registrations.service';
import { LeasingAgreementRegistrationsActions as A } from './agreement-registrations.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class LeasingAgreementRegistrationsEffects {
  private actions$ = inject(Actions);
  private api = inject(LeasingAgreementRegistrationsService);

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.loadAll),
      mergeMap(() =>
        this.api.getAll().pipe(
          map((items) => A.loadAllSuccess({ items })),
          catchError((error) => of(A.loadAllFailure({ error })))
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.loadHistory),
      mergeMap(() =>
        this.api.getAllHistory().pipe(
          map((items) => A.loadHistorySuccess({ items })),
          catchError((error) => of(A.loadHistoryFailure({ error })))
        )
      )
    )
  );

  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.loadById),
      mergeMap(({ id }) =>
        this.api.getById(id).pipe(
          map((item) => A.loadByIdSuccess({ item })),
          catchError((error) => of(A.loadByIdFailure({ error })))
        )
      )
    )
  );

  loadByLeasingAgreementId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.loadByLeasingAgreementId),
      mergeMap(({ leasingAgreementId }) =>
        this.api.getByLeasingAgreementId(leasingAgreementId).pipe(
          map((items) => A.loadByLeasingAgreementIdSuccess({ items })),
          catchError((error) =>
            of(A.loadByLeasingAgreementIdFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.create),
      mergeMap(({ payload }) =>
        this.api.create(payload).pipe(
          map((item) => A.createSuccess({ item })),
          catchError((error) => of(A.createFailure({ error })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.update),
      mergeMap(({ id, changes }) =>
        this.api.update(id, changes).pipe(
          map((item) => A.updateSuccess({ item })),
          catchError((error) => of(A.updateFailure({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.delete),
      mergeMap(({ id }) =>
        this.api.delete(id).pipe(
          map(() => A.deleteSuccess({ id })),
          catchError((error) => of(A.deleteFailure({ error })))
        )
      )
    )
  );
}
