import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientShareHolderActions from './client-share-holders.actions';
import { ClientShareHoldersService } from './client-share-holders.service';
import { ClientShareHolder } from './client-share-holders.model';

@Injectable()
export class ClientShareHoldersEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientShareHolderActions.loadClientShareHolders),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ClientShareHolderActions.loadClientShareHoldersSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ClientShareHolderActions.loadClientShareHoldersFailure({
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
      ofType(ClientShareHolderActions.loadClientShareHoldersHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ClientShareHolderActions.loadClientShareHoldersHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(
              ClientShareHolderActions.loadClientShareHoldersHistoryFailure({ error })
            )
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientShareHolderActions.loadClientShareHolder),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            ClientShareHolderActions.loadClientShareHolderSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientShareHolderActions.loadClientShareHolderFailure({
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
      ofType(ClientShareHolderActions.createClientShareHolder),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            ClientShareHolderActions.createClientShareHolderSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientShareHolderActions.createClientShareHolderFailure({
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
      ofType(ClientShareHolderActions.updateClientShareHolder),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: ClientShareHolder = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return ClientShareHolderActions.updateClientShareHolderSuccess({
              client: enriched,
            });
          }),
          catchError((error) =>
            of(
              ClientShareHolderActions.updateClientShareHolderFailure({
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
      ofType(ClientShareHolderActions.deleteClientShareHolder),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            ClientShareHolderActions.deleteClientShareHolderSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              ClientShareHolderActions.deleteClientShareHolderFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  refreshList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ClientShareHolderActions.createClientShareHolderSuccess,
        ClientShareHolderActions.updateClientShareHolderSuccess,
        ClientShareHolderActions.deleteClientShareHolderSuccess
      ),
 
      map(action => {
      if ('clientId' in action) {
        // for create/update you returned `{ client: ClientShareHolder }`,
        // so dig into that object’s clientId
        return action.clientId;
      } else {
        // for delete you returned `{ id, clientId }`
        return action.client.clientId;
      }
    }),
 
      // only continue if it’s a number
 
      map((clientId) =>
        ClientShareHolderActions.loadClientShareHoldersByClientId({
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
      ofType(ClientShareHolderActions.loadClientShareHoldersByClientId),

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
            ClientShareHolderActions.loadClientShareHoldersByClientIdSuccess({ items })
          ),
          catchError((error) =>
            of(
              ClientShareHolderActions.loadClientShareHoldersByClientIdFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: ClientShareHoldersService
  ) {}
}
