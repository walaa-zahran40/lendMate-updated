import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as BusinessLineActions from './businessLines.actions';
import { BusinessLinesService } from './businessLines.service';

@Injectable()
export class BusinessLinesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BusinessLineActions.loadBusinessLines),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            BusinessLineActions.loadBusinessLinesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(BusinessLineActions.loadBusinessLinesFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BusinessLineActions.loadBusinessLinesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            BusinessLineActions.loadBusinessLinesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(BusinessLineActions.loadBusinessLinesHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BusinessLineActions.loadBusinessLine),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((businessLine) =>
            BusinessLineActions.loadBusinessLineSuccess({ businessLine })
          ),
          catchError((error) =>
            of(BusinessLineActions.loadBusinessLineFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BusinessLineActions.createBusinessLine),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((businessLine) =>
            BusinessLineActions.createBusinessLineSuccess({ businessLine })
          ),
          catchError((error) =>
            of(BusinessLineActions.createBusinessLineFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BusinessLineActions.updateBusinessLine),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((businessLine) =>
            BusinessLineActions.updateBusinessLineSuccess({ businessLine })
          ),
          catchError((error) =>
            of(BusinessLineActions.updateBusinessLineFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BusinessLineActions.deleteBusinessLine),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => BusinessLineActions.deleteBusinessLineSuccess({ id })),
          catchError((error) =>
            of(BusinessLineActions.deleteBusinessLineFailure({ error }))
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        BusinessLineActions.createBusinessLineSuccess,
        BusinessLineActions.updateBusinessLineSuccess,
        BusinessLineActions.deleteBusinessLineSuccess
      ),
      map(() => BusinessLineActions.loadBusinessLines())
    )
  );
  constructor(
    private actions$: Actions,
    private service: BusinessLinesService
  ) {}
}
