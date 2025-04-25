import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ClientsAddressesService } from './client-addresses.service';
import * as ClientsAddressesActions from './client-addresses.actions';

@Injectable()
export class ClientsAddressesEffects {
  constructor(
    private actions$: Actions,
    private service: ClientsAddressesService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsAddressesActions.loadClientsAddresses),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((response) =>
            ClientsAddressesActions.loadClientsAddressesSuccess({
              items: response.items,
              totalCount: response.totalCount,
            })
          ),
          catchError((error) =>
            of(ClientsAddressesActions.loadClientsAddressesFailure({ error }))
          )
        )
      )
    )
  );

  loadByClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsAddressesActions.loadClientsAddressesByClient),
      mergeMap(({ clientId }) =>
        this.service.getByClientId(clientId).pipe(
          map((response) =>
            ClientsAddressesActions.loadClientsAddressesByClientSuccess({
              items: response.items,
              totalCount: response.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ClientsAddressesActions.loadClientsAddressesByClientFailure({
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
      ofType(ClientsAddressesActions.createClientAddress),
      mergeMap(({ address }) =>
        this.service.create(address).pipe(
          map((addr) =>
            ClientsAddressesActions.createClientAddressSuccess({
              address: addr,
            })
          ),
          catchError((error) =>
            of(ClientsAddressesActions.createClientAddressFailure({ error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsAddressesActions.updateClientAddress),
      mergeMap(({ id, changes }) =>
        this.service.update(id, changes).pipe(
          map((addr) =>
            ClientsAddressesActions.updateClientAddressSuccess({
              address: addr,
            })
          ),
          catchError((error) =>
            of(ClientsAddressesActions.updateClientAddressFailure({ error }))
          )
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsAddressesActions.deleteClientAddress),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => ClientsAddressesActions.deleteClientAddressSuccess({ id })),
          catchError((error) =>
            of(ClientsAddressesActions.deleteClientAddressFailure({ error }))
          )
        )
      )
    )
  );
}
