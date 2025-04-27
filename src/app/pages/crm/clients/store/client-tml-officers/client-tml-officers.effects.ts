import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TMLActions from './client-tml-officers.actions';
import { ClientTMLOfficersService } from './client-tml-officers.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ClientTMLOfficersEffects {
  loadTMLOfficers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TMLActions.loadTMLOfficers),
      mergeMap((action) =>
        this.service.getTMLOfficers(action.clientId).pipe(
          map((response) =>
            TMLActions.loadTMLOfficersSuccess({ items: response.items })
          ),
          catchError((error) =>
            of(TMLActions.loadTMLOfficersFailure({ error }))
          )
        )
      )
    )
  );

  createTMLOfficer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TMLActions.createTMLOfficer),
      mergeMap((action) =>
        this.service.createTMLOfficer(action.officer).pipe(
          map((officer) => TMLActions.createTMLOfficerSuccess({ officer })),
          catchError((error) =>
            of(TMLActions.createTMLOfficerFailure({ error }))
          )
        )
      )
    )
  );

  updateTMLOfficer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TMLActions.updateTMLOfficer),
      mergeMap((action) =>
        this.service.updateTMLOfficer(action.id, action.officer).pipe(
          map((officer) => TMLActions.updateTMLOfficerSuccess({ officer })),
          catchError((error) =>
            of(TMLActions.updateTMLOfficerFailure({ error }))
          )
        )
      )
    )
  );

  deleteTMLOfficer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TMLActions.deleteTMLOfficer),
      mergeMap((action) =>
        this.service.deleteTMLOfficer(action.id).pipe(
          map(() => TMLActions.deleteTMLOfficerSuccess({ id: action.id })),
          catchError((error) =>
            of(TMLActions.deleteTMLOfficerFailure({ error }))
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TMLActions.loadTMLOfficersHistory),
      mergeMap(() =>
        this.service.getTMLOfficersHistory().pipe(
          map((history) =>
            TMLActions.loadTMLOfficersHistorySuccess({ history })
          ),
          catchError((error) =>
            of(TMLActions.loadTMLOfficersHistoryFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: ClientTMLOfficersService
  ) {}
}
