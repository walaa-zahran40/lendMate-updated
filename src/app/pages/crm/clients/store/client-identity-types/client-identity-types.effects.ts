import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as A from './client-identity-types.actions';
import { ClientIdentityTypesService } from './client-identity-types.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ClientIdentityTypesEffects {
  constructor(
    private actions$: Actions,
    private svc: ClientIdentityTypesService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.loadAllClientIdentityTypes),
      switchMap(({}) =>
        this.svc.getAll().pipe(
          map((r) =>
            A.loadAllClientIdentityTypesSuccess({
              items: r.items,
              totalCount: r.totalCount,
            })
          ),
          catchError((error) =>
            of(A.loadAllClientIdentityTypesFailure({ error }))
          )
        )
      )
    )
  );
}
