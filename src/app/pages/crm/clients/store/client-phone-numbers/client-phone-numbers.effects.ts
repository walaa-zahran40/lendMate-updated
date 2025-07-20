import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientPhoneNumberActions from './client-phone-numbers.actions';
import { ClientPhoneNumbersService } from './client-phone-numbers.service';
import { ClientPhoneNumber } from './client-phone-number.model';

@Injectable()
export class ClientPhoneNumbersEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientPhoneNumberActions.loadClientPhoneNumbers),
      mergeMap(() =>
        this.service.getAll().pipe(
          map((resp) =>
            ClientPhoneNumberActions.loadClientPhoneNumbersSuccess({
              items: resp.items,
              totalCount: resp.totalCount,
            })
          ),
          catchError((error) =>
            of(
              ClientPhoneNumberActions.loadClientPhoneNumbersFailure({
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
      ofType(ClientPhoneNumberActions.loadClientPhoneNumbersHistory),
      mergeMap(() =>
        this.service.getHistory().pipe(
          map((resp) =>
            ClientPhoneNumberActions.loadClientPhoneNumbersHistorySuccess({
              history: resp.items,
            })
          ),
          catchError((error) =>
            of(
              ClientPhoneNumberActions.loadClientPhoneNumbersHistoryFailure({
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
      ofType(ClientPhoneNumberActions.loadClientPhoneNumber),
      mergeMap(({ id }) =>
        this.service.getById(id).pipe(
          map((client) =>
            ClientPhoneNumberActions.loadClientPhoneNumberSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientPhoneNumberActions.loadClientPhoneNumberFailure({
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
      ofType(ClientPhoneNumberActions.createClientPhoneNumber),
      mergeMap(({ data }) =>
        this.service.create(data).pipe(
          map((client) =>
            ClientPhoneNumberActions.createClientPhoneNumberSuccess({
              client,
            })
          ),
          catchError((error) =>
            of(
              ClientPhoneNumberActions.createClientPhoneNumberFailure({
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
      ofType(ClientPhoneNumberActions.updateClientPhoneNumber),
      tap(({ id, data }) =>
        console.log('[Effect:update] called with id=', id, 'data=', data)
      ),
      mergeMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map((serverReturned) => {
            // force-inject clientId if missing
            const enriched: ClientPhoneNumber = {
              ...serverReturned,
              clientId: data.clientId!,
            };
            console.log('[Effect:update] enriched client →', enriched);
            return ClientPhoneNumberActions.updateClientPhoneNumberSuccess({
              client: enriched,
            });
          }),
          catchError((error) =>
            of(
              ClientPhoneNumberActions.updateClientPhoneNumberFailure({
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
      ofType(ClientPhoneNumberActions.deleteClientPhoneNumber),
      mergeMap(({ id, clientId }) =>
        this.service.delete(id).pipe(
          map(() =>
            ClientPhoneNumberActions.deleteClientPhoneNumberSuccess({
              id,
              clientId,
            })
          ),
          catchError((error) =>
            of(
              ClientPhoneNumberActions.deleteClientPhoneNumberFailure({
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
        ClientPhoneNumberActions.createClientPhoneNumberSuccess,
        ClientPhoneNumberActions.updateClientPhoneNumberSuccess,
        ClientPhoneNumberActions.deleteClientPhoneNumberSuccess
      ),

      tap((action) =>
        console.log('[RefreshList] triggered by action:', action)
      ),

      // pull out the right number
      map((action) => {
        // handle both the array and single-object cases
        let clientId: number;
        const payload = (action as any).client;

        if (Array.isArray(payload)) {
          clientId = payload[0]?.clientId;
        } else {
          clientId = payload?.clientId;
        }

        console.log('[RefreshList] extracted clientId →', clientId);
        return clientId;
      }),

      // only continue if it’s a number
      filter((clientId): clientId is number => typeof clientId === 'number'),

      map((clientId) =>
        ClientPhoneNumberActions.loadClientPhoneNumbersByClientId({
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
      ofType(ClientPhoneNumberActions.loadClientPhoneNumbersByClientId),

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
            ClientPhoneNumberActions.loadClientPhoneNumbersByClientIdSuccess({
              items,
            })
          ),
          catchError((error) =>
            of(
              ClientPhoneNumberActions.loadClientPhoneNumbersByClientIdFailure({
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
    private service: ClientPhoneNumbersService
  ) {}
}
