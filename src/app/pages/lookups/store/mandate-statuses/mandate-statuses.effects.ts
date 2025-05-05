import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as MandateStatusActions from './mandate-statuses.actions';
import { MandateStatusesService } from './mandate-statuses.service';

@Injectable()
export class MandateStatusesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MandateStatusActions.loadMandateStatuses),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            MandateStatusActions.loadMandateStatusesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(MandateStatusActions.loadMandateStatusesFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MandateStatusActions.loadMandateStatusesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            MandateStatusActions.loadMandateStatusesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(MandateStatusActions.loadMandateStatusesHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MandateStatusActions.loadMandateStatus),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((MandateStatus) =>
            MandateStatusActions.loadMandateStatusSuccess({ MandateStatus })
          ),
          catchError((error) =>
            of(MandateStatusActions.loadMandateStatusFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MandateStatusActions.createMandateStatus),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((MandateStatus) =>
            MandateStatusActions.createMandateStatusSuccess({ MandateStatus })
          ),
          catchError((error) =>
            of(MandateStatusActions.createMandateStatusFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MandateStatusActions.updateMandateStatus),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((MandateStatus) =>
            MandateStatusActions.updateMandateStatusSuccess({ MandateStatus })
          ),
          catchError((error) =>
            of(MandateStatusActions.updateMandateStatusFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MandateStatusActions.deleteMandateStatus),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => MandateStatusActions.deleteMandateStatusSuccess({ id })),
          catchError((error) =>
            of(MandateStatusActions.deleteMandateStatusFailure({ error }))
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MandateStatusActions.createMandateStatusSuccess,
        MandateStatusActions.updateMandateStatusSuccess,
        MandateStatusActions.deleteMandateStatusSuccess
      ),
      map(() => MandateStatusActions.loadMandateStatuses())
    )
  );
  constructor(
    private actions$: Actions,
    private service: MandateStatusesService
  ) {}
}
