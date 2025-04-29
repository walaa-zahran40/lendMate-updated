import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientIdentitiesService } from './client-identities.service';
import * as ClientIdentitiesActions from './client-identities.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ClientIdentitiesEffects {
  constructor(
    private actions$: Actions,
    private svc: ClientIdentitiesService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientIdentitiesActions.loadAllClientIdentities),
      mergeMap(({}) =>
        this.svc.getAll().pipe(
          map((result) =>
            ClientIdentitiesActions.loadAllClientIdentitiesSuccess({ result })
          ),
          catchError((error) =>
            of(
              ClientIdentitiesActions.loadAllClientIdentitiesFailure({ error })
            )
          )
        )
      )
    )
  );

  loadByClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientIdentitiesActions.loadClientIdentitiesByClient),
      mergeMap(({ clientId }) =>
        this.svc.getByClientId(clientId).pipe(
          map((items) =>
            ClientIdentitiesActions.loadClientIdentitiesByClientSuccess({
              items,
            })
          ),
          catchError((error) =>
            of(
              ClientIdentitiesActions.loadClientIdentitiesByClientFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientIdentitiesActions.createClientIdentity),
      mergeMap(({ payload }) =>
        this.svc.create(payload).pipe(
          map((entity) =>
            ClientIdentitiesActions.createClientIdentitySuccess({ entity })
          ),
          catchError((error) =>
            of(ClientIdentitiesActions.createClientIdentityFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientIdentitiesActions.updateClientIdentity),
      mergeMap(({ id, changes }) =>
        this.svc.update(id, changes).pipe(
          map((entity) =>
            ClientIdentitiesActions.updateClientIdentitySuccess({ entity })
          ),
          catchError((error) =>
            of(ClientIdentitiesActions.updateClientIdentityFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientIdentitiesActions.deleteClientIdentity),
      mergeMap(({ id }) =>
        this.svc.delete(id).pipe(
          map(() =>
            ClientIdentitiesActions.deleteClientIdentitySuccess({ id })
          ),
          catchError((error) =>
            of(ClientIdentitiesActions.deleteClientIdentityFailure({ error }))
          )
        )
      )
    )
  );
}
