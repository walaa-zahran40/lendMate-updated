import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientSalesTurnoverActions from './client-sales-turnovers.actions';
import { ClientSalesTurnoversService } from './client-sales-turnovers.service';
import { ClientSalesTurnover } from './client-sales-turnovers.model';

@Injectable()
export class ClientSalesTurnoversEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientSalesTurnoverActions.loadClientSalesTurnovers),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ClientSalesTurnoverActions.loadClientSalesTurnoversSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ClientSalesTurnoverActions.loadClientSalesTurnoversFailure({
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
      ofType(ClientSalesTurnoverActions.loadClientSalesTurnoversHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ClientSalesTurnoverActions.loadClientSalesTurnoversHistorySuccess(
              {
                history: resp.items,
              }
            )
          ),
          catchError((error) =>
            of(
              ClientSalesTurnoverActions.loadClientSalesTurnoversHistoryFailure(
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
      ofType(ClientSalesTurnoverActions.loadClientSalesTurnover),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            ClientSalesTurnoverActions.loadClientSalesTurnoverSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientSalesTurnoverActions.loadClientSalesTurnoverFailure({
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
      ofType(ClientSalesTurnoverActions.createClientSalesTurnover),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            ClientSalesTurnoverActions.createClientSalesTurnoverSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientSalesTurnoverActions.createClientSalesTurnoverFailure({
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
      ofType(ClientSalesTurnoverActions.updateClientSalesTurnover),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: ClientSalesTurnover = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return ClientSalesTurnoverActions.updateClientSalesTurnoverSuccess(
              { client: enriched }
            );
          }),
          catchError((error) =>
            of(
              ClientSalesTurnoverActions.updateClientSalesTurnoverFailure({
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
      ofType(ClientSalesTurnoverActions.deleteClientSalesTurnover),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            ClientSalesTurnoverActions.deleteClientSalesTurnoverSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              ClientSalesTurnoverActions.deleteClientSalesTurnoverFailure({
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
        ClientSalesTurnoverActions.createClientSalesTurnoverSuccess,
        ClientSalesTurnoverActions.updateClientSalesTurnoverSuccess,
        ClientSalesTurnoverActions.deleteClientSalesTurnoverSuccess
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
        ClientSalesTurnoverActions.loadClientSalesTurnoversByClientId({
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
      ofType(ClientSalesTurnoverActions.loadClientSalesTurnoversByClientId),

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
            ClientSalesTurnoverActions.loadClientSalesTurnoversByClientIdSuccess(
              { items }
            )
          ),
          catchError((error) =>
            of(
              ClientSalesTurnoverActions.loadClientSalesTurnoversByClientIdFailure(
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
    private service: ClientSalesTurnoversService
  ) {}
}
