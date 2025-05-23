import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientIdentityActions from './client-identities.actions';
import { ClientIdentitiesService } from './client-identities.service';
import { ClientIdentity } from './client-identity.model';

@Injectable()
export class ClientIdentitiesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientIdentityActions.loadClientIdentities),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ClientIdentityActions.loadClientIdentitiesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ClientIdentityActions.loadClientIdentitiesFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientIdentityActions.loadClientIdentitiesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ClientIdentityActions.loadClientIdentitiesHistorySuccess(
              {
                history: resp.items,
              }
            )
          ),
          catchError((error) =>
            of(
              ClientIdentityActions.loadClientIdentitiesHistoryFailure(
                { error }
              )
            )
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientIdentityActions.loadClientIdentity),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            ClientIdentityActions.loadClientIdentitySuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientIdentityActions.loadClientIdentityFailure({
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
      ofType(ClientIdentityActions.createClientIdentity),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            ClientIdentityActions.createClientIdentitySuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientIdentityActions.createClientIdentityFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientIdentityActions.updateClientIdentity),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: ClientIdentity = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return ClientIdentityActions.updateClientIdentitySuccess(
              { client: enriched }
            );
          }),
          catchError((error) =>
            of(
              ClientIdentityActions.updateClientIdentityFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientIdentityActions.deleteClientIdentity),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            ClientIdentityActions.deleteClientIdentitySuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              ClientIdentityActions.deleteClientIdentityFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  // After any create/update/delete success: reload by clientId
  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ClientIdentityActions.createClientIdentitySuccess,
        ClientIdentityActions.updateClientIdentitySuccess,
        ClientIdentityActions.deleteClientIdentitySuccess
      ),

      tap((action) =>
        console.log('[RefreshList] triggered by action:', action)
      ),

      // pull out the right number
      map((action) => {
        const clientId =
          'client' in action ? action.client.clientId : action.clientId;
        console.log('[RefreshList] extracted clientId →', clientId);
        return clientId;
      }),

      // only continue if it’s a number
      filter(
        (clientId): clientId is number => typeof clientId === 'number'
      ),

      map((clientId) =>
        ClientIdentityActions.loadClientIdentitiesByClientId({
          clientId,
        })
      )
    )
  );

  /**
   * The “by‐clientId” loader
   */
  loadByClientId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientIdentityActions.loadClientIdentitiesByClientId),

      tap((action) =>
        console.log('[Effect:loadByClientId] full action →', action)
      ),
      tap(({ clientId }) =>
        console.log('[Effect:loadByClientId] clientId →', clientId)
      ),

      mergeMap(({ clientId }) =>
        this.service.getByClientId(clientId).pipe(
          tap((items) =>
            console.log('[Effect:loadByClientId] response →', items)
          ),
          map((items) =>
            ClientIdentityActions.loadClientIdentitiesByClientIdSuccess(
              { items }
            )
          ),
          catchError((error) =>
            of(
              ClientIdentityActions.loadClientIdentitiesByClientIdFailure(
                { error }
              )
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: ClientIdentitiesService
  ) {}
}
