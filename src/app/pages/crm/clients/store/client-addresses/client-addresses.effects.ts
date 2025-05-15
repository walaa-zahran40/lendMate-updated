import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientAddressActions from './client-addresses.actions';
import { ClientAddress } from './client-address.model';
import { ClientAddressesService } from './client-addresses.service';

@Injectable()
export class ClientAddressesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientAddressActions.loadClientAddresses),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ClientAddressActions.loadClientAddressesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ClientAddressActions.loadClientAddressesFailure({
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
      ofType(ClientAddressActions.loadClientAddressesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ClientAddressActions.loadClientAddressesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(
              ClientAddressActions.loadClientAddressesHistoryFailure({ error })
            )
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientAddressActions.loadClientAddress),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            ClientAddressActions.loadClientAddressSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientAddressActions.loadClientAddressFailure({
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
      ofType(ClientAddressActions.createClientAddress),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            ClientAddressActions.createClientAddressSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientAddressActions.createClientAddressFailure({
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
      ofType(ClientAddressActions.updateClientAddress),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: ClientAddress = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return ClientAddressActions.updateClientAddressSuccess({
              client: enriched,
            });
          }),
          catchError((error) =>
            of(
              ClientAddressActions.updateClientAddressFailure({
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
      ofType(ClientAddressActions.deleteClientAddress),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            ClientAddressActions.deleteClientAddressSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              ClientAddressActions.deleteClientAddressFailure({
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
        ClientAddressActions.createClientAddressSuccess,
        ClientAddressActions.updateClientAddressSuccess,
        ClientAddressActions.deleteClientAddressSuccess
      ),
 
      map(action => {
      if ('clientId' in action) {
        // for create/update you returned `{ client: ClientAddress }`,
        // so dig into that object’s clientId
        return action.clientId;
      } else {
        // for delete you returned `{ id, clientId }`
        return action.client.clientId;
      }
    }),
 
      // only continue if it’s a number
 
      map((clientId) =>
        ClientAddressActions.loadClientAddressesByClientId({
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
      ofType(ClientAddressActions.loadClientAddressesByClientId),

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
            ClientAddressActions.loadClientAddressesByClientIdSuccess({ items })
          ),
          catchError((error) =>
            of(
              ClientAddressActions.loadClientAddressesByClientIdFailure({
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
    private service: ClientAddressesService
  ) {}
}
