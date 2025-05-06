import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as GovernorateActions from './governorates.actions';
import { GovernoratesService } from './governorates.service';

@Injectable()
export class GovernoratesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GovernorateActions.loadGovernorates),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            GovernorateActions.loadGovernoratesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(GovernorateActions.loadGovernoratesFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GovernorateActions.loadGovernoratesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            GovernorateActions.loadGovernoratesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(GovernorateActions.loadGovernoratesHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GovernorateActions.loadGovernorate),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((governorate) =>
            GovernorateActions.loadGovernorateSuccess({ governorate })
          ),
          catchError((error) =>
            of(GovernorateActions.loadGovernorateFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GovernorateActions.createGovernorate),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((governorate) =>
            GovernorateActions.createGovernorateSuccess({ governorate })
          ),
          catchError((error) =>
            of(GovernorateActions.createGovernorateFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GovernorateActions.updateGovernorate),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((governorate) =>
            GovernorateActions.updateGovernorateSuccess({ governorate })
          ),
          catchError((error) =>
            of(GovernorateActions.updateGovernorateFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GovernorateActions.deleteGovernorate),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => GovernorateActions.deleteGovernorateSuccess({ id })),
          catchError((error) =>
            of(GovernorateActions.deleteGovernorateFailure({ error }))
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        GovernorateActions.createGovernorateSuccess,
        GovernorateActions.updateGovernorateSuccess,
        GovernorateActions.deleteGovernorateSuccess
      ),
      map(() => GovernorateActions.loadGovernorates())
    )
  );
  constructor(
    private actions$: Actions,
    private service: GovernoratesService
  ) {}
}
