import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as OfficerActions from './officers.actions';
import { OfficersService } from './officers.service';

@Injectable()
export class OfficersEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfficerActions.loadOfficers),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            OfficerActions.loadOfficersSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(OfficerActions.loadOfficersFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfficerActions.loadOfficersHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            OfficerActions.loadOfficersHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(OfficerActions.loadOfficersHistoryFailure({ error }))
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfficerActions.loadOfficer),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((Officer) =>
            OfficerActions.loadOfficerSuccess({ Officer })
          ),
          catchError((error) =>
            of(OfficerActions.loadOfficerFailure({ error }))
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfficerActions.createOfficer),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((Officer) =>
            OfficerActions.createOfficerSuccess({ Officer })
          ),
          catchError((error) =>
            of(OfficerActions.createOfficerFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfficerActions.updateOfficer),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((Officer) =>
            OfficerActions.updateOfficerSuccess({ Officer })
          ),
          catchError((error) =>
            of(OfficerActions.updateOfficerFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfficerActions.deleteOfficer),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => OfficerActions.deleteOfficerSuccess({ id })),
          catchError((error) =>
            of(OfficerActions.deleteOfficerFailure({ error }))
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        OfficerActions.createOfficerSuccess,
        OfficerActions.updateOfficerSuccess,
        OfficerActions.deleteOfficerSuccess
      ),
      map(() => OfficerActions.loadOfficers())
    )
  );
  constructor(
    private actions$: Actions,
    private service: OfficersService
  ) {}
}
