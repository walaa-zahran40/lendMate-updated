import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, of } from 'rxjs';
import * as IdentityActions from './identity.actions';
import { ClientIdentityService } from '../../services/client-identity.service';

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

  constructor(
    private actions$: Actions,
    private clientIdentityService: ClientIdentityService
  ) {}
}
