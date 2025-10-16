import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, of, tap } from 'rxjs';
import * as IdentityActions from './identity.actions';
import { ClientIdentityService } from '../../../../services/client-identity.service';

@Injectable()
export class IdentityEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdentityActions.loadClientIdentities),
      mergeMap(() =>
        this.clientIdentityService.getAllClientIdentities().pipe(
          map((response) =>
            IdentityActions.loadClientIdentitiesSuccess({
              items: response.items,
            })
          ),
          catchError((error) =>
            of(IdentityActions.loadClientIdentitiesFailure({ error }))
          )
        )
      )
    )
  );
  // identity.effects.ts
  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdentityActions.loadClientIdentity),
      tap(({ clientId }) =>
        console.log('[Effect] loadClientIdentity action, clientId=', clientId)
      ),
      mergeMap(({ clientId }) =>
        this.clientIdentityService.getByClientId(clientId).pipe(
          tap((identity) =>
            console.log('[Effect] got HTTP response identity=', identity)
          ),
          map((identity) =>
            IdentityActions.loadClientIdentitySuccess({ identity })
          ),
          catchError((error) => {
            console.error('[Effect] loadClientIdentityFailure error=', error);
            return of(IdentityActions.loadClientIdentityFailure({ error }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private clientIdentityService: ClientIdentityService
  ) {}
}
