import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientGuarantorActions from './client-guarantors.actions';
import { ClientGuarantorsService } from './client-guarantors.service';
import { ClientGuarantor } from './client-guarantor.model';

@Injectable()
export class ClientGuarantorsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientGuarantorActions.loadClientGuarantors),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ClientGuarantorActions.loadClientGuarantorsSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ClientGuarantorActions.loadClientGuarantorsFailure({
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
      ofType(ClientGuarantorActions.loadClientGuarantorsHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ClientGuarantorActions.loadClientGuarantorsHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(
              ClientGuarantorActions.loadClientGuarantorsHistoryFailure({ error })
            )
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientGuarantorActions.loadClientGuarantor),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            ClientGuarantorActions.loadClientGuarantorSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientGuarantorActions.loadClientGuarantorFailure({
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
      ofType(ClientGuarantorActions.createClientGuarantor),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            ClientGuarantorActions.createClientGuarantorSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientGuarantorActions.createClientGuarantorFailure({
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
      ofType(ClientGuarantorActions.updateClientGuarantor),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: ClientGuarantor = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return ClientGuarantorActions.updateClientGuarantorSuccess({
              client: enriched,
            });
          }),
          catchError((error) =>
            of(
              ClientGuarantorActions.updateClientGuarantorFailure({
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
      ofType(ClientGuarantorActions.deleteClientGuarantor),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            ClientGuarantorActions.deleteClientGuarantorSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              ClientGuarantorActions.deleteClientGuarantorFailure({
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
        ClientGuarantorActions.createClientGuarantorSuccess,
        ClientGuarantorActions.updateClientGuarantorSuccess,
        ClientGuarantorActions.deleteClientGuarantorSuccess
      ),
 
      map(action => {
      if ('clientId' in action) {
        // for create/update you returned `{ client: ClientGuarantor }`,
        // so dig into that object’s clientId
        return action.clientId;
      } else {
        // for delete you returned `{ id, clientId }`
        return action.client.clientId;
      }
    }),
 
      // only continue if it’s a number
 
      map((clientId) =>
        ClientGuarantorActions.loadClientGuarantorsByClientId({
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
      ofType(ClientGuarantorActions.loadClientGuarantorsByClientId),

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
            ClientGuarantorActions.loadClientGuarantorsByClientIdSuccess({ items })
          ),
          catchError((error) =>
            of(
              ClientGuarantorActions.loadClientGuarantorsByClientIdFailure({
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
    private service: ClientGuarantorsService
  ) {}
}
