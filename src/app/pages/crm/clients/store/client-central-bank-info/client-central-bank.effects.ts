import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ActionsDef from './client-central-bank.actions';
import { ClientCentralBankService } from './client-central-bank.service';

@Injectable()
export class ClientCentralBankEffects {
  constructor(
    private actions$: Actions,
    private svc: ClientCentralBankService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsDef.loadAll),
      mergeMap(({ page }) =>
        this.svc.getAll(page).pipe(
          map((result) => ActionsDef.loadAllSuccess({ result })),
          catchError((err) =>
            of(ActionsDef.loadAllFailure({ error: err.message }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsDef.loadOne),
      mergeMap(({ id }) =>
        this.svc.getById(id).pipe(
          map((entity) => ActionsDef.loadOneSuccess({ entity })),
          catchError((err) =>
            of(ActionsDef.loadOneFailure({ error: err.message }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsDef.createEntity),
      mergeMap(({ payload }) =>
        this.svc.create(payload).pipe(
          map((entity) => ActionsDef.createSuccess({ entity })),
          catchError((err) =>
            of(ActionsDef.createFailure({ error: err.message }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsDef.updateEntity),
      mergeMap(({ id, changes }) =>
        this.svc.update(id, changes).pipe(
          map(() =>
            ActionsDef.updateSuccess({ entity: { id, ...changes } as any })
          ),
          catchError((err) =>
            of(ActionsDef.updateFailure({ error: err.message }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsDef.deleteEntity),
      mergeMap(({ id }) =>
        this.svc.delete(id).pipe(
          map(() => ActionsDef.deleteSuccess({ id })),
          catchError((err) =>
            of(ActionsDef.deleteFailure({ error: err.message }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsDef.loadHistory),
      mergeMap(({ clientId }) =>
        this.svc.getHistory(clientId).pipe(
          map((history) => ActionsDef.loadHistorySuccess({ history })),
          catchError((err) =>
            of(ActionsDef.loadHistoryFailure({ error: err.message }))
          )
        )
      )
    )
  );
}
