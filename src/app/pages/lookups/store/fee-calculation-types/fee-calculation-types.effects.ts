import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FeeCalculationTypesService } from './fee-calculation-types.service';
import * as ActionsList from './fee-calculation-types.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class FeeCalculationTypesEffects {
  constructor(
    private actions$: Actions,
    private svc: FeeCalculationTypesService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadAll),
      mergeMap(({}) =>
        this.svc.getAll().pipe(
          map((result) => ActionsList.loadAllSuccess({ result })),
          catchError((error) => of(ActionsList.loadAllFailure({ error })))
        )
      )
    )
  );

  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.loadById),
      mergeMap(({ id }) =>
        this.svc.getById(id).pipe(
          map((entity) => ActionsList.loadByIdSuccess({ entity })),
          catchError((error) => of(ActionsList.loadByIdFailure({ error })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.createEntity),
      mergeMap(({ payload }) =>
        this.svc.create(payload).pipe(
          map((entity) => ActionsList.createEntitySuccess({ entity })),
          catchError((error) => of(ActionsList.createEntityFailure({ error })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.updateEntity),
      mergeMap(({ id, changes }) =>
        this.svc.update(id, changes).pipe(
          map(() => ActionsList.updateEntitySuccess({ id, changes })),
          catchError((error) => of(ActionsList.updateEntityFailure({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionsList.deleteEntity),
      mergeMap(({ id }) =>
        this.svc.delete(id).pipe(
          map(() => ActionsList.deleteEntitySuccess({ id })),
          catchError((error) => of(ActionsList.deleteEntityFailure({ error })))
        )
      )
    )
  );
}
