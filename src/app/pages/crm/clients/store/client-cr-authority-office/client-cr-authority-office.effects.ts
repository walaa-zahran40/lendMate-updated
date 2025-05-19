import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientCRAuthorityOfficeActions from './client-cr-authority-office.actions';
import { ClientCRAuthorityOfficesService } from './client-cr-authority-office.service';
import { ClientCRAuthorityOffice } from './client-cr-authority-office.model';

@Injectable()
export class ClientCRAuthorityOfficesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientCRAuthorityOfficeActions.loadClientCRAuthorityOffices),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ClientCRAuthorityOfficeActions.loadClientCRAuthorityOfficesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ClientCRAuthorityOfficeActions.loadClientCRAuthorityOfficesFailure({
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
      ofType(ClientCRAuthorityOfficeActions.loadClientCRAuthorityOfficesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ClientCRAuthorityOfficeActions.loadClientCRAuthorityOfficesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(
              ClientCRAuthorityOfficeActions.loadClientCRAuthorityOfficesHistoryFailure({ error })
            )
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientCRAuthorityOfficeActions.loadClientCRAuthorityOffice),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            ClientCRAuthorityOfficeActions.loadClientCRAuthorityOfficeSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientCRAuthorityOfficeActions.loadClientCRAuthorityOfficeFailure({
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
      ofType(ClientCRAuthorityOfficeActions.createClientCRAuthorityOffice),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            ClientCRAuthorityOfficeActions.createClientCRAuthorityOfficeSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientCRAuthorityOfficeActions.createClientCRAuthorityOfficeFailure({
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
      ofType(ClientCRAuthorityOfficeActions.updateClientCRAuthorityOffice),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: ClientCRAuthorityOffice = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return ClientCRAuthorityOfficeActions.updateClientCRAuthorityOfficeSuccess({
              client: enriched,
            });
          }),
          catchError((error) =>
            of(
              ClientCRAuthorityOfficeActions.updateClientCRAuthorityOfficeFailure({
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
      ofType(ClientCRAuthorityOfficeActions.deleteClientCRAuthorityOffice),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            ClientCRAuthorityOfficeActions.deleteClientCRAuthorityOfficeSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              ClientCRAuthorityOfficeActions.deleteClientCRAuthorityOfficeFailure({
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
        ClientCRAuthorityOfficeActions.createClientCRAuthorityOfficeSuccess,
        ClientCRAuthorityOfficeActions.updateClientCRAuthorityOfficeSuccess,
        ClientCRAuthorityOfficeActions.deleteClientCRAuthorityOfficeSuccess
      ),
 
      map(action => {
      if ('clientId' in action) {
        // for create/update you returned `{ client: ClientCRAuthorityOffice }`,
        // so dig into that object’s clientId
        return action.clientId;
      } else {
        // for delete you returned `{ id, clientId }`
        return action.client.clientId;
      }
    }),
 
      // only continue if it’s a number
 
      map((clientId) =>
        ClientCRAuthorityOfficeActions.loadClientCRAuthorityOfficesByClientId({
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
      ofType(ClientCRAuthorityOfficeActions.loadClientCRAuthorityOfficesByClientId),

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
            ClientCRAuthorityOfficeActions.loadClientCRAuthorityOfficesByClientIdSuccess({ items })
          ),
          catchError((error) =>
            of(
              ClientCRAuthorityOfficeActions.loadClientCRAuthorityOfficesByClientIdFailure({
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
    private service: ClientCRAuthorityOfficesService
  ) {}
}
