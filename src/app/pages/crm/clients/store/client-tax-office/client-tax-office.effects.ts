import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientTaxOfficeActions from './client-tax-office.actions';
import { ClientTaxOfficesService } from './client-tax-office.service';
import { ClientTaxOffice } from './client-tax-office.model';

@Injectable()
export class ClientTaxOfficesEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientTaxOfficeActions.loadClientTaxOffices),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ClientTaxOfficeActions.loadClientTaxOfficesSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ClientTaxOfficeActions.loadClientTaxOfficesFailure({
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
      ofType(ClientTaxOfficeActions.loadClientTaxOfficesHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ClientTaxOfficeActions.loadClientTaxOfficesHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(
              ClientTaxOfficeActions.loadClientTaxOfficesHistoryFailure({ error })
            )
          )
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientTaxOfficeActions.loadClientTaxOffice),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            ClientTaxOfficeActions.loadClientTaxOfficeSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientTaxOfficeActions.loadClientTaxOfficeFailure({
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
      ofType(ClientTaxOfficeActions.createClientTaxOffice),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            ClientTaxOfficeActions.createClientTaxOfficeSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientTaxOfficeActions.createClientTaxOfficeFailure({
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
      ofType(ClientTaxOfficeActions.updateClientTaxOffice),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: ClientTaxOffice = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return ClientTaxOfficeActions.updateClientTaxOfficeSuccess({
              client: enriched,
            });
          }),
          catchError((error) =>
            of(
              ClientTaxOfficeActions.updateClientTaxOfficeFailure({
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
      ofType(ClientTaxOfficeActions.deleteClientTaxOffice),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            ClientTaxOfficeActions.deleteClientTaxOfficeSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              ClientTaxOfficeActions.deleteClientTaxOfficeFailure({
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
        ClientTaxOfficeActions.createClientTaxOfficeSuccess,
        ClientTaxOfficeActions.updateClientTaxOfficeSuccess,
        ClientTaxOfficeActions.deleteClientTaxOfficeSuccess
      ),
 
      map(action => {
      if ('clientId' in action) {
        // for create/update you returned `{ client: ClientTaxOffice }`,
        // so dig into that object’s clientId
        return action.clientId;
      } else {
        // for delete you returned `{ id, clientId }`
        return action.client.clientId;
      }
    }),
 
      // only continue if it’s a number
 
      map((clientId) =>
        ClientTaxOfficeActions.loadClientTaxOfficesByClientId({
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
      ofType(ClientTaxOfficeActions.loadClientTaxOfficesByClientId),

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
            ClientTaxOfficeActions.loadClientTaxOfficesByClientIdSuccess({ items })
          ),
          catchError((error) =>
            of(
              ClientTaxOfficeActions.loadClientTaxOfficesByClientIdFailure({
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
    private service: ClientTaxOfficesService
  ) {}
}
