import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientTMLOfficerActions from './client-tml-officers.actions';
import { ClientTMLOfficersService } from './client-tml-officers.service';
import { ClientTMLOfficer } from './client-tml-officer.model';

@Injectable()
export class ClientTMLOfficersEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientTMLOfficerActions.loadClientTMLOfficers),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ClientTMLOfficerActions.loadClientTMLOfficersSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ClientTMLOfficerActions.loadClientTMLOfficersFailure({
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
      ofType(ClientTMLOfficerActions.loadClientTMLOfficersHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ClientTMLOfficerActions.loadClientTMLOfficersHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(
              ClientTMLOfficerActions.loadClientTMLOfficersHistoryFailure({ error })
            )
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientTMLOfficerActions.loadClientTMLOfficer),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            ClientTMLOfficerActions.loadClientTMLOfficerSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientTMLOfficerActions.loadClientTMLOfficerFailure({
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
      ofType(ClientTMLOfficerActions.createClientTMLOfficer),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            ClientTMLOfficerActions.createClientTMLOfficerSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientTMLOfficerActions.createClientTMLOfficerFailure({
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
      ofType(ClientTMLOfficerActions.updateClientTMLOfficer),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: ClientTMLOfficer = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return ClientTMLOfficerActions.updateClientTMLOfficerSuccess({
              client: enriched,
            });
          }),
          catchError((error) =>
            of(
              ClientTMLOfficerActions.updateClientTMLOfficerFailure({
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
      ofType(ClientTMLOfficerActions.deleteClientTMLOfficer),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            ClientTMLOfficerActions.deleteClientTMLOfficerSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              ClientTMLOfficerActions.deleteClientTMLOfficerFailure({
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
        ClientTMLOfficerActions.createClientTMLOfficerSuccess,
        ClientTMLOfficerActions.updateClientTMLOfficerSuccess,
        ClientTMLOfficerActions.deleteClientTMLOfficerSuccess
      ),
 
      map(action => {
      if ('clientId' in action) {
        // for create/update you returned `{ client: ClientTMLOfficer }`,
        // so dig into that object’s clientId
        return action.clientId;
      } else {
        // for delete you returned `{ id, clientId }`
        return action.client.clientId;
      }
    }),
 
      // only continue if it’s a number
 
      map((clientId) =>
        ClientTMLOfficerActions.loadClientTMLOfficersByClientId({
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
      ofType(ClientTMLOfficerActions.loadClientTMLOfficersByClientId),

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
            ClientTMLOfficerActions.loadClientTMLOfficersByClientIdSuccess({ items })
          ),
          catchError((error) =>
            of(
              ClientTMLOfficerActions.loadClientTMLOfficersByClientIdFailure({
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
    private service: ClientTMLOfficersService
  ) {}
}
