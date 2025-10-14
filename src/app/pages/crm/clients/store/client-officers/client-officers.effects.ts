import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientOfficerActions from './client-officers.actions';
import { ClientOfficersService } from './client-officers.service';
import { ClientOfficer } from './client-officer.model';

@Injectable()
export class ClientOfficersEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientOfficerActions.loadClientOfficers),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ClientOfficerActions.loadClientOfficersSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ClientOfficerActions.loadClientOfficersFailure({
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
      ofType(ClientOfficerActions.loadClientOfficersHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ClientOfficerActions.loadClientOfficersHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(
              ClientOfficerActions.loadClientOfficersHistoryFailure({
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
      ofType(ClientOfficerActions.loadClientOfficer),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            ClientOfficerActions.loadClientOfficerSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientOfficerActions.loadClientOfficerFailure({
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
      ofType(ClientOfficerActions.createClientOfficer),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            ClientOfficerActions.createClientOfficerSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientOfficerActions.createClientOfficerFailure({
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
      ofType(ClientOfficerActions.updateClientOfficer),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: ClientOfficer = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return ClientOfficerActions.updateClientOfficerSuccess({
              client: enriched,
            });
          }),
          catchError((error) =>
            of(
              ClientOfficerActions.updateClientOfficerFailure({
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
      ofType(ClientOfficerActions.deleteClientOfficer),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            ClientOfficerActions.deleteClientOfficerSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              ClientOfficerActions.deleteClientOfficerFailure({
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
        ClientOfficerActions.createClientOfficerSuccess,
        ClientOfficerActions.updateClientOfficerSuccess,
        ClientOfficerActions.deleteClientOfficerSuccess
      ),
      map((action) =>
        'client' in action ? action.client.clientId : action.clientId
      ),
      map((clientId) =>
        ClientOfficerActions.loadClientOfficersByClientId({ clientId })
      )
    )
  );

  /**
   * The “by‐clientId” loader
   */
  loadByClientId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientOfficerActions.loadClientOfficersByClientId),

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
            ClientOfficerActions.loadClientOfficersByClientIdSuccess({
              items,
            })
          ),
          catchError((error) =>
            of(
              ClientOfficerActions.loadClientOfficersByClientIdFailure({
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
    private service: ClientOfficersService
  ) {}
}
