import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as FeeTypeActions from './fee-types.actions';
import { FeeTypesService } from './fee-types.service';

@Injectable()
export class FeeTypesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeTypeActions.loadFeeTypes),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            FeeTypeActions.loadFeeTypesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(FeeTypeActions.loadFeeTypesFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeTypeActions.loadFeeTypesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            FeeTypeActions.loadFeeTypesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(FeeTypeActions.loadFeeTypesHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeTypeActions.loadFeeType),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((feeType) =>
            FeeTypeActions.loadFeeTypeSuccess({ feeType })
          ),
          catchError((error) =>
            of(FeeTypeActions.loadFeeTypeFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeTypeActions.createFeeType),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((feeType) =>
            FeeTypeActions.createFeeTypeSuccess({ feeType })
          ),
          catchError((error) =>
            of(FeeTypeActions.createFeeTypeFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeTypeActions.updateFeeType),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((feeType) =>
            FeeTypeActions.updateFeeTypeSuccess({ feeType })
          ),
          catchError((error) =>
            of(FeeTypeActions.updateFeeTypeFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeeTypeActions.deleteFeeType),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => FeeTypeActions.deleteFeeTypeSuccess({ id })),
          catchError((error) =>
            of(FeeTypeActions.deleteFeeTypeFailure({ error }))
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        FeeTypeActions.createFeeTypeSuccess,
        FeeTypeActions.updateFeeTypeSuccess,
        FeeTypeActions.deleteFeeTypeSuccess
      ),
      map(() => FeeTypeActions.loadFeeTypes())
    )
  );
  constructor(
    private actions$: Actions,
    private service: FeeTypesService
  ) {}
}
