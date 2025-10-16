import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientLegalActions from './client-legals.actions';
import { ClientLegalsService } from './client-legals.service';
import { ClientLegal } from './client-legal.model';

@Injectable()
export class ClientLegalsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientLegalActions.loadClientLegals),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ClientLegalActions.loadClientLegalsSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ClientLegalActions.loadClientLegalsFailure({
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
      ofType(ClientLegalActions.loadClientLegalsHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ClientLegalActions.loadClientLegalsHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(
              ClientLegalActions.loadClientLegalsHistoryFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientLegalActions.loadClientLegal),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            ClientLegalActions.loadClientLegalSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientLegalActions.loadClientLegalFailure({
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
      ofType(ClientLegalActions.createClientLegal),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            ClientLegalActions.createClientLegalSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientLegalActions.createClientLegalFailure({
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
      ofType(ClientLegalActions.updateClientLegal),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: ClientLegal = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return ClientLegalActions.updateClientLegalSuccess({
              client: enriched,
            });
          }),
          catchError((error) =>
            of(
              ClientLegalActions.updateClientLegalFailure({
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
      ofType(ClientLegalActions.deleteClientLegal),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            ClientLegalActions.deleteClientLegalSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              ClientLegalActions.deleteClientLegalFailure({
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
        ClientLegalActions.createClientLegalSuccess,
        ClientLegalActions.updateClientLegalSuccess,
        ClientLegalActions.deleteClientLegalSuccess
      ),
      // If action has `.client` (create/update), take its clientId
      // If it's delete success, it has { id, clientId }
      map((action) =>
        'client' in action ? action.client.clientId : action.clientId
      ),
      map((clientId) =>
        ClientLegalActions.loadClientLegalsByClientId({ clientId })
      )
    )
  );

  /**
   * The “by‐clientId” loader
   */
  loadByClientId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientLegalActions.loadClientLegalsByClientId),

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
            ClientLegalActions.loadClientLegalsByClientIdSuccess({
              items,
            })
          ),
          catchError((error) =>
            of(
              ClientLegalActions.loadClientLegalsByClientIdFailure({
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
    private service: ClientLegalsService
  ) {}
}
