import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientCentralBankInfoActions from './client-central-banks.actions';
import { ClientCentralBankInfo } from './client-central-bank.model';
import { ClientCentralBankInfoService } from './client-central-banks.service';

@Injectable()
export class ClientCentralBankInfoEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientCentralBankInfoActions.loadAllClientCentralBankInfo),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ClientCentralBankInfoActions.loadAllClientCentralBankInfoSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ClientCentralBankInfoActions.loadAllClientCentralBankInfoFailure({
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
      ofType(ClientCentralBankInfoActions.loadClientCentralBankInfoHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ClientCentralBankInfoActions.loadClientCentralBankInfoHistorySuccess(
              {
                history: resp.items,
              }
            )
          ),
          catchError((error) =>
            of(
              ClientCentralBankInfoActions.loadClientCentralBankInfoHistoryFailure(
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
      ofType(ClientCentralBankInfoActions.loadClientCentralBankInfo),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            ClientCentralBankInfoActions.loadClientCentralBankInfoSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientCentralBankInfoActions.loadClientCentralBankInfoFailure({
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
      ofType(ClientCentralBankInfoActions.createClientCentralBankInfo),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            ClientCentralBankInfoActions.createClientCentralBankInfoSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientCentralBankInfoActions.createClientCentralBankInfoFailure({
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
      ofType(ClientCentralBankInfoActions.updateClientCentralBankInfo),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: ClientCentralBankInfo = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return ClientCentralBankInfoActions.updateClientCentralBankInfoSuccess(
              {
                client: enriched,
              }
            );
          }),
          catchError((error) =>
            of(
              ClientCentralBankInfoActions.updateClientCentralBankInfoFailure({
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
      ofType(ClientCentralBankInfoActions.deleteClientCentralBankInfo),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            ClientCentralBankInfoActions.deleteClientCentralBankInfoSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              ClientCentralBankInfoActions.deleteClientCentralBankInfoFailure({
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
        ClientCentralBankInfoActions.createClientCentralBankInfoSuccess,
        ClientCentralBankInfoActions.updateClientCentralBankInfoSuccess,
        ClientCentralBankInfoActions.deleteClientCentralBankInfoSuccess
      ),
      map((action) =>
        'client' in action ? action.client.clientId : action.clientId
      ),
      map((clientId) =>
        ClientCentralBankInfoActions.loadClientCentralBankInfoByClientId({
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
      ofType(ClientCentralBankInfoActions.loadClientCentralBankInfoByClientId),

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
            ClientCentralBankInfoActions.loadClientCentralBankInfoByClientIdSuccess(
              { items }
            )
          ),
          catchError((error) =>
            of(
              ClientCentralBankInfoActions.loadClientCentralBankInfoByClientIdFailure(
                {
                  error,
                }
              )
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: ClientCentralBankInfoService
  ) {}
}
